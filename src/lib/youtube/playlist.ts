import { browser, dev } from '$app/environment';
import { getClient } from './client';

export const getVideosByPlaylist = async (
  playlistId: string
): Promise<string[]> => {
  console.log(`Fetching playlist(${playlistId}) ...`);
  const client = await getClient({
    cachePersistence: browser || dev,
    language: browser ? navigator.language : 'ja',
  });
  const playlist = await client.getPlaylist(playlistId);
  return playlist.items.flatMap((item) => {
    const maybeId = item.key('id');
    return maybeId.isString() ? [maybeId.string()] : [];
  });
};
