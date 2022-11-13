import {
  getPlaylistIdFromUrl,
  getVideo,
  getVideosByPlaylist,
} from '$lib/youtube';
import type { Playlist, VideoWithId, VideoWithInfo } from '../../config/types';
import { getDominantColor } from './color';

export const getVideos = async (playlist: Playlist): Promise<VideoWithId[]> => {
  const videoIdList = await getVideosByPlaylist(
    getPlaylistIdFromUrl(playlist.url)
  );
  return videoIdList.map((videoId) => ({
    id: videoId,
    tags: [...playlist.tags],
  }));
};

export const getVideoInfo = async ({
  id,
  tags,
}: VideoWithId): Promise<VideoWithInfo> => {
  console.log(id);
  const { title, description, thumbnail } = await getVideo(id);
  return {
    id,
    title,
    description,
    thumbnail,
    tags,
    color: await getDominantColor(thumbnail),
  };
};
