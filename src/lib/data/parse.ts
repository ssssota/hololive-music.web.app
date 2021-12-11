import TOML from '@iarna/toml';
import type { Project, Playlist, ProjectInfo, Video } from './types';

const validateString = (str: unknown, path: string): string => {
	if (typeof str === 'string') return str;
	throw new Error(`Validation error ${path} is not string`);
};

const validateNullableString = (str: unknown, path: string): string | undefined => {
	if (str == null) return undefined;
	return validateString(str, path);
};

const validateStringArray = (arr: unknown, path: string): string[] => {
	if (!Array.isArray(arr)) throw new Error(`Validation error ${path} is not array`);
	const result = [];
	for (const element of arr) {
		result.push(validateString(element, path));
	}
	return result;
};

const getProjectInfo = (parsed: TOML.JsonMap): ProjectInfo => {
	const project = parsed['project'];
	if (
		project == null ||
		typeof project !== 'object' ||
		Array.isArray(project) ||
		project instanceof Date
	)
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

const getPlaylist = (parsed: TOML.JsonMap): Playlist[] | undefined => {
	if (parsed['playlist'] == null) return undefined;
	const playlists = parsed['playlist'];
	if (!Array.isArray(playlists)) throw new Error(`Validation error playlists must be Playlist[]`);
	const result = [];
	for (const playlist of playlists) {
		if (
			playlist == null ||
			typeof playlist !== 'object' ||
			Array.isArray(playlist) ||
			playlist instanceof Date
		)
			throw new Error('Validation error playlist must be object');
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

const getVideo = (parsed: TOML.JsonMap): Video[] | undefined => {
	if (parsed['video'] == null) return undefined;
	const videos = parsed['video'];
	if (!Array.isArray(videos)) throw new Error(`Validation error ${videos} must be Video[]`);
	const result = [];
	for (const video of videos) {
		if (video == null || typeof video !== 'object' || Array.isArray(video) || video instanceof Date)
			throw new Error('Validation error video must be object');
		result.push({
			id: validateString(video['id'], 'video.id'),
			tags: video['tags'] == null ? undefined : validateStringArray(video['tags'], 'video.tags')
		});
	}
	return result;
};

const getIgnore = (parsed: TOML.JsonMap): { id: string }[] | undefined => {
	if (parsed['ignore'] == null) return undefined;
	const ignores = parsed['ignore'];
	if (!Array.isArray(ignores)) throw new Error(`Validation error ${ignores} must be Ignore[]`);
	const result = [];
	for (const ignore of ignores) {
		if (
			ignore == null ||
			typeof ignore !== 'object' ||
			Array.isArray(ignore) ||
			ignore instanceof Date
		)
			throw new Error('Validation error ignore must be object');
		result.push({ id: validateString(ignore['id'], 'ignore.id') });
	}
	return result;
};

export const parseProjectToml = (toml: string): Project => {
	const parsed = TOML.parse(toml);

	return {
		project: getProjectInfo(parsed),
		playlist: getPlaylist(parsed),
		video: getVideo(parsed),
		ignore: getIgnore(parsed)
	};
};
