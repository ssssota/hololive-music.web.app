<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { PlayerState } from '$lib/components/YoutubePlayer.svelte';
  import YoutubePlayer from '$lib/components/YoutubePlayer.svelte';
  import { createPlayingStateStore } from '$lib/stores/playing';
  import type { PageData } from './$types';
  export let data: PageData;

  let player: YT.Player | undefined = undefined;
  const state = createPlayingStateStore();

  const onStateChange = (ev: CustomEvent<PlayerState>) => {
    const { videos } = data;
    switch (ev.detail) {
      case 'ended':
        state.play(
          videos[
            (videos.findIndex((video) => video.id === $state.id) + 1) %
              videos.length
          ]!.id
        );
        return;
      case 'paused':
        state.pause();
        return;
    }
  };

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
    {#each data.videos as video (video.id)}
      {@const currentlyPaused =
        $state.type === 'paused' && $state.id === video.id}
      <Card
        info={video}
        playingVideoId={currentlyPaused ? undefined : $state.id}
        on:play={() => state.play(video.id)}
        on:pause={() => state.pause()}
      />
    {/each}
  </main>

  <section class="player">
    <YoutubePlayer
      bind:player
      options={{ playerVars: { playsinline: 1, autoplay: 1 } }}
      on:ready={() => console.log('ready')}
      on:stateChange={onStateChange}
      on:playbackQualityChange={(ev) =>
        console.log('playbackQualityChange', ev.detail)}
      on:playbackRateChange={(ev) =>
        console.log('playbackRateChange', ev.detail)}
      on:error={(ev) => console.log('error', ev.detail)}
    />
  </section>

  <div class="spacer" />

  <section class="controller">hello</section>
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
  .player {
    position: fixed;
    bottom: 0;
    left: 0;

    width: min(320px, 100vw);
  }
  .spacer {
    flex-grow: 1;
  }
  .controller {
    position: sticky;
    bottom: 0;
  }
</style>
