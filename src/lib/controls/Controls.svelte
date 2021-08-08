<script lang="ts">
	import { betterForground, parseHexColor } from '$lib/utils';
	import type { VideoInfo } from 'src/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Description from './Description.svelte';
	export let currentVideo: VideoInfo | undefined;
	export let showDetail = false;

	type EventMap = {
		close: never;
	};
	const dispatch = createEventDispatcher<EventMap>();

	let _showDetail = false;
	$: _showDetail = showDetail && currentVideo !== undefined;

	let backgroundColor = '#000000';
	$: backgroundColor = currentVideo?.color ?? '#000000';
	let foregroundColor: 'white' | 'black' = 'white';
	$: foregroundColor = betterForground(parseHexColor(backgroundColor));
	let showDetailButtonRotate = '-90deg';
	$: showDetailButtonRotate = _showDetail ? '90deg' : '-90deg';

	$: currentVideo && (showDetail = false);
</script>

<div
	class="container"
	style="--background-color: {backgroundColor}; --foreground-color: {foregroundColor}"
>
	<div class="info">
		{#if currentVideo !== undefined}
			<h3>{currentVideo.title}</h3>
		{/if}
	</div>
	<div class="control">
		<button on:click={() => (showDetail = !showDetail)}>
			<svg
				width="16"
				height="16"
				version="1.1"
				viewBox="0 0 4.2333 4.2333"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				style="--rotate: {showDetailButtonRotate}"
			>
				<path
					d="m1.4151 3.4263 1.3096-1.3096-1.3096-1.3096"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width=".52917"
				/>
			</svg>
		</button>
		<button on:click={() => dispatch('close')}>
			<svg
				width="16"
				height="16"
				version="1.1"
				viewBox="0 0 4.2333 4.2333"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				stroke-linecap="round"
				stroke-width=".5"
			>
				<path d="m0.97243 0.97243 2.2884 2.2885" />
				<path d="m3.2609 0.97243-2.2884 2.2885" />
			</svg>
		</button>
	</div>
</div>

{#if _showDetail}
	<section
		transition:slide
		class="detail"
		style="--background-color: {backgroundColor}; --foreground-color: {foregroundColor}"
	>
		<Description value={currentVideo?.description ?? ''} />
	</section>
{/if}

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 100%;

		padding: 1em;

		transition: background-color ease 0.2s, color ease 0.2s, height ease 0.2s;
		background-color: var(--background-color);
		color: var(--foreground-color);

		display: flex;
		justify-content: space-between;
		align-items: center;

		border-radius: 2em 2em 0 0;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	}

	.info {
		padding: 0 2em;
		h3 {
			font-size: 1em;

			margin: 0;
			padding: 0;
		}
	}

	.control {
		display: flex;

		padding: 0 2em;
		button {
			border: 0;
			margin: 0;
			padding: 1em;
			background-color: transparent;

			cursor: pointer;

			svg {
				transition: stroke ease 0.2s, transform ease 0.2s;
				stroke: var(--foreground-color);
				transform: rotate(var(--rotate));
			}
		}
	}

	.detail {
		transition: transform ease 0.2s;
		transform: scaleY(var(--show));
		max-height: 80vh;

		transition: background-color ease 0.2s, color ease 0.2s, height ease 0.2s;
		background-color: var(--background-color);
		color: var(--foreground-color);

		padding: 1em 2em;
		overflow-y: auto;

		font-size: 0.95em;

		:global(a) {
			color: var(--foreground-color);
		}
	}
</style>
