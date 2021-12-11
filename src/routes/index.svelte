<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import type { VideoInfo } from '../types';
	export const load: Load = async ({ fetch }) => {
		const [videos, project] = await Promise.all([
			fetch('/data/videos').then((res) => res.json()),
			fetch('/data/project').then((res) => res.json())
		]);
		return {
			props: {
				videos,
				project
			}
		};
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Card from '$lib/card/Card.svelte';
	import Controls from '$lib/controls/Controls.svelte';
	import Header from '$lib/header/Header.svelte';
	import Player from '$lib/player/Player.svelte';
	import Splash from '$lib/splash/Splash.svelte';
	import HorizontalScroll from '$lib/horizontalscroll/HorizontalScroll.svelte';
	import { currentTag } from '$lib/store/tag';
	import Tags from '$lib/tags/Tags.svelte';
	import { onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import { derived } from 'svelte/store';
	import type { Project } from '../types';
	export let videos: Record<string, VideoInfo>;
	export let project: Project;

	let playingId: string | undefined;

	const getAllTagsSortedByCount = (tags: string[]): string[] => {
		const tagCountMap = Object.values(videos)
			.map(({ tags }) => tags ?? [])
			.reduce((acc, cur) => acc.concat(cur), [])
			.filter((tag) => !tags.includes(tag))
			.sort()
			.reduce((acc: Record<string, number>, cur) => {
				acc[cur] = (acc[cur] ?? 0) + 1;
				return acc;
			}, {});
		const sorted = Object.entries(tagCountMap)
			.sort(([, a], [, b]) => b - a)
			.map(([tag]) => tag);
		return [...tags, ...sorted];
	};

	const unsubscribe = currentTag.subscribe(() => {
		playingId = undefined;
	});
	onDestroy(unsubscribe);

	const filtered = derived(currentTag, (t) =>
		Object.fromEntries(
			Object.entries(videos).filter(([, { tags }]) =>
				t.every((tag) => tags != null && tags.includes(tag))
			)
		)
	);
</script>

<svelte:head>
	<title>{project.title}</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content={project.title} />
	<meta property="og:url" content="{project.origin}{base}{$page.path}" />
	<meta property="og:description" content={project.description} />
	<meta property="og:image" content="{project.origin}{base}{project.ogimage}" />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content={project.color} />
</svelte:head>

<Splash imagePath={project.splashimage} color={project.color} />
<Header title={project.title ?? 'YouTube Playlist'} backgroundColor={project.color} color="white" />

<div class="tags" style="--background-color: {project.color ?? '#ffffff'};">
	<HorizontalScroll>
		<Tags tags={getAllTagsSortedByCount($currentTag)} color={project.color} />
	</HorizontalScroll>
</div>

<main>
	{#each Object.entries($filtered) as [id, info], index (id)}
		{#if playingId != null && playingId === id}
			<Player
				on:statechange={(e) => {
					if (e.detail === 0) {
						// video ended
						const videoIds = Object.keys($filtered);
						playingId =
							playingId == null
								? undefined
								: videoIds[(videoIds.indexOf(playingId) + 1) % videoIds.length];
					}
				}}
				options={{
					videoId: info.id,
					playerVars: { playsinline: 1, autoplay: 1 }
				}}
			/>
		{:else}
			<Card
				{info}
				lazyLoading={index >= 12}
				playingVideoId={playingId}
				on:click={() => (playingId = id)}
			/>
		{/if}
	{/each}
</main>

{#if playingId != null}
	<footer transition:slide>
		<Controls currentVideo={$filtered[playingId]} on:close={() => (playingId = undefined)} />
	</footer>
{/if}

<style lang="scss">
	main {
		display: grid;
		gap: 0;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100vw), 1fr));
	}

	.tags {
		background-color: var(--background-color);
	}

	footer {
		position: sticky;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
	}
</style>
