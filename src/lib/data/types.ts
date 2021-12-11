export type ProjectInfo = {
	title: string;
	description?: string;
	origin?: string;
	ogimage?: string;
	splashimage?: string;
	color?: string;
};

export type Playlist = {
	id: string;
	tags?: string[];
};

export type Video = {
	id: string;
	tags?: string[];
};

export type Project = {
	project: ProjectInfo;
	playlist?: Playlist[];
	video?: Video[];
	ignore?: { id: string }[];
};
