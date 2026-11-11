/* 手机旋转式全屏（ADR-0031 后的全屏约定）：进全屏把屏幕锁成横屏——屏幕真的转过去，
 * 画面与控件按横屏原样排布，退出/不合条件时解锁，手机回到原来的方向。
 *
 * 不支持的平台（iOS Safari、桌面）锁不上就安静失败，留在 `data-landscape` 的界面横置那一档
 * （内容层转 90°，手机横过来拿）。锁成功后视口变横，`data-landscape` 的判定（竖屏视口）自动
 * 退出，两档不会叠着用。 */
let held = false;

/** `want`：此刻要不要锁横屏（全屏 + 横版视频）。解锁幂等，锁失败不留状态。 */
export function lockScreenLandscape(want: boolean): void {
  const orientation = (globalThis.screen as Screen | undefined)?.orientation as ScreenOrientation | undefined;
  if (!want) {
    held = false;
    try { orientation?.unlock?.() } catch { /* 不支持的平台当无事发生 */ }
    return;
  }
  if (held) return;
  held = true;
  try {
    const result = orientation?.lock?.('landscape');
    void result?.catch?.(() => { held = false });
  } catch {
    held = false;
  }
}
