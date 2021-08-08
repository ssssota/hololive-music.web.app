import type * as googleapis from 'googleapis';

export type Project = {
	title?: string;
	description?: string;
	origin?: string;
	ogimage?: string;
	splashimage?: string;
	color?: string;
};

export type VideoInfo = {
	id: string;
	title: string;
	thumbnail: googleapis.youtube_v3.Schema$Thumbnail;
	color: string;
	squareThumbnail?: boolean;
	tags?: string[];
	description?: string;
};
