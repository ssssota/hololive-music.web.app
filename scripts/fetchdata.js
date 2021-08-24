/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-check
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseProjectToml } from './config.js';
import { getDominantColor, getThumbnail } from './utils.js';
import { fetchPlaylist, fetchVideos, isAutoGeneratedVideo } from './youtube.js';

/**
 * @param {string | undefined} tomlPath
 */
const main = async (tomlPath) => {
	// @ts-ignore
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const _tomlPath =
		tomlPath === undefined ? resolve(__dirname, '..', 'project.toml') : resolve(tomlPath);

	const projectToml = await readFile(_tomlPath, 'utf8');
	const project = parseProjectToml(projectToml);

	const ignoreIds = new Set(project.ignore.map(({ id }) => id) ?? []);
	/** @type {Record<string, string[]>} */
	const idTagMap =
		project.video?.length > 0
			? Object.fromEntries(project.video.map(({ id, tags }) => [id, tags]))
			: {};

	/** @type {Record<string, import('../src/types').VideoInfo>} */
	const videos = {};

	for (const playlist of project.playlist) {
		const videosInPlaylist = await fetchPlaylist(playlist.id);
		const tags = playlist.tags ?? [];
		videosInPlaylist.forEach(({ resourceId }) => {
			if (resourceId.videoId == null) return;
			const exist = idTagMap[resourceId.videoId];
			idTagMap[resourceId.videoId] = exist == null ? tags : [...new Set([...exist, ...tags])];
		});
		console.log('Playlist:', playlist.id);
	}

	const videoIds = Object.keys(idTagMap).filter((id) => !ignoreIds.has(id));

	if (videoIds.length > 0) {
		const videosRes = await fetchVideos(videoIds);
		await Promise.all(
			videosRes.map(async ({ id, snippet, status }) => {
				if (
					status?.privacyStatus !== 'public' ||
					!status.embeddable ||
					id == null ||
					snippet == null
				)
					return;
				const thumbnail = snippet.thumbnails && getThumbnail(snippet.thumbnails);
				const tags = [...new Set(idTagMap[id])] ?? [];
				if (thumbnail == null) return;
				if (videos[id] != null) {
					const exist = videos[id].tags;
					videos[id].tags = exist == null ? tags : [...new Set([...exist, ...tags])];
				} else {
					videos[id] = {
						title: snippet.title,
						id,
						thumbnail,
						color: await getDominantColor(thumbnail.url),
						squareThumbnail: isAutoGeneratedVideo(snippet?.description),
						description: snippet?.description,
						tags
					};
				}
				console.log('Video:', id);
			})
		);
	}

	await writeFile(
		resolve(__dirname, '..', 'src', 'resources.json'),
		JSON.stringify({
			project: project.project,
			videos: Object.values(videos)
		})
	);

	console.log(`Complete with ${Object.keys(videos).length} videos!!!`);
};

main(process.argv[2])
	.then(() => process.exit())
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
