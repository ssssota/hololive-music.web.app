<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import resources from '../resources.json';
	import { getShuffled } from '$lib/utils';
	import type { VideoInfo } from '../types';
	export const load: Load = async () => ({
		props: {
			videos: getShuffled(resources.videos),
			project: resources.project
		}
	});
</script>

<script lang="ts">
	import { slide } from 'svelte/transition';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Card from '$lib/card/Card.svelte';
	import Controls from '$lib/controls/Controls.svelte';
	import Header from '$lib/header/Header.svelte';
	import Player from '$lib/player/Player.svelte';
	import Splash from '$lib/splash/Splash.svelte';
	import type { Project } from '../types';
	import { derived, get } from 'svelte/store';
	export let videos: VideoInfo[];
	export let project: Project;

	let playingIndex: number | undefined;
	let player: Player | null | undefined;

	const filtered = derived(page, ({ query }) =>
		videos.filter(({ tags }) =>
			query
				.getAll('tag')
				.filter((tag) => tag.trim() !== '')
				.every((tag) => tags != null && tags.includes(tag))
		)
	);
	$: if (player != null && playingIndex != null) {
		const id = get(filtered)[playingIndex].id;
		if (id != null) player.loadVideoById(id);
	}
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

<main>
	{#each $filtered as info (info.id)}
		{#if playingIndex != null && $filtered[playingIndex].id === info.id}
			<Player
				bind:this={player}
				on:statechange={(e) => {
					if (e.detail === 0) {
						// video ended
						playingIndex = playingIndex == null ? undefined : (playingIndex + 1) % $filtered.length;
					}
				}}
			/>
		{:else}
			<Card
				{info}
				playingVideoId={playingIndex == null ? undefined : $filtered[playingIndex].id}
				on:click={() => (playingIndex = $filtered.findIndex(({ id }) => id === info.id))}
			/>
		{/if}
	{/each}
</main>

{#if playingIndex != null}
	<footer transition:slide>
		<Controls currentVideo={$filtered[playingIndex]} on:close={() => (playingIndex = undefined)} />
	</footer>
{/if}

<style lang="scss">
	main {
		display: grid;
		gap: 0;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100vw), 1fr));

		min-height: 100vh;
	}

	footer {
		position: sticky;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
	}
</style>
