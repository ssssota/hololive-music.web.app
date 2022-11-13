import { dedupVideos, getVideoInfo, getVideos } from '$lib/config';
import { loadConfig } from '$lib/server/config';
import { sequence } from '$lib/utils';
import { getVideoIdFromUrl } from '$lib/youtube';
import type { LayoutServerLoad } from './$types';

const videos = (async () => {
  const config = await loadConfig(
    /* 'configs/main.toml' */ 'configs/jp/talents/robocosan.toml'
  );

  const ignoreVideoIds = config.ignores.map(getVideoIdFromUrl);
  const videos = dedupVideos(
    [
      ...config.videos.map(({ url, tags }) => ({
        id: getVideoIdFromUrl(url),
        tags,
      })),
      ...(
        await sequence(
          config.playlists.map((playlist) => () => getVideos(playlist))
        )
      ).flat(),
    ].filter(({ id }) => !ignoreVideoIds.includes(id))
  );
  console.log(
    'No tag videos found: ',
    videos
      .filter(({ tags }) => tags.length === 0)
      .map(({ id }) => id)
      .join(', ')
  );

  const videoInfoList = await sequence(
    videos.map((video) => () => getVideoInfo(video))
  );

  return videoInfoList;
})();

export const load: LayoutServerLoad = async () => {
  return { videos };
};
