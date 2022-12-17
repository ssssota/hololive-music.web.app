import { browser } from '$app/environment';

if (browser) import('$lib/firebase');

export const prerender = true;
