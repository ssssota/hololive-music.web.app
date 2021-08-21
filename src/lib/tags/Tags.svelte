<script lang="ts">
	import LinkedTag from '$lib/tag/LinkedTag.svelte';

	export let tags: string[];
	export let color: string = '#ffffff';
</script>

<ul>
	{#each [...new Set(tags)] as tag (tag)}
		<li><LinkedTag {tag} {color} /></li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: block;
		list-style: none;

		margin: 0;
		padding-bottom: 0.5rem;

		display: inline-flex;
		flex-wrap: nowrap;

		li {
			display: inline;
		}
	}
</style>
