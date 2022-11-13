/**
 * Get video id from Youtube video url
 * @param url Youtube video URL
 */
export const getVideoIdFromUrl = (url: string): string => {
  const urlObject = new URL(url);
  const queryV = urlObject.searchParams.get('v');
  if (queryV) return queryV;
  const id = urlObject.pathname.split('/').pop();
  if (id) return id;
  throw new Error('Invalid Youtube video URL');
};

/**
 * Get playlist id from Youtube playlist url
 * @param url Youtube playlist URL
 */
export const getPlaylistIdFromUrl = (url: string): string => {
  const urlObject = new URL(url);
  const queryList = urlObject.searchParams.get('list');
  if (queryList) return queryList;
  throw new Error('Invalid playlist URL');
};

/**
 * Get video url from video id
 * @param videoId Youtube video id
 */
export const getVideoUrlFromId = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

/**
 * Get playlist url from playlist id
 * @param playlistId Youtube playlist id
 */
export const getPlaylistUrlFromId = (playlistId: string): string => {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
};
