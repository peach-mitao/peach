/* UI preferences' defaults, startup normalization and single store (peach.settings.v1).
 * Application, the settings panel, sidebar and color popover read and write one object through shared source.
 * The first appSettingsStore() reads from localStorage, normalizes and creates the instance, in place synchronously during
 * startup.
 * Legacy values are accepted only when shape and range are legal; an illegal item takes that item's default. */
import { api } from '@peach/legacy/core';

import { normalizeJavPreferences } from '../jav-artwork';
import { boundedPreference } from '../number-setting';
import { createSettingsStore, type SettingsStore } from '../settings-store';
import { DEFAULT_SIDEBAR_ORDER, normalizeSidebarOrder } from '../sidebar';
import { SORT_ALIASES, SORT_KEYS } from '../sort-preferences';
import { DEFAULT_ACCENT, DEFAULT_HOME_GLOW, normalizeAccent, normalizeHomeGlow, type HomeGlow } from './home-glow';

export const SETTINGS_KEY = 'peach.settings.v1';
/* Three theme tiers, key names written the same way as `data-theme` on <html>: web/css/01-base.css's palette
   is already written along both the `prefers-color-scheme` and `[data-theme]` paths; this only picks which one.
   Follow system is the default tier; choosing it means not writing the attribute. */
export const THEME_CHOICES: readonly string[] = ['system', 'light', 'dark'];
/** How many days back the first follows collection reaches; the same table as the database copy. */
export const FOLLOW_INITIAL_DAYS: readonly number[] = [0, 7, 30, 90];
/* Whether the new releases row includes compilations is filtered server-side from the database setting (one source for the list, unread counts and cover backfill); this page only
   mirrors it: the switch's truth lives in `/api/settings`. By default large compilations and clips are collapsed, while solo compilations stay listed. */
export const FEED_COMPILATION_KEYS = ['feedHideGroupCompilations', 'feedHideSoloCompilations', 'feedHideExcerpts'] as const;

/** The fields guaranteed present after normalization. The object carries other fields too (written on demand by the shell and the islands), not listed one by one here. */
export interface AppSettings {
  [key: string]: unknown;
  batchSize: number;
  defaultSort: string;
  defaultSortDirection?: string;
  sortDefaultsVersion: number;
  hoverDelaySeconds: number;
  seekSeconds: number;
  searchHistoryLimit: number;
  relatedLimit: number;
  feedLimit: number;
  javLayout: string;
  homeLayout: string;
  javImage: string;
  performerNameLanguage: 'zh-CN' | 'ja';
  followLayout: string;
  peopleLayout: string;
  photoSize: string;
  photoLayout?: string;
  followImagesOnly?: boolean;
  ambientMode: boolean;
  miniplayer: boolean;
  theaterMode: boolean;
  theme: string;
  groupCollapse: boolean;
  detailAutoplay: boolean;
  uiSounds: boolean;
  feedAutoScroll: boolean;
  feedHideGroupCompilations: boolean;
  feedHideSoloCompilations: boolean;
  feedHideExcerpts: boolean;
  followInitialDays: number;
  sidebarOrder: string[];
  homeGlow: HomeGlow;
  accent: string;
}

export const DEFAULT_SETTINGS = {
  batchSize: 60, defaultSort: 'seed', sortDefaultsVersion: 3, hoverDelaySeconds: 5, seekSeconds: 10,
  searchHistoryLimit: 10, relatedLimit: 20, feedLimit: 12, javLayout: 'big', homeLayout: 'small', javImage: 'cover',
  followLayout: 'default', peopleLayout: 'big', photoSize: 'small', ambientMode: true, miniplayer: true,
  theaterMode: false, theme: 'system', groupCollapse: true, sidebarOrder: [...DEFAULT_SIDEBAR_ORDER],
  homeGlow: DEFAULT_HOME_GLOW, accent: DEFAULT_ACCENT, performerNameLanguage: 'zh-CN',
} as const;

/** Whitelisted values are returned as-is, otherwise `fallback`. */
export const allowedSetting = <T>(value: unknown, allowed: readonly T[], fallback: T): T =>
  allowed.includes(value as T) ? value as T : fallback;

