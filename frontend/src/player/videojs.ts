/* Video.js 10's browser modules are loaded from local on demand; All relative imports are pinned by the vendor entry. */
import type { VideojsFactory } from './types';
import { createV10Player } from './v10-player';

const VIDEOJS = '/vendor/videojs/10.3.0/';
const MODULES = [
  'video-player.js', 'media/hlsjs-video.js', 'media/dash-video.js', 'ui/container.js', 'ui/play-button.js',
  'ui/mute-button.js', 'ui/fullscreen-button.js', 'ui/pip-button.js', 'ui/time-slider.js',
  'ui/volume-slider.js', 'ui/slider-track.js', 'ui/slider-fill.js', 'ui/slider-buffer.js',
  'ui/slider-thumb.js', 'ui/slider-value.js', 'i18n.js', 'locales/zh-CN.js',
];

let loader: Promise<VideojsFactory> | null = null;

export function ensureVideojs(): Promise<VideojsFactory> {
  loader ??= Promise.all(MODULES.map(name => import(/* @vite-ignore */ `${VIDEOJS}${name}`)))
    .then(() => createV10Player)
    .catch((error: unknown) => { loader = null; throw error });
  return loader;
}
