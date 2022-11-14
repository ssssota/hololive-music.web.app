import { dev } from '$app/environment';
import * as youtube from 'youtubei.js';

const yt = dev ? youtube : (youtube.default as unknown as typeof youtube);

let client: youtube.Innertube | undefined;

export const getClient = async ({
  cachePersistence = false,
  language = 'ja',
}): Promise<youtube.Innertube> => {
  if (client) return client;

  client = await yt.Innertube.create({
    cache: new yt.UniversalCache(cachePersistence),
    lang: language,
  });
  return client;
};
