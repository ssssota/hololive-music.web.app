import type { Readable } from 'svelte/store';
import { get, writable } from 'svelte/store';

type Base = {
  type: string;
  id?: string;
};
type Prepare = {
  type: 'prepare';
};
type Unstarted = {
  type: 'unstarted';
};
type Loading = {
  type: 'loading';
  id: string;
};
type Playing = {
  type: 'playing';
  id: string;
};
type Paused = {
  type: 'paused';
  id: string;
};
type State = Readonly<
  Base & (Prepare | Unstarted | Loading | Playing | Paused)
>;
type Actions = {
  ready: () => void;
  load: (id: string) => void;
  play: () => void;
  pause: () => void;
};
const initial: State = { type: 'prepare' };

export const createPlayingStateStore = (): Readable<State> & Actions => {
  const { subscribe, set } = writable<State>(initial);
  const readable = { subscribe };
  const getState = () => get(readable);

  const ready = () => {
    const state = getState();
    if (state.type !== 'prepare') return;
    set({ type: 'unstarted' });
  };
  const load = (id: string) => {
    const state = getState();
    if (state.type === 'prepare') return;
    if (state.type === 'playing' && state.id === id) return;
    set({ type: 'loading', id });
  };
  const play = () => {
    const state = getState();
    if (
      state.type === 'unstarted' ||
      state.type === 'prepare' ||
      state.type === 'playing'
    )
      return;
    set({ ...state, type: 'playing' });
  };
  const pause = () => {
    const state = getState();
    if (state.type !== 'playing') return;
    set({ ...state, type: 'paused' });
  };

  return {
    ready,
    load,
    pause,
    play,
    subscribe,
  };
};
