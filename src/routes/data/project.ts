import { readFileSync } from 'fs';
import type { RequestHandler } from '@sveltejs/kit';
import { parseProjectToml } from '$lib/data';

const toml = readFileSync('project.toml', 'utf8');
export const parsedProject = parseProjectToml(toml);

export const get: RequestHandler = () => {
	return {
		body: parsedProject.project
	};
};
