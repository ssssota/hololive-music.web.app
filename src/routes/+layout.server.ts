import type { VideoWithInfo } from '$lib/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
  return {
    videos: (await fetch('/api/data').then((r) => r.json())) as VideoWithInfo[],
  };
};

export const prerender = true;
