<script lang="ts">
	import VisuallyHidden from '$lib/visuallyhidden/VisuallyHidden.svelte';
	import type { VideoInfo } from 'src/types';
	import { createEventDispatcher } from 'svelte';
	export let info: VideoInfo;
	export let playingVideoId: string | undefined;
	export let lazyLoading = false;

	let isPlaying = playingVideoId === info.id;
	$: isPlaying = playingVideoId === info.id;

	const isSquareThumbnail = info.squareThumbnail === true;
	const coverWidth = isSquareThumbnail ? '37.5%' : '65%';
	const coverHeight = '50%';
	const imgStyle = isSquareThumbnail ? 'height:100%' : '';

	let brightness = isPlaying ? 0.7 : 1;
	$: brightness = isPlaying ? 0.7 : 1;

	type CardEventMap = {
		click: string;
	};
	const dispatch = createEventDispatcher<CardEventMap>();
</script>

<button
	title={info.title}
	style="--background-color: {info.color}; --brightness: {brightness}"
	on:click={() => dispatch('click')}
>
	<VisuallyHidden>{info.title}</VisuallyHidden>
	<div class="img-wrapper" style="--cover-width: {coverWidth}; --cover-height: {coverHeight}">
		<img
			src={info.thumbnail.url ?? ''}
			alt="「{info.title}」のサムネイル"
			style={imgStyle}
			loading={lazyLoading ? 'lazy' : 'auto'}
		/>
	</div>
</button>

<style lang="scss">
	button {
		@supports (aspect-ratio: 4/3) {
			aspect-ratio: 4/3;
		}
		@supports not (aspect-ratio: 4/3) {
			&::before {
				content: '';
				display: block;
				padding-top: 75%;
			}
		}
		position: relative;

		user-select: none;
		cursor: pointer;

		background-color: var(--background-color);
		margin: 0;
		padding: 0;
		border: 0;

		transition: filter ease 0.1s;
		filter: brightness(var(--brightness));
		&:hover {
			filter: brightness(calc(var(--brightness) - 0.3));
		}
		&:focus {
			z-index: 10;
		}
	}

	.img-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: var(--cover-width);
		height: var(--cover-height);

		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			object-fit: cover;
			box-shadow: 3px 3px 20px 0px rgba(0, 0, 0, 0.6);
		}
	}
</style>
