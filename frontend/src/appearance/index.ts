/* The application layer of the Appearance and layout settings (@peach/appearance): the preference store, Start normalization, document properties, CSS variables, and layout toggles.
 * Application and React pages reference the same source, shipping out with peach-app.js.
 * The JAV and homepage criteria for routing and the catalog are computed by application/layout.js and passed in as parameters. */
export {
  allowedSetting, appSettingsStore, applySyncedSettings, DEFAULT_SETTINGS, FEED_COMPILATION_KEYS, FOLLOW_INITIAL_DAYS,
  normalizeAppSettings, postSearchHistoryLimit, readAppSettings, SETTINGS_KEY, THEME_CHOICES,
} from './settings';
export type { AppSettings, SyncedEffect, SyncedSettings } from './settings';
export { applyTheme, THEME_OPTIONS, watchSystemTheme } from './theme';
export { applyDensity, currentDensity, paintPhotoSizeButton, TILES, toggleDensity } from './density';
export type { Density } from './density';
export {
  cardLayoutFor, cardRatio, COVER_FRONT_RATIO, gridLayout, homeLayout, JAV_LAYOUTS, javLayout, PHOTO_LAYOUTS, PHOTO_SIZES,
  photoLayout, photoSize, storeHomeLayout, storeJavLayout, storePhotoLayout, storePhotoSize, storeVideoLayout,
} from './layout';
export type { GridLayout } from './layout';
export {
  ACCENT_CHOICES, applyAccent, applyGlassFaces, applyHomeGlow, chooseAccent, chooseGlowPreset, glowChips, paintGlowButton,
  paintHomeGlowNow, resetGlowColors, wireGlowButton,
} from './glow';
export type { GlowChip, GlowSettings } from './glow';
export {
  ACCENTS, DEFAULT_ACCENT, DEFAULT_HOME_GLOW, GLASS_NATIVE_PRESET, GLOW_SPOT_LABELS, GLOW_SWATCHES, GLOW_SWATCH_FAMILIES,
  HOME_GLOW_CHOICES, HOME_GLOW_PRESETS, HOME_GLOW_SPOTS, glowAccent, glowChipFill, glowColor, glowPalette, glowPresetName,
  isNativeGlass, normalizeAccent, normalizeHomeGlow, paintGlassFaces, paintHomeGlow,
} from './home-glow';
export type { GlowSpot, HomeGlow } from './home-glow';
