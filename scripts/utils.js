/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-check
import { getPalette } from 'colorthief';

/**
 * @param {import('googleapis').youtube_v3.Schema$ThumbnailDetails} thumbnailObject
 * @returns {import('googleapis').youtube_v3.Schema$Thumbnail}
 */
export const getThumbnail = (thumbnailObject) =>
	thumbnailObject.medium ?? // ~320x180
	thumbnailObject.maxres ?? // ~1280x720
	thumbnailObject.standard ?? // ~640x480
	thumbnailObject.high ?? // ~480x360
	thumbnailObject.default; // ~120x90

/**
 * @param {string} imgUrl
 * @returns {Promise<string>}
 */
export const getDominantColor = async (imgUrl) => {
	/** @type {[number, number, number][]} */
	const [dominantColor] = await getPalette(imgUrl, 2, 2);
	return `#${dominantColor.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

/**
 * @template T
 * @param {T[]} arr
 * @param {number} count
 * @returns {T[][]}
 */
export const splitArrayIntoChunk = (arr, count) =>
	Array(Math.ceil(arr.length / count))
		.fill(0)
		.map((_, i) => arr.slice(i * count, i * count + count));
