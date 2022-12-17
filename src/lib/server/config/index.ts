import { config } from '../../config/types';
import type { ParsedConfig, Config } from '../../config/types';
import TOML from '@iarna/toml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { sequence } from '$lib/utils';

const load = async (configPath: string): Promise<Config> => {
  const file = await readFile(configPath, 'utf-8');
  const json = TOML.parse(file);
  return config.parse(json);
};

export const loadConfig = async (configPath: string): Promise<ParsedConfig> => {
  const parsed = await load(configPath);
  const children = await sequence(
    parsed.files.map((file) => () => {
      return loadConfig(resolve(configPath, '..', file));
    })
  );

  return {
    videos: [...parsed.videos, ...children.flatMap((c) => c.videos)].map(
      (video) => ({
        ...video,
        tags: [...video.tags, ...parsed.tags],
      })
    ),
    playlists: [
      ...parsed.playlists,
      ...children.flatMap((c) => c.playlists),
    ].map((playlist) => ({
      ...playlist,
      tags: [...playlist.tags, ...parsed.tags],
    })),
    ignores: [...parsed.ignores, ...children.flatMap((c) => c.ignores)],
  };
};
