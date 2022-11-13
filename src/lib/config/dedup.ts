import type { VideoWithId } from './types';

export const dedupVideos = (videos: VideoWithId[]): VideoWithId[] => {
  return Object.entries(
    videos.reduce<Record<string, string[]>>((acc, { id, tags }) => {
      acc[id] = [...(acc[id] ?? []), ...tags];
      return acc;
    }, {})
  ).map(([videoId, tags]) => ({
    id: videoId,
    tags,
  }));
};
