import { readFileSync } from 'fs';
import type { RequestHandler } from '@sveltejs/kit';
import { parseProjectToml } from '$lib/data';

const toml = readFileSync(
	import.meta.env.VITE_PROJECT_TOML_PATH?.toString() ?? 'project.toml',
	'utf8'
);
export const parsedProject = parseProjectToml(toml);

export const GET: RequestHandler = () => {
	return {
		body: parsedProject.project
	};
};
