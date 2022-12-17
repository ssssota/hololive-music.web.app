import { cancelIdleCallback, requestIdleCallback } from './index';

globalThis.requestIdleCallback = requestIdleCallback;
globalThis.cancelIdleCallback = cancelIdleCallback;
