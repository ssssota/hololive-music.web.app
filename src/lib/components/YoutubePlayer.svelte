<script lang="ts">
  import {
    YTPromise,
    type YTPlayer,
    type YTPlayerOptions,
  } from '$lib/youtube/iframe';
  import { onDestroy, onMount } from 'svelte';

  export let player: YTPlayer | undefined = undefined;
  export let options: YTPlayerOptions = {};
  let wrapper: HTMLElement;
  let iframe: HTMLElement | undefined;

  onMount(async () => {
    if (!iframe) throw new Error('Unexpected Error: iframe is undefined');
    const YT = await YTPromise;
    player = new YT.Player(iframe, options);
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
