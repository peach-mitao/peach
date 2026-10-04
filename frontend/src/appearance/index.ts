/* 外观与版式设置的应用层（`@peach/appearance`）：偏好 store、启动归一化，以及「读了设置之后去改 <html> /
 * <body> 属性、CSS 变量和版式开关」那一半。
 *
 * 壳（`web/app.js`）从 `peach-ui.js` 取，React 岛按 `@peach/appearance` 写，React 包构建时把它改写成
 * `/dist/peach-ui.js`：store 与写在 document 上的属性都只有一份。读路由、读目录状态的判据（现在是不是
 * JAV、是不是首页）留在壳里，算好了作为参数递进来。 */
export {
  allowedSetting, appSettingsStore, applySyncedSettings, DEFAULT_SETTINGS, FEED_COMPILATION_KEYS, FOLLOW_INITIAL_DAYS,
  METADATA_REFRESH_DAYS, normalizeAppSettings, postSearchHistoryLimit, readAppSettings, SETTINGS_KEY, THEME_CHOICES,
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
