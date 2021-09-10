import resources from '../resources.json';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	return {
		body: resources.project
	};
};
