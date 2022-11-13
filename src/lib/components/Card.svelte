<script lang="ts">
  import VisuallyHidden from '$lib/components/VisuallyHidden.svelte';
  import type { VideoWithInfo } from '$lib/config';
  import { darken } from '$lib/utils/darken';
  import { createEventDispatcher } from 'svelte';
  export let info: VideoWithInfo;
  export let playingVideoId: string | undefined;
  export let lazyLoading = false;

  let isPlaying = playingVideoId === info.id;
  $: isPlaying = playingVideoId === info.id;

  let brightness = isPlaying ? 0.7 : 1;
  $: brightness = isPlaying ? 0.7 : 1;

  let darkenColor = darken(info.color, { s: 10, l: 10 });
  $: darkenColor = darken(info.color, { s: 10, l: 10 });

  const dispatch = createEventDispatcher<{
    click: VideoWithInfo;
  }>();
</script>

<button
  title={info.title}
  style="--card-background-color: {darkenColor}; --brightness: {brightness}"
  on:click={() => dispatch('click', info)}
>
  <div class="img-wrapper">
    <img src={info.thumbnail} alt="" loading={lazyLoading ? 'lazy' : 'auto'} />
    <VisuallyHidden>{info.title}</VisuallyHidden>
  </div>
</button>

<style>
  button {
    aspect-ratio: 4/3;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
    cursor: pointer;

    background-color: var(--card-background-color);
    margin: 0;
    padding: 0;
    border: 0;

    transition: filter ease 0.1s;
    filter: brightness(var(--brightness));
  }
  button:hover {
    filter: brightness(calc(var(--brightness) - 0.2));
  }
  button:focus {
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
</style>
