/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-check
import TOML from '@iarna/toml';

/**
 * @param {unknown} str Unknown object expect string
 * @param {string} path Property path
 * @returns {string}
 */
const validateString = (str, path) => {
	if (typeof str === 'string') return str;
	throw new Error(`Validation error ${path} is not string`);
};

/**
 * @param {unknown} str Unknown object expect nullable string
 * @param {string} path Property path
 * @returns {string | undefined}
 */
const validateNullableString = (str, path) => {
	if (str == null) return undefined;
	return validateString(str, path);
};

/**
 * @param {unknown} arr Unknown object expect string array
 * @param {string} path Property path
 * @returns {string[]}
 */
const validateStringArray = (arr, path) => {
	if (!Array.isArray(arr)) throw new Error(`Validation error ${path} is not array`);
	const result = [];
	for (const element of arr) {
		result.push(validateString(element, path));
	}
	return result;
};

/**
 * @param {object} parsed parsed project.toml
 * @returns {import('./types').ProjectInfo}
 */
const getProjectInfo = (parsed) => {
	const project = parsed['project'];
	if (project == null || typeof project !== 'object')
		throw new Error('Validation error project must be object');
	return {
		title: validateString(project['title'], 'project.title'),
		description: validateNullableString(project['description'], 'project.description'),
		origin: validateNullableString(project['origin'], 'project.origin'),
		ogimage: validateNullableString(project['ogimage'], 'project.ogimage'),
		splashimage: validateNullableString(project['splashimage'], 'project.splashimage'),
		color: validateNullableString(project['color'], 'project.color')
	};
};

/**
 * @param {object} parsed parsed project.toml
 * @returns {import('./types').Playlist[]}
 */
const getPlaylist = (parsed) => {
	if (parsed['playlist'] == null) return undefined;
	const playlists = parsed['playlist'];
	if (!Array.isArray(playlists))
		throw new Error(`Validation error ${playlists} must be Playlist[]`);
	const result = [];
	for (const playlist of playlists) {
		result.push({
			id: validateString(playlist['id'], 'playlist.id'),
			tags:
				playlist['tags'] == null
					? undefined
					: validateStringArray(playlist['tags'], 'playlist.tags')
		});
	}
	return result;
};

/**
 * @param {object} parsed parsed project.toml
 * @returns {import('./types').Video[]}
 */
const getVideo = (parsed) => {
	if (parsed['video'] == null) return undefined;
	const videos = parsed['video'];
	if (!Array.isArray(videos)) throw new Error(`Validation error ${videos} must be Video[]`);
	const result = [];
	for (const video of videos) {
		result.push({
			id: validateString(video['id'], 'video.id'),
			tags: video['tags'] == null ? undefined : validateStringArray(video['tags'], 'video.tags')
		});
	}
	return result;
};

/**
 * @param {object} parsed parsed project.toml
 * @returns {{ id: string }[]}
 */
const getIgnore = (parsed) => {
	if (parsed['ignore'] == null) return undefined;
	const ignores = parsed['ignore'];
	if (!Array.isArray(ignores)) throw new Error(`Validation error ${ignores} must be Ignore[]`);
	const result = [];
	for (const ignore of ignores) {
		result.push({ id: validateString(ignore['id'], 'ignore.id') });
	}
	return result;
};

/**
 * @param {string} toml project.toml string
 * @returns {import('./types').Project}
 */
export const parseProjectToml = (toml) => {
	const parsed = TOML.parse(toml);

	return {
		project: getProjectInfo(parsed),
		playlist: getPlaylist(parsed),
		video: getVideo(parsed),
		ignore: getIgnore(parsed)
	};
};
