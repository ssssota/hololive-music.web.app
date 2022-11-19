<script lang="ts">
  import { browser } from '$app/environment';
  import Card from '$lib/components/Card.svelte';
  import Controller from '$lib/components/Controller.svelte';
  import type { PlayerState } from '$lib/components/YoutubePlayer.svelte';
  import YoutubePlayer from '$lib/components/YoutubePlayer.svelte';
  import { createFavoriteStore } from '$lib/stores/favorite';
  import { createPlayingStateStore } from '$lib/stores/playing';
  import { shuffle } from '$lib/utils';
  import type { PageData } from './$types';
  export let data: PageData;
  let videos = data.videos;
  const shuffleVideos = () => {
    videos = shuffle(videos);
  };

  const getVolume = () => {
    const defaultVolume = 50;
    if (!browser) return defaultVolume;
    const volume = Number(localStorage.getItem('volume'));
    return Number.isFinite(volume)
      ? Math.min(Math.max(1, volume), 100)
      : defaultVolume;
  };

  let player: YT.Player | undefined = undefined;
  let volume = getVolume();
  let favoriteFilter = false;
  const state = createPlayingStateStore();
  const favorites = createFavoriteStore();

  let filteredVideos = videos;
  $: filteredVideos = videos.filter((video) => {
    if (!favoriteFilter) return true;
    return $favorites.has(video.id);
  });

  const onReady = () => player?.setVolume(volume);
  const onStateChange = (ev: CustomEvent<PlayerState>) => {
    switch (ev.detail) {
      case 'ended':
        state.play(
          filteredVideos[
            (filteredVideos.findIndex((video) => video.id === $state.id) + 1) %
              filteredVideos.length
          ]!.id
        );
        return;
      case 'paused':
        state.pause();
        return;
    }
  };

  $: if (typeof player?.setVolume === 'function') {
    player.setVolume(volume);
    localStorage.setItem('volume', volume.toString());
  }
  state.subscribe((s) => {
    if (player === undefined) return;
    switch (s.type) {
      case 'unstarted':
        return;
      case 'playing':
        player.loadVideoById(s.id);
        return;
      case 'paused':
        player.pauseVideo();
        return;
      case 'unpaused':
        player.playVideo();
        return;
    }
  });
</script>

<div class="container">
  <main>
    {#each filteredVideos as video (video.id)}
      <Card
        info={video}
        playingVideoId={$state.type === 'paused' && $state.id === video.id
          ? undefined
          : $state.id}
        favorite={$favorites.has(video.id)}
        on:play={() => state.play(video.id)}
        on:pause={state.pause}
        on:favorite={() => favorites.toggle(video.id)}
      />
    {/each}
    <div class="dummycard" />
  </main>

  <div class="spacer" />

  <section class="controller">
    <section class="player">
      <YoutubePlayer
        bind:player
        options={{ playerVars: { playsinline: 1, autoplay: 1, controls: 0 } }}
        on:ready={onReady}
        on:stateChange={onStateChange}
      />
    </section>

    <Controller
      bind:volume
      bind:favorite={favoriteFilter}
      playing={$state.type === 'playing' || $state.type === 'unpaused'}
      on:pause={state.pause}
      on:play={() => $state.id && state.play($state.id)}
      on:shuffle={shuffleVideos}
    />
  </section>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  main {
    display: grid;
    gap: 0;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100vw), 1fr));
  }
  .dummycard {
    aspect-ratio: 16 / 9;
  }
  .player {
    position: absolute;
    bottom: 100%;
    right: 0;

    width: min(320px, 100vw);
    aspect-ratio: 16 / 9;
    border-top-left-radius: 1em;
    overflow: hidden;
  }
  .spacer {
    flex-grow: 1;
  }
  .controller {
    position: sticky;
    bottom: 0;
  }
</style>
