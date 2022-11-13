<script lang="ts" context="module">
  type CreateYouTubePlayer = typeof createYouTubePlayer;
  export type YTPlayer = ReturnType<CreateYouTubePlayer>;
  export type YTPlayerOptions = Parameters<CreateYouTubePlayer>[1];
</script>

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';
  import createYouTubePlayer from 'youtube-player';
  const dispatch = createEventDispatcher<{
    ready: never;
    error: CustomEvent;
    statechange: number;
  }>();

  export let options: YTPlayerOptions = undefined;
  export let player: YTPlayer | undefined = undefined;
  let wrapper: HTMLElement;
  let iframe: HTMLElement | undefined;

  onMount(async () => {
    if (!iframe) throw new Error('Unexpected Error: iframe is undefined');
    player = createYouTubePlayer(iframe, options);
    player.on('ready', () => dispatch('ready'));
    player.on('error', (e) => dispatch('error', e));
    player.on('stateChange', (e) => dispatch('statechange', e.data));
  });
  onDestroy(() => {
    iframe = undefined;
    player?.destroy();
  });
</script>

<div bind:this={wrapper}>
  <div bind:this={iframe} />
</div>

<style>
  div {
    position: relative;
    width: 100%;
    aspect-ratio: 4/3;
  }
  div :global(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
