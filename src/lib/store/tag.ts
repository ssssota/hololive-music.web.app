import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { browser } from '$app/env';

export const currentTag = derived(page, ({ url }) => {
	try {
		if (!browser) return [];
		return url.searchParams.getAll('tag').filter((tag) => tag.trim() !== '');
	} catch (e) {
		console.warn(e);
		return [];
	}
});
