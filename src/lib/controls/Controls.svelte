<script lang="ts">
	import { page } from '$app/stores';
	import Tag from '$lib/tag/Tag.svelte';
	import { betterForground, parseHexColor } from '$lib/utils';
	import type { VideoInfo } from 'src/types';
	import { createEventDispatcher } from 'svelte';
	import { derived } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import Description from './Description.svelte';
	export let currentVideo: VideoInfo | undefined;

	type EventMap = {
		close: never;
	};
	const dispatch = createEventDispatcher<EventMap>();

	let showDetail = false;
	let backgroundColor = '#000000';
	$: backgroundColor = currentVideo?.color ?? '#000000';
	let foregroundColor: '#ffffff' | '#000000' = '#ffffff';
	$: foregroundColor = betterForground(parseHexColor(backgroundColor));
	let showDetailButtonRotate = '-90deg';
	$: showDetailButtonRotate = showDetail ? '90deg' : '-90deg';

	$: currentVideo && (showDetail = false);

	const currentTag = derived(page, ({ query }) =>
		query.getAll('tag').filter((tag) => tag.trim() !== '')
	);

	const getSpecTagUrl = (tags: string[]) => {
		const url = new URL(location.origin);
		url.pathname = location.pathname;
		tags.forEach((tag) => url.searchParams.append('tag', tag));
		return url.href;
	};
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

{#if showDetail}
	<section
		transition:slide
		class="detail"
		style="--background-color: {backgroundColor}; --foreground-color: {foregroundColor}"
	>
		{#if (currentVideo?.tags?.length ?? 0) > 0}
			<p class="tags">
				{#each currentVideo?.tags ?? [] as tag (tag)}
					<Tag color={foregroundColor}>
						{#if $currentTag.includes(tag)}
							<a
								class="tag-button"
								title="{tag}を絞り込みから除外する"
								href={getSpecTagUrl($currentTag.filter((t) => t !== tag))}>-</a
							>
							{tag}
						{:else}
							{#if $currentTag.length > 0}
								<a
									class="tag-button"
									title="{tag}を絞り込みに追加する"
									href={getSpecTagUrl([...$currentTag, tag])}>+</a
								>
							{/if}
							<a title="{tag}で絞り込む" href={getSpecTagUrl([tag])}>{tag}</a>
						{/if}
					</Tag>
				{/each}
			</p>
		{/if}
		<Description value={currentVideo?.description ?? ''} />
	</section>
{/if}

<style lang="scss">
	.container {
		box-sizing: border-box;
		width: 100%;

		padding: 1em 1.5em;

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
		padding: 0 0.5em;
		h3 {
			font-size: 1em;

			margin: 0;
			padding: 0;
		}
	}

	.control {
		display: flex;

		padding: 0 0.5em;
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

	.tags {
		margin-top: 0;
		margin-bottom: 0.5rem;

		.tag-button {
			display: inline-flex;
			justify-content: center;
			align-items: center;

			width: 1rem;
			height: 1rem;
			font-size: 0.75rem;

			margin-right: 0.5rem;
			border-radius: 50%;

			color: var(--background-color);
			background-color: var(--foreground-color);
			text-decoration: none;
		}
	}

	.detail {
		transition: transform ease 0.2s;
		transform: scaleY(var(--show));
		max-height: 60vh;

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
