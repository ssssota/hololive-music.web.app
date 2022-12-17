<script lang="ts">
  import { browser } from '$app/environment';
  import Card from '$lib/components/Card.svelte';
  import Controller from '$lib/components/Controller.svelte';
  import type { PlayerState } from '$lib/components/YoutubePlayer.svelte';
  import YoutubePlayer from '$lib/components/YoutubePlayer.svelte';
  import { createFavoriteStore } from '$lib/stores/favorite';
  import { createPlayingStateStore } from '$lib/stores/playing';
  import { shuffle } from '$lib/utils';
  import {
    cancelIdleCallback,
    requestIdleCallback,
  } from '$lib/utils/requestIdleCallback';
  import { onMount } from 'svelte';
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
  let pageSize = 2;
  let dummyCardElement: HTMLElement | undefined = undefined;
  onMount(() => {
    let id = 0;
    const loadMore = () => {
      pageSize++;
      if (pageSize < videos.length)
        id = requestIdleCallback(loadMore, { timeout: 1000 });
    };
    loadMore();
    return () => {
      cancelIdleCallback(id);
    };
  });

  const onReady = () => {
    state.ready();
    player?.setVolume(volume);
  };
  const playNext = (id?: string) => {
    if (id === undefined) {
      const index = filteredVideos.findIndex((video) => video.id === $state.id);
      const nextIndex = (index + 1) % filteredVideos.length;
      id = filteredVideos[nextIndex]!.id;
    }
    state.load(id);
  };
  const onStateChange = (ev: CustomEvent<PlayerState>) => {
    switch (ev.detail) {
      case 'ended':
        return playNext();
      case 'cued':
        return state.play();
      case 'paused':
        return state.pause();
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
      case 'loading':
        return player.cueVideoById(s.id);
      case 'playing':
        return player.playVideo();
      case 'paused':
        return player.pauseVideo();
    }
  });
</script>

<div class="container">
  <main>
    {#each filteredVideos.slice(0, pageSize) as video (video.id)}
      <Card
        info={video}
        playingVideoId={$state.type === 'paused' && $state.id === video.id
          ? undefined
          : $state.id}
        favorite={$favorites.has(video.id)}
        on:play={() =>
          video.id === $state.id ? state.play() : state.load(video.id)}
        on:pause={state.pause}
        on:favorite={() => favorites.toggle(video.id)}
      />
    {/each}
    <div class="dummycard" bind:this={dummyCardElement} />
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
      playing={$state.type === 'playing'}
      title={videos.find(({ id }) => id === $state.id)?.title}
      on:pause={state.pause}
      on:play={() => $state.id && state.play()}
      on:shuffle={shuffleVideos}
      on:next={() => playNext()}
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
