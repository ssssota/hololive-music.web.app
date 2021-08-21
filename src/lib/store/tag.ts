import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { browser } from '$app/env';

export const currentTag = derived(page, ({ query }) =>
	(browser ? new URL(location.href).searchParams : query)
		.getAll('tag')
		.filter((tag) => tag.trim() !== '')
);
