<script lang="ts" context="module">
  import { browser } from '$app/environment';
  import load from 'load-script';

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
    ready: YT.Player;
    stateChange: PlayerState;
    playbackQualityChange: string;
    playbackRateChange: number;
    error: YT.PlayerError;
  };
  interface YTObject {
    Player: typeof YT.Player;
  }

  const YTPromise = (() => {
    let resolve: (() => void) | undefined;
    let reject: ((error: Error) => void) | undefined;
    const promise = new Promise<void>((f, r) => {
      resolve = f;
      reject = r;
    }).then(() => {
      return (window as unknown as { YT: YTObject }).YT;
    });

    if (browser) {
      Object.defineProperty(window, 'onYouTubeIframeAPIReady', {
        get() {
          return resolve;
        },
      });
      load('https://www.youtube.com/iframe_api', (err) => err && reject?.(err));
    }

    return promise;
  })();
</script>

<script lang="ts">
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
        onReady: () => dispatch('ready', player),
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
    width: 100%;
    height: 100%;
  }
  div :global(iframe) {
    width: 100%;
    height: 100%;
  }
</style>
