/* 页头岛：骨架与岛的换手、管理条的按下态与点击、面包屑左键走路由而带修饰键照链接走、回收站说明行
 * 先占位后落读数，以及同一页重画时读数那一格原地换字。
 *
 * 指示线的滑动、标题居中与窄屏收档要量布局，由 e2e 在浏览器里走（`e2e/management-layout.test.ts`）。 */
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { manageHeaderSkeletonHtml, type ManageEntry, type ManageHeaderProps } from '../../src/manage-header';
import type { ManageHeaderApi, ManageHeaderHost } from '../../src/react/manage-header/manage-header-api';
import { configureManageHeader } from '../../src/react/manage-header/manage-header-island';
import { click } from './render';

const SECTIONS: ManageEntry[] = [['stats', '统计', 'chart'], ['cleanup', '数据管理', 'database'], ['trash', '回收站', 'trash']];
const MENU = SECTIONS.filter(([key]) => key !== 'trash');

const props = (section: string, path: string, patch: Partial<ManageHeaderProps> = {}): ManageHeaderProps =>
  ({ section, path, sections: SECTIONS, menu: MENU, trash: null, ...patch });

function setup(first: ManageHeaderProps) {
  const root = document.createElement('div');
  root.setAttribute('data-manage-header', '');
  document.body.append(root);
  root.innerHTML = manageHeaderSkeletonHtml(first);
  const host: ManageHeaderHost = { root, openManage: vi.fn(), openDataCleanup: vi.fn(), emptyTrash: vi.fn() };
  let api!: ManageHeaderApi;
  act(() => { api = configureManageHeader(host) });
  const render = (next: ManageHeaderProps) => act(() => api.render(next));
  render(first);
  return { root, host, render };
}

beforeEach(() => { document.body.replaceChildren() });

describe('换手', () => {
  it('岛接上时换掉骨架，画出来的是同一份结构', () => {
    const skeleton = document.createElement('div');
    skeleton.innerHTML = manageHeaderSkeletonHtml(props('cleanup', '/junk-files'));
    const { root } = setup(props('cleanup', '/junk-files'));
    const shape = (node: ParentNode) => [...node.querySelectorAll('*')]
      .map((el) => [el.tagName, ...[...el.attributes].map((a) => a.name).filter((name) => name.startsWith('data-') || name.startsWith('aria-')).sort()].join(' '))
      .filter((line) => !line.startsWith('USE'));
    expect(shape(root)).toEqual(shape(skeleton));
    expect(root.querySelector('[data-manage-title]')!.textContent).toBe('垃圾文件');
  });

  it('离开管理区时整块清空，回来再画', () => {
    const { root, render } = setup(props('stats', '/stats'));
    render(props('', '/'));
    expect(root.childElementCount).toBe(0);
    render(props('cleanup', '/data-cleanup'));
    expect(root.querySelector('[data-manage-title]')!.textContent).toBe('数据管理');
    expect(root.querySelector('[data-manage-title]')!.hasAttribute('data-compact')).toBe(true);
    expect(root.querySelector('[data-manage-crumb]')).toBeNull();
  });
});

describe('管理条与面包屑', () => {
  it('按下项跟着当前区走，点一项回到壳的 openManage', async () => {
    const { root, host, render } = setup(props('stats', '/stats'));
    const pressed = () => [...root.querySelectorAll('[data-manage][aria-pressed="true"]')].map((node) => node.getAttribute('data-manage'));
    expect(pressed()).toEqual(['stats']);
    expect(root.querySelector('[data-manage="stats"]')!.getAttribute('aria-current')).toBe('page');
    render(props('cleanup', '/data-cleanup'));
    expect(pressed()).toEqual(['cleanup']);
    expect(root.querySelector('[data-manage="stats"]')!.hasAttribute('aria-current')).toBe(false);
    await click(root.querySelector('[data-manage="stats"]'));
    expect(host.openManage).toHaveBeenCalledWith('stats');
  });

  it('面包屑普通左键走路由，带修饰键或中键的点击照链接自己走', () => {
    const { root, host } = setup(props('cleanup', '/duplicates'));
    const link = root.querySelector<HTMLAnchorElement>('[data-manage-crumb] a')!;
    expect(link.getAttribute('href')).toBe('/data-cleanup');
    expect(root.querySelector('[data-manage-crumb] [aria-current="true"]')!.textContent).toBe('重复文件');
    const fire = (init: MouseEventInit) => {
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...init });
      act(() => { link.dispatchEvent(event) });
      return event.defaultPrevented;
    };
    expect(fire({})).toBe(true);
    expect(host.openDataCleanup).toHaveBeenCalledTimes(1);
    expect([fire({ ctrlKey: true }), fire({ metaKey: true }), fire({ shiftKey: true }), fire({ button: 1 })])
      .toEqual([false, false, false, false]);
    expect(host.openDataCleanup).toHaveBeenCalledTimes(1);
  });
});

describe('回收站说明行', () => {
  it('读数到之前铺同形占位，读到以后落读数与清空键；说明行一直是同一个节点', async () => {
    const { root, host, render } = setup(props('trash', '/trash'));
    const lede = root.querySelector('[data-manage-lede]')!;
    expect(lede.querySelectorAll('[data-trash-lede-skeleton]')).toHaveLength(2);
    expect(lede.querySelector('[data-lede-text]')).toBeNull();
    render(props('trash', '/trash', { trash: { total: 1234, shown: 8 } }));
    expect(root.querySelector('[data-manage-lede]')).toBe(lede);
    expect(lede.querySelector('[data-trash-lede-skeleton]')).toBeNull();
    expect(lede.querySelector('[data-lede-text]')!.textContent).toBe('1,234 个符合 · 显示 8');
    await click(lede.querySelector('[data-empty-trash]'));
    expect(host.emptyTrash).toHaveBeenCalledTimes(1);
    render(props('trash', '/trash', { trash: { total: 0, shown: 0 } }));
    expect(lede.querySelector('[data-empty-trash]')).toBeNull();
  });

  it('同一页重画：读数那一格沿用原节点，旧字淡出后换成新字，不回到占位', () => {
    vi.useFakeTimers();
    const { root, render } = setup(props('trash', '/trash', { trash: { total: 20, shown: 8 } }));
    const cell = root.querySelector<HTMLElement>('[data-lede-text]')!;
    render(props('trash', '/trash', { trash: { total: 20, shown: 16 } }));
    expect(root.querySelector('[data-lede-text]')).toBe(cell);
    expect(root.querySelector('[data-trash-lede-skeleton]')).toBeNull();
    expect(cell.classList.contains('leaving')).toBe(true);
    expect(cell.textContent).toBe('20 个符合 · 显示 8');
    act(() => { vi.advanceTimersByTime(400) });
    expect(cell.textContent).toBe('20 个符合 · 显示 16');
    expect(cell.classList.contains('leaving')).toBe(false);
  });
});
