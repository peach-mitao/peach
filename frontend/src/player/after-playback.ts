import { t } from '../i18n';

export const AFTER_PLAYBACK_CHOICES = ['stop', 'next', 'repeat-all', 'shuffle', 'repeat-one'] as const;
export type AfterPlayback = (typeof AFTER_PLAYBACK_CHOICES)[number];

export const AFTER_PLAYBACK_ICONS = {
  stop: 'stop', next: 'skip-forward', 'repeat-all': 'repeat', shuffle: 'shuffle', 'repeat-one': 'repeat-one',
} as const satisfies Record<AfterPlayback, string>;

const LABELS = {
  stop: 'settings:playbackEnd.stop', next: 'settings:playbackEnd.next',
  'repeat-all': 'settings:playbackEnd.repeatAll', shuffle: 'settings:playbackEnd.shuffle',
  'repeat-one': 'settings:playbackEnd.repeatOne',
} as const satisfies Record<AfterPlayback, string>;

export const afterPlaybackLabel = (mode: AfterPlayback) => t(LABELS[mode]);
