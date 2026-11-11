/* 沉浸用的字幕菜单：`subtitlePanels` 面板宿主，以及 `SubtitleControls` 接宿主自带按钮
 * （字幕键在沉浸的动作列里，不在播放器外壳里）。舞台那条路径（控制条里的 CC + 设置菜单）
 * 在 e2e 里走真浏览器。 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { SubtitleControls, subtitlePanels } from '../src/player/subtitles';
import type { VjsPlayer } from '../src/player/types';

function fakePlayer(shell: HTMLElement) {
  const dispose: (() => void)[] = [];
  const player = {
    el: () => shell,
    isDisposed: () => false,
    on: (event: string, handler: () => void) => { if (event === 'dispose') dispose.push(handler) },
    peachItem: { id: 7, duration: 60 },
    peachPlaybackKey: 'item:7',
  } as unknown as VjsPlayer;
  return { player, dispose };
}

const memory = () => vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ selected: null, tracks: [] }),
  { status: 200, headers: { 'Content-Type': 'application/json' } })));

describe('字幕菜单面板宿主', () => {
  afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = '' });

  it('渲染面板、开关容器，点外面收起', () => {
    const menu = document.createElement('div');
    menu.hidden = true;
    document.body.append(menu);
    const panels = subtitlePanels(menu);
    const panel = panels.render('<button type="button">关闭</button>', 1);
    expect(panel.className).toBe('vjs-peach-panel');
    expect(menu.contains(panel)).toBe(true);
    panels.open();
    expect(menu.hidden).toBe(false);
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(menu.hidden).toBe(true);
    panels.open();
    panels.back();
    expect(menu.hidden).toBe(true);
  });
});

describe('字幕控制接宿主按钮', () => {
  afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = '' });

  it('宿主自带的按钮接管开关与菜单，不再找控制条里的 CC', async () => {
    memory();
    const shell = document.createElement('div');
    const menu = document.createElement('div');
    menu.hidden = true;
    const cc = document.createElement('button');
    document.body.append(shell, menu, cc);
    /* v10 壳的结构：样式层挂在 media-container 里。 */
    const container = document.createElement('media-container');
    const video = document.createElement('video');
    container.append(video);
    shell.append(container);
    const { player } = fakePlayer(shell);
    const controls = new SubtitleControls(player, video, subtitlePanels(menu), cc);
    await vi.waitFor(() => expect(cc.getAttribute('aria-label')).toBe('开启字幕'));
    expect(menu.hidden).toBe(true);
    controls.show();
    expect(menu.hidden).toBe(false);
    expect(menu.textContent).toContain('关闭');
    expect(menu.textContent).toContain('加载字幕文件');
  });
});
