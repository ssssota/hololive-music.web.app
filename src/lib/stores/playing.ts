import { writable, type Readable } from 'svelte/store';
type Base = {
  type: string;
  id?: string;
};
type Unstarted = {
  type: 'unstarted';
};
type Playing = {
  type: 'playing';
  id: string;
};
type Paused = {
  type: 'paused';
  id: string;
};
type Unpaused = {
  type: 'unpaused';
  id: string;
};
type State = Readonly<Base & (Unstarted | Playing | Paused | Unpaused)>;
type Actions = {
  play: (id: string) => void;
  pause: () => void;
};

export const createPlayingStateStore = (): Readable<State> & Actions => {
  const { subscribe, update } = writable<State>({ type: 'unstarted' });
  return {
    pause: () =>
      update((s) => (s.type === 'unstarted' ? s : { ...s, type: 'paused' })),
    play: (id: string) =>
      update((s) => {
        if (s.id === id && (s.type === 'playing' || s.type === 'unpaused'))
          return s;
        if (s.id === id && s.type === 'paused')
          return { ...s, type: 'unpaused' };
        return { ...s, type: 'playing', id };
      }),
    subscribe,
  };
};
