import { browser } from '$app/environment';

export const prerender = true;

if (browser) import('$lib/firebase');
