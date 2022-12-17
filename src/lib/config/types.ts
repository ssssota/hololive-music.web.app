import { z } from 'zod';

export const video = z.object({
  url: z.string(),
  tags: z.array(z.string()).default([]),
});

export const playlist = z.object({
  url: z.string(),
  tags: z.array(z.string()).default([]),
});

export const config = z.object({
  files: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  videos: z.array(video).default([]),
  playlists: z.array(playlist).default([]),
  ignores: z.array(z.string()).default([]),
});

export type Video = z.infer<typeof video>;
export type Playlist = z.infer<typeof playlist>;
export type Config = z.infer<typeof config>;
export type ParsedConfig = Omit<Config, 'files' | 'tags'>;

export type VideoWithId = Omit<Video, 'url'> & { id: string };
export type VideoWithInfo = VideoWithId & {
  title: string;
  description: string;
  thumbnail: string;
  color: string;
};
