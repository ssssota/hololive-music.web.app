import { loadConfig } from '$lib/server/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    config: loadConfig('configs/main.toml'),
  };
};
