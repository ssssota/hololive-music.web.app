import resources from '../resources.json';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	return {
		body: Object.fromEntries(resources.videos.map((v) => [v.id, v]))
	};
};
