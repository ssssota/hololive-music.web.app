<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PauseIcon from './PauseIcon.svelte';
  import ShuffleIcon from './ShuffleIcon.svelte';
  import SkipNextIcon from './SkipNextIcon.svelte';
  import Star from './Star.svelte';
  import Triangle from './Triangle.svelte';

  export let playing: boolean;
  export let volume: number;
  export let favorite = false;
  export let title: string | undefined;
  let _volume = volume;
  $: volume = _volume;

  const dispatch = createEventDispatcher<{
    play: void;
    pause: void;
    shuffle: void;
    next: void;
  }>();
  const onPause = () => dispatch('pause');
  const onPlay = () => dispatch('play');
  const onShuffle = () => dispatch('shuffle');
  const onNext = () => dispatch('next');
  const onToggleFavorite = () => (favorite = !favorite);
</script>

<div class="container">
  {#if playing}
    <button on:click={onPause}>
      <PauseIcon color="white" />
    </button>
  {:else}
    <button on:click={onPlay}>
      <Triangle color="white" />
    </button>
  {/if}
  <button aria-label="Skip next" on:click={onNext}>
    <SkipNextIcon color="white" />
  </button>
  <button aria-label="shuffle" on:click={onShuffle}>
    <ShuffleIcon color="white" />
  </button>
  <button
    aria-label={favorite ? 'Disable favorite filter' : 'Enable favorite filter'}
    on:click={onToggleFavorite}
  >
    <Star color="white" filled={favorite} />
  </button>
  <input type="range" min={0} max={100} bind:value={_volume} />
  <div class="title">{title ?? ''}</div>
</div>

<style>
  .container {
    display: flex;
    justify-content: flex-start;
    background-color: var(--background-color);
    padding: 1em 2em;
    gap: 1em;
    align-items: center;
    overflow: hidden;
  }
  .container > * {
    flex-shrink: 0;
  }
  button {
    height: 2em;
    width: 2em;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    .container {
      padding: 1em;
    }
    button {
      height: 1.5em;
      width: 1.5em;
    }
  }
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
    height: 0.25em;
    width: 7.5em;
    background: #fff;
    border-radius: 0.25em;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  }
  input[type='range']::-moz-range-thumb {
    background: #fff;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
    border: none;
  }
  input[type='range']::-moz-focus-outer {
    border: 0;
  }
  @media (max-width: 768px) {
    input[type='range'] {
      display: none;
    }
  }
  .title {
    flex-grow: 1;
    flex-shrink: 1;
    display: -webkit-inline-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    user-select: none;
  }
</style>
