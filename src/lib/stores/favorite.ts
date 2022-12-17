import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

type State = Set<string>;
type Actions = {
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
};

const storageKey = 'favorite';

const getFavorites = (): string[] => {
  if (!browser) return [];
  const favorites = localStorage.getItem(storageKey);
  try {
    return favorites !== null ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
};

const setFavorites = (favorites: string[]): void => {
  if (!browser) return;
  localStorage.setItem(storageKey, JSON.stringify(favorites));
};

export const createFavoriteStore = (): Writable<State> & Actions => {
  const { subscribe, update, set } = writable<State>(new Set(getFavorites()));
  return {
    add: (id: string) =>
      update((s) => {
        if (s.has(id)) return s;
        const favorites = [...s, id];
        setFavorites(favorites);
        return new Set(favorites);
      }),
    remove: (id: string) =>
      update((s) => {
        const favorites = [...s].filter((favorite) => favorite !== id);
        setFavorites(favorites);
        return new Set(favorites);
      }),
    toggle: (id: string) =>
      update((s) => {
        const favorites = s.has(id)
          ? [...s].filter((favorite) => favorite !== id)
          : [...s, id];
        setFavorites(favorites);
        return new Set(favorites);
      }),
    subscribe,
    update,
    set,
  };
};
