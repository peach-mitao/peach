/* 界面音效只有一份实现，在 `frontend/src/ui-kit/sounds.ts`，随 `/dist/peach-entry.js` 发出；这里原名转出，
   开关状态因此全站一份。 */
export { UI_SOUNDS, setUiSoundsEnabled, uiSoundsEnabled, playUiSound, wireUiSounds } from '/dist/peach-entry.js';
