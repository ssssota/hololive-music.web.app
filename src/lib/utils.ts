import urlRegex from 'url-regex';

export const getShuffled = <T>(arr: T[]): T[] => {
	const copied = [...arr];
	let i = arr.length;
	while (i-- > 0) {
		const rnd = Math.floor(Math.random() * i);
		const tmp = copied[rnd];
		copied[rnd] = copied[i];
		copied[i] = tmp;
	}
	return copied;
};

/**
 * (0 <= r,g,b <= 255)
 */
export type Color = {
	r: number;
	g: number;
	b: number;
};

export const parseHexColor = (hexColorCode: string): Color => {
	if (hexColorCode.match(/^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i) === null)
		throw new Error(`Invalid color code ${hexColorCode}`);
	return {
		r: parseInt(hexColorCode.slice(1, 3), 16),
		g: parseInt(hexColorCode.slice(3, 5), 16),
		b: parseInt(hexColorCode.slice(5, 7), 16)
	};
};

// ref. https://www.w3.org/TR/AERT/#color-contrast
export const betterForground = (backgroundColor: Color): 'white' | 'black' =>
	(backgroundColor.r * 299 + backgroundColor.g * 587 + backgroundColor.b * 114) / 1000 < 128
		? 'white'
		: 'black';

export const splitWithUrl = (text: string): string[] => {
	const regex = urlRegex();
	const splitted = text.split(regex);
	const urls = text.match(regex);

	// text has no urls
	if (urls === null) return splitted;
	// unexpected exception
	if (splitted.length !== urls.length + 1) return [text];

	return splitted.reduce((acc: string[], cur, i) => {
		acc.push(cur);
		if (urls[i] != null) acc.push(urls[i]);
		return acc;
	}, []);
};