/** The persisted legacy copy read back, normalized into a full preferences object. `migrated` true means an old key was rewritten and one write to disk is due. */
export function normalizeAppSettings(raw: unknown): { settings: AppSettings; migrated: boolean } {
  const saved = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
  const settings = { ...DEFAULT_SETTINGS, ...saved } as Record<string, unknown>;
  settings.followInitialDays = FOLLOW_INITIAL_DAYS.includes(+(settings.followInitialDays as number))
    ? +(settings.followInitialDays as number) : 30;
  delete settings.rotateMinutes;
  /* Migration touches only the default value itself: swap keys that no longer exist in the UI for current keys, leaving user-chosen sort orders alone.
     Without migration the whitelist would silently knock it back to random. */
  let migrated = false;
  const version = +(settings.sortDefaultsVersion as number) || 0;
  if (version < 2 && settings.defaultSort === 'new') { settings.defaultSort = 'seed'; migrated = true }
  const alias = SORT_ALIASES[settings.defaultSort as string];
  if (version < 3 && alias) { settings.defaultSort = alias[0]; migrated = true }
  settings.sortDefaultsVersion = 3;
  settings.batchSize = boundedPreference(+(settings.batchSize as number), 1, 200, 60);
  settings.defaultSort = allowedSetting(settings.defaultSort, SORT_KEYS, 'seed');
  settings.hoverDelaySeconds = boundedPreference(+(settings.hoverDelaySeconds as number), 0, 60, 5);
  settings.seekSeconds = boundedPreference(+(settings.seekSeconds as number), 1, 300, 10);
  delete settings.loginDays;
  delete settings.metadataRefreshDays;
  settings.ambientMode = settings.ambientMode !== false;
  settings.theaterMode = settings.theaterMode === true;
  settings.groupCollapse = settings.groupCollapse !== false;
  settings.detailAutoplay = settings.detailAutoplay !== false;
  settings.miniplayer = settings.miniplayer !== false;
  settings.uiSounds = settings.uiSounds !== false;
  settings.feedAutoScroll = settings.feedAutoScroll !== false;
  settings.feedHideGroupCompilations = settings.feedHideGroupCompilations !== false;
  settings.feedHideSoloCompilations = settings.feedHideSoloCompilations === true;
  settings.feedHideExcerpts = settings.feedHideExcerpts !== false;
  settings.searchHistoryLimit = boundedPreference(+(settings.searchHistoryLimit as number), 0, 50, 10);
  settings.relatedLimit = boundedPreference(+(settings.relatedLimit as number), 0, 60, 20);
  settings.feedLimit = boundedPreference(+(settings.feedLimit as number), 1, 100, 12);
  Object.assign(settings, normalizeJavPreferences(settings));
  settings.theme = allowedSetting(settings.theme, THEME_CHOICES, 'system');
  settings.performerNameLanguage = allowedSetting(settings.performerNameLanguage, ['zh-CN', 'ja'], 'zh-CN');
  settings.homeGlow = normalizeHomeGlow(settings.homeGlow);
  settings.accent = normalizeAccent(settings.accent);
  settings.sidebarOrder = normalizeSidebarOrder(settings.sidebarOrder);
  return { settings: settings as AppSettings, migrated };
}

/** Reads back from `storage` and normalizes; stored text that is not valid JSON counts as nothing stored. */
export function readAppSettings(storage: Pick<Storage, 'getItem'>): { settings: AppSettings; migrated: boolean } {
  let raw: unknown = {};
  try { raw = JSON.parse(storage.getItem(SETTINGS_KEY) || '{}') } catch { /* Broken legacy entries count as empty */ }
  return normalizeAppSettings(raw);
}

let store: SettingsStore<AppSettings> | null = null;

/** The page-wide preference store. Reads back and normalizes on first call; if it rewrote an old key it persists to disk right away. */
export function appSettingsStore(): SettingsStore<AppSettings> {
  if (store) return store;
  const { settings, migrated } = readAppSettings(localStorage);
  store = createSettingsStore(SETTINGS_KEY, settings);
  if (migrated) store.save();
  return store;
}

/** The name reported when the database copy requires a shell-side effect to follow (the same names as the settings panel's effects). */
export type SyncedEffect = 'searchHistoryLimit' | 'performerNameLanguage';

/** The shape of the search history limit on `/api/settings`: null until it has ever been set. */
export interface SyncedSettings {
  performerNameLanguage?: unknown;
  followInitialDays?: unknown;
  feedHideGroupCompilations?: unknown;
  feedHideSoloCompilations?: unknown;
  feedHideExcerpts?: unknown;
  searchHistoryLimit?: unknown;
  sidebarOrder?: unknown;
}

/* The database's copy lands in local cache. The shell fetches once at startup and the settings panel fetches again on each open, both handed here; the open panel and
   sidebar follow via store notices: when the sidebar order changes, it reorders on the spot. A change in search history count must reach the search island; that handoff
   goes back to the shell via `changed`. */
export function applySyncedSettings(
  remote: SyncedSettings | null | undefined, changed: (effect: SyncedEffect) => void,
  target: SettingsStore<AppSettings> = appSettingsStore(),
): void {
  const settings = target.value;
  const language = remote?.performerNameLanguage;
  if ((language === 'zh-CN' || language === 'ja') && language !== settings.performerNameLanguage) {
    settings.performerNameLanguage = language;
    target.save();
    changed('performerNameLanguage');
  }
  const initial = remote && remote.followInitialDays;
  if (FOLLOW_INITIAL_DAYS.includes(initial as number)) { settings.followInitialDays = initial as number; target.save() }
  for (const key of FEED_COMPILATION_KEYS) {
    if (typeof remote?.[key] !== 'boolean' || remote[key] === settings[key]) continue;
    settings[key] = remote[key] as boolean; target.save();
  }
  /* When the database has no count yet, this device's locally changed number settles it for all clients up front, sent just this once. */
  const limit = remote && remote.searchHistoryLimit;
  if (Number.isInteger(limit) && (limit as number) >= 0 && (limit as number) <= 50) {
    if (limit !== settings.searchHistoryLimit) {
      settings.searchHistoryLimit = boundedPreference(limit as number, 0, 50, 10); target.save();
      changed('searchHistoryLimit');
    }
  } else if (remote && remote.searchHistoryLimit === null
    && settings.searchHistoryLimit !== DEFAULT_SETTINGS.searchHistoryLimit) postSearchHistoryLimit(target);
  const order = Array.isArray(remote && remote.sidebarOrder) ? remote!.sidebarOrder as string[] : null;
  if (!order || !order.length || order.join(',') === settings.sidebarOrder.join(',')) return;
  settings.sidebarOrder = order;
  target.save();
}

/** Ships the local search history count to the database; failures are silent and retried at the next reconciliation. */
export function postSearchHistoryLimit(target: SettingsStore<AppSettings> = appSettingsStore()): Promise<unknown> {
  return api('/api/settings', {
    method: 'POST', body: JSON.stringify({ searchHistoryLimit: target.value.searchHistoryLimit }),
  }).catch(() => {});
}
