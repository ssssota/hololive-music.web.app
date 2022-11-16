import { browser } from '$app/environment';
import load from 'load-script';

interface YTObject {
  Player: typeof YT.Player;
}

let resolve: (() => void) | undefined;
let reject: ((error: Error) => void) | undefined;
export const YTPromise = new Promise<void>((f, r) => {
  resolve = f;
  reject = r;
}).then(() => {
  return (window as unknown as { YT: YTObject }).YT;
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
