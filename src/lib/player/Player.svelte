<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import createYouTubePlayer from 'youtube-player';

	type CreateYouTubePlayer = typeof createYouTubePlayer;
	type YouTubePlayer = ReturnType<CreateYouTubePlayer>;
	type YouTubePlayerOptions = Parameters<CreateYouTubePlayer>[1];
	type PlayerEventMap = {
		ready: never;
		error: CustomEvent;
		statechange: number;
	};
	const dispatch = createEventDispatcher<PlayerEventMap>();

	export let options: YouTubePlayerOptions = undefined;
	let wrapper: HTMLElement;
	let iframe: HTMLElement | undefined;
	let player: YouTubePlayer | undefined;

	onMount(async () => {
		if (!iframe) throw new Error('Svelte Error');
		wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
		player = createYouTubePlayer(iframe, options);
		player.on('ready', () => dispatch('ready'));
		player.on('error', (e) => dispatch('error', e));
		player.on('stateChange', (e) => dispatch('statechange', e.data));
	});
	onDestroy(() => {
		iframe = undefined;
		player?.destroy();
	});

	export const mute = (): void => player?.mute();
	export const loadVideoById = (id: string): void => player?.loadVideoById(id);
	export const cueVideoById = (id: string): void => player?.cueVideoById(id);
	export const getCurrentTime = (): number => player?.getCurrentTime() ?? 0;
	export const getDuration = (): number => player?.getDuration() ?? 0;
</script>

<section bind:this={wrapper}>
	<div bind:this={iframe} />
</section>

<style lang="scss">
	section {
		position: relative;
		width: 100%;
		padding-top: 75%;

		& :global(iframe) {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
</style>
