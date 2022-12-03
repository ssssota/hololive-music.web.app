<script lang="ts">
  import VisuallyHidden from '$lib/components/VisuallyHidden.svelte';
  import type { VideoWithInfo } from '$lib/config';
  import { darken } from '$lib/utils/darken';
  import { getVideoUrlFromId } from '$lib/youtube';
  import { createEventDispatcher } from 'svelte';
  import PauseIcon from './PauseIcon.svelte';
  import Star from './Star.svelte';
  import Triangle from './Triangle.svelte';
  import youtubeLogoUrl from './yt_logo_mono_dark.svg';
  export let info: VideoWithInfo;
  export let playingVideoId: string | undefined;
  export let lazyLoading = false;
  export let favorite = false;

  let isPlaying = playingVideoId === info.id;
  $: isPlaying = playingVideoId === info.id;

  let brightness = isPlaying ? 0.7 : 1;
  $: brightness = isPlaying ? 0.7 : 1;

  let darkenColor = darken(info.color, { s: 10, l: 10 });
  $: darkenColor = darken(info.color, { s: 10, l: 10 });

  const dispatch = createEventDispatcher<{
    play: VideoWithInfo;
    pause: VideoWithInfo;
    favorite: boolean;
  }>();
</script>

<div
  class="container"
  title={info.title}
  style="--card-background-color: {darkenColor}; --brightness: {brightness}"
>
  <div class="img-wrapper">
    <img src={info.thumbnail} alt="" loading={lazyLoading ? 'lazy' : 'auto'} />
    <VisuallyHidden>{info.title}</VisuallyHidden>
  </div>
  <div class="controls">
    <button class="favorite" on:click={() => dispatch('favorite')}>
      <Star color="white" filled={favorite} />
    </button>
    {#if isPlaying}
      <button
        class="control center pause"
        on:click={() => dispatch('pause', info)}
      >
        <PauseIcon color="white" />
      </button>
    {:else}
      <button
        class="control center play"
        on:click={() => dispatch('play', info)}
      >
        <Triangle color="white" />
      </button>
    {/if}
    <a
      href={getVideoUrlFromId(info.id)}
      target="_blank"
      rel="noopener noreferrer"
      class="youtube"
    >
      <img src={youtubeLogoUrl} alt="YouTube" loading="lazy" />
    </a>
  </div>
</div>

<style>
  button {
    cursor: pointer;
  }
  .container {
    position: relative;
    aspect-ratio: 4/3;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;

    background-color: var(--card-background-color);
  }
  .container:focus {
    z-index: 10;
  }

  .img-wrapper {
    width: 65%;
    height: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-wrapper img {
    width: 100%;
    object-fit: cover;
    box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.6);
  }

  .controls {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity ease 0.2s, background-color ease 0.2s;
    background-color: transparent;
  }
  .controls:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .container:hover .controls {
    opacity: 1;
  }
  .control:hover {
    filter: brightness(2);
  }
  .control.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
  }
  .youtube {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    display: flex;
    justify-content: flex-end;
    height: max(38px, 17.5%);
    width: max(108px, 37.5%);
  }
  .favorite {
    position: absolute;
    top: 1em;
    right: 1em;
    width: 2em;
    height: 2em;
  }
</style>
