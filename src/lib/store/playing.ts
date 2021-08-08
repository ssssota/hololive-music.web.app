import { writable } from 'svelte/store';

export type Playing =
	| undefined
	| {
			id: string;
	  };

const createStore = () => {
	const { subscribe, set } = writable<Playing>();

	return {
		subscribe,
		setPlaying: (id: string) => set({ id }),
		stop: () => set(undefined)
	};
};

export const playing = createStore();
