<script lang="ts" context="module">
  const states = {
    '-1': 'unstarted',
    '0': 'ended',
    '1': 'playing',
    '2': 'paused',
    '3': 'buffering',
    '5': 'cued',
  } as const;
  export type PlayerState = typeof states[YT.PlayerState];
  export type EventMap = {
    ready: void;
    stateChange: PlayerState;
    playbackQualityChange: string;
    playbackRateChange: number;
    error: YT.PlayerError;
  };
</script>

<script lang="ts">
  import { YTPromise } from '$lib/youtube/iframe';
  import { createEventDispatcher, onDestroy, onMount } from 'svelte';

  export let player: YT.Player | undefined = undefined;
  export let options: YT.PlayerOptions = {};
  let iframe: HTMLElement | undefined;

  const dispatch = createEventDispatcher<EventMap>();
  onMount(async () => {
    if (!iframe) throw new Error('Unexpected Error: iframe is undefined');
    const YT = await YTPromise;
    player = new YT.Player(iframe, {
      events: {
        onReady: () => dispatch('ready'),
        onStateChange: (ev) => dispatch('stateChange', states[ev.data]),
        onPlaybackQualityChange: (ev) =>
          dispatch('playbackQualityChange', ev.data),
        onPlaybackRateChange: (ev) => dispatch('playbackRateChange', ev.data),
        onError: (ev) => dispatch('error', ev.data),
        ...options.events,
      },
      ...options,
    });
  });
  onDestroy(() => {
    iframe = undefined;
    player?.destroy();
  });
</script>

<div>
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
