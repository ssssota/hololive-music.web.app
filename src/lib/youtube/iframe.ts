import { browser } from '$app/environment';
import load from 'load-script';

import type create from 'youtube-player';
type Create = typeof create;
export type YTPlayer = ReturnType<Create>;
export type YTPlayerOptions = Parameters<Create>[1];
type YT = {
  Player: new (...args: Parameters<Create>) => YTPlayer;
};

let resolve: (() => void) | undefined;
let reject: ((error: Error) => void) | undefined;
export const YTPromise = new Promise<void>((f, r) => {
  resolve = f;
  reject = r;
}).then(() => {
  return (window as unknown as { YT: YT }).YT;
});

if (browser) {
  Object.defineProperty(window, 'onYouTubeIframeAPIReady', {
    get() {
      return resolve;
    },
  });
  load('https://www.youtube.com/iframe_api', (err) => {
    if (err) reject?.(err);
  });
}
