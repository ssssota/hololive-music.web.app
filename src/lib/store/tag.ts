import { derived } from 'svelte/store';
import { page } from '$app/stores';

export const currentTag = derived(page, ({ url }) => {
	try {
		return url.searchParams.getAll('tag').filter((tag) => tag.trim() !== '');
	} catch (e) {
		console.warn(e);
		return [];
	}
});
