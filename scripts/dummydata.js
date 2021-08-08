import { writeFile } from "node:fs/promises";
import { resolve } from 'node:path';

writeFile(resolve('src', 'resources.json'), JSON.stringify({
	project: {
		title: 'Dummy',
		description: 'This is dummy resource',
	},
	videos: [],
}));
