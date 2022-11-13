import { Innertube, UniversalCache } from 'youtubei.js';

let client: Innertube | undefined;

export const getClient = async ({
  cachePersistence = false,
  language = 'ja',
}): Promise<Innertube> => {
  if (client) return client;

  client = await Innertube.create({
    cache: new UniversalCache(cachePersistence),
    lang: language,
  });
  return client;
};
