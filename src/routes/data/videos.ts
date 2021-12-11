import type { RequestHandler } from '@sveltejs/kit';
import { fetchFromProject } from '$lib/data';
import { parsedProject } from './project';

const apiKey = import.meta.env.VITE_API_KEY?.toString() ?? '';
const videos = fetchFromProject(parsedProject, apiKey);

export const get: RequestHandler = async () => ({
	body: JSON.stringify(Object.fromEntries((await videos).map((v) => [v.id, v])))
});