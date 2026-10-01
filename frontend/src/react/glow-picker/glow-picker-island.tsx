/* 侧栏配色卡岛：侧栏底部那枚配色钮点开的那张卡，照 boardui.com 右下角那枚「Accent color」。
 *
 * 头部一行标题加「重置」文字键，主体是两组 6 列圆球——上面一组光晕（与设置面板「配色」同一组，
 * `GlowPresetGrid`）、下面一组强调色（BoardUI 自己那颗 radial-gradient 的球），底部一枚全宽主按钮
 * 通到详细设置。实测见 docs/reference-snapshots/feralui-studio-boardui-accent-measured.md。
 *
 * 宿主是壳常驻在 body 末尾的 `#boardGlowMenu`，一棵根常驻，壳启动时接上。锚定、开合、玻璃材质与
 * 和媒体库菜单互斥都在壳的 `wireAnchoredMenu` 里，卡不换成 BoardUI Popover：那一套动效与材质要在
 * Popover 外面再复刻一遍才对得上像素，复刻出来的就是第二份。
 *
 * 光晕关掉之后卡上只剩强调色可挑：上面那一组球和它的「重置」换的是一层现在不画的东西，点下去
 * 屏幕上没有任何反应，整组收起来，卡就只说当前还管用的那一件事。 */
import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import { ACCENT_CHOICES, chooseAccent, resetGlowColors } from '@peach/appearance';

import { GlowPresetGrid } from '../components/glow-preset-grid';
import type { GlowPickerHost } from './glow-picker-api';
import './glow-picker.css';

/** 接上壳给的宿主，当场画好卡的内容。只调一次。 */
export function configureGlowPicker(host: GlowPickerHost): void {
  const root = createRoot(host.root);
  flushSync(() => root.render(<GlowPicker host={host} />));
}

function GlowPicker({ host }: { host: GlowPickerHost }) {
  const { store } = host;
  useSyncExternalStore(store.subscribe, store.version);
  const { homeGlow: glow, accent } = store.value;
  return (
    <>
      <header data-glow-head="" data-glow-presets="" hidden={!glow.on}>
        <span>光晕</span>
        {/* 这里重置的是配色，不是整份光晕：强度和颗粒一起清掉会让人以为按错了键。整份恢复默认在详细设置那一屏。 */}
        <button type="button" data-glow-preset-reset="" onClick={() => resetGlowColors(store)}>重置</button>
      </header>
      <GlowPresetGrid store={store} label="光晕" hidden={!glow.on} />
      <p data-glow-head="" data-glow-sub=""><span>强调色</span></p>
      <div data-accent-grid="" role="group" aria-label="强调色">
        {/* 强调色那一排同样不带颜色：球拿的就是这一档真会写上去的 400 与 600 两级。 */}
        {ACCENT_CHOICES.map(([key, label]) => (
          <button type="button" key={key} data-glow-chip="" data-accent={key} aria-pressed={key === accent}
            title={label} aria-label={label} onClick={() => chooseAccent(key, store)}>
            <span data-glow-ball="" aria-hidden="true" data-accent-ball={key} />
          </button>
        ))}
      </div>
      <footer><button type="button" className="geist-button primary" data-glow-detail="" onClick={() => host.openDetails()}>详细设置</button></footer>
    </>
  );
}
