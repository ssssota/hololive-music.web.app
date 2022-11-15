<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import YoutubePlayer from '$lib/components/YoutubePlayer.svelte';
  import type { YTPlayer } from '$lib/youtube/iframe';
  import type { PageData } from './$types';
  export let data: PageData;

  let playingVideoId: string | undefined = undefined;
  let player: YTPlayer | undefined = undefined;
</script>

<main>
  {#each data.videos as video (video.id)}
    <Card
      info={video}
      {playingVideoId}
      on:play={() => {
        playingVideoId = video.id;
        player?.loadVideoById(video.id);
      }}
      on:pause={() => {
        playingVideoId = undefined;
        player?.pauseVideo();
      }}
    />
  {/each}
</main>

<section>
  <YoutubePlayer
    bind:player
    options={{ playerVars: { playsinline: 1, autoplay: 1 } }}
  />
</section>

<style>
  section {
    position: fixed;
    bottom: 0;
    left: 100vw;

    width: min(320px, 100vw);
  }
  main {
    display: grid;
    gap: 0;
    grid-template-columns: repeat(auto-fit, minmax(min(320px, 100vw), 1fr));
  }
</style>
