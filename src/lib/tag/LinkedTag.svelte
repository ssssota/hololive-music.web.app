<script lang="ts">
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import Tag from './Tag.svelte';
	import { currentTag } from '$lib/store/tag';

	export let tag: string;
	export let color = '#ffffff';

	const getSpecTagUrl = (tags: string[]) => {
		const param = new URLSearchParams(tags.map((tag) => ['tag', tag])).toString();
		return param === '' ? $page.path : `${$page.path}?${param}`;
	};
</script>

<Tag {color}>
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

<style lang="scss">
	.tag-button {
		display: inline-flex;
		justify-content: center;
		align-items: center;

		width: 1rem;
		height: 1rem;
		font-size: 0.75rem;

		margin-right: 0.5rem;
		border-radius: 50%;

		color: var(--foreground-color);
		background-color: var(--background-color);
		text-decoration: none;
	}
	a {
		text-decoration: none;
		color: var(--foreground-color);
		background-color: var(--background-color);
	}
</style>
