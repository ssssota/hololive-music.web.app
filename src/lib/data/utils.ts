import { getPalette } from 'colorthief';
import type { youtube_v3 } from 'googleapis';

export const getThumbnail = (
	thumbnailObject: youtube_v3.Schema$ThumbnailDetails
): youtube_v3.Schema$Thumbnail | undefined =>
	thumbnailObject.medium ?? // ~320x180
	thumbnailObject.maxres ?? // ~1280x720
	thumbnailObject.standard ?? // ~640x480
	thumbnailObject.high ?? // ~480x360
	thumbnailObject.default; // ~120x90

export const getDominantColor = async (imgUrl: string): Promise<string> => {
	const [dominantColor] = await getPalette(imgUrl, 2, 2);
	return `#${dominantColor.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

export const splitArrayIntoChunk = <T>(arr: T[], count: number): T[][] =>
	Array(Math.ceil(arr.length / count))
		.fill(0)
		.map((_, i) => arr.slice(i * count, i * count + count));

export const getShuffled = <T>(arr: T[]): T[] => {
	const copied = [...arr];
	let i = arr.length;
	while (i > 0) {
		const rnd = Math.floor(Math.random() * i--);
		const tmp = copied[rnd];
		copied[rnd] = copied[i];
		copied[i] = tmp;
	}
	return copied;
};

export const notNullable = <T>(item?: T | null): item is T => item != null;

export const removeDuplicate = <T>(...arr: (T | null | undefined)[]): T[] => [
	...new Set(arr.filter(notNullable))
];
