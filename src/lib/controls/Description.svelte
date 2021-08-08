<script lang="ts">
	import { splitWithUrl } from '$lib/utils';

	import urlRegex from 'url-regex';
	export let value: string;

	const regex = urlRegex();

	let splitted: string[] = [];
	$: splitted = splitWithUrl(value);
</script>

<p>
	{#each splitted as fragment}
		{#if regex.test(fragment)}
			<a href={fragment} target="_blank" rel="noopener noreferrer">{fragment}</a>
		{:else}
			<span>{fragment}</span>
		{/if}
	{/each}
</p>

<style lang="scss">
	p {
		word-break: break-word;
		white-space: pre-wrap;
	}
</style>
