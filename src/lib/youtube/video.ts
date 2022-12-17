import { browser, dev } from '$app/environment';
import type Thumbnail from 'youtubei.js/dist/src/parser/classes/misc/Thumbnail';
import { getClient } from './client';

type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
};

const getMostHighResolutionThumbnail = async (
  thumbnails: Thumbnail[]
): Promise<Thumbnail> => {
  if (thumbnails.length === 0) throw new Error('No thumbnails found');
  return thumbnails.reduce((prev, current) => {
    return prev.width > current.width ? prev : current;
  });
};

export const getVideo = async (videoId: string): Promise<Video> => {
  const client = await getClient({
    cachePersistence: browser || dev,
    language: browser ? navigator.language : 'ja',
  });
  const video = await client.getInfo(videoId);
  const { primary_info, secondary_info, basic_info } = video;
  const thumbnail = await getMostHighResolutionThumbnail(
    basic_info.thumbnail ?? []
  );
  return {
    id: videoId,
    title: primary_info?.title.text ?? 'Error',
    description: secondary_info?.description.text ?? 'Error',
    thumbnail: thumbnail.url,
  };
};
