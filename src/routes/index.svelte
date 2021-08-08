<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import resources from '../resources.json';
	export const load: Load = async () => ({
		props: {
			videos: resources.videos,
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
	import { getShuffled } from '$lib/utils';
	import type { Project, VideoInfo } from '../types';
	import Splash from '$lib/splash/Splash.svelte';
	export let videos: VideoInfo[];
	export let project: Project;
	const shuffled = getShuffled(videos);

	let playingVideoId: string | undefined = undefined;
	let player: Player | null | undefined;

	$: if (player != null && playingVideoId !== undefined) {
		player.loadVideoById(playingVideoId);
	}

	const getNextVideoId = (currentId: string): string => {
		const currentIndex = shuffled.findIndex((v) => v.id === currentId);
		return shuffled[(currentIndex + 1) % shuffled.length].id;
	};
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
	{#each shuffled as info (info.id)}
		{#if playingVideoId === info.id}
			<Player
				bind:this={player}
				on:statechange={(e) => {
					if (e.detail === 0) {
						// video ended
						playingVideoId = playingVideoId && getNextVideoId(playingVideoId);
					}
				}}
			/>
		{:else}
			<Card {info} {playingVideoId} on:click={() => (playingVideoId = info.id)} />
		{/if}
	{/each}
</main>

{#if playingVideoId !== undefined}
	<footer transition:slide>
		<Controls
			currentVideo={shuffled.find((v) => v.id === playingVideoId)}
			on:close={() => (playingVideoId = undefined)}
		/>
	</footer>
{/if}

<style lang="scss">
	main {
		display: grid;
		gap: 0;
		grid-template-columns: repeat(auto-fit, minmax(min(400px, 100vw), 1fr));
	}

	footer {
		position: sticky;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
	}
</style>
