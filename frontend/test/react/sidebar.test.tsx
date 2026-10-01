/* 侧栏岛：骨架与岛的换手、导航顺序跟 store 走、拖动排序写回、筛选键的按下态与计数、分组开合、
 * 「展开全部」、关注标签与时长两端。
 *
 * 玻璃的滑动、真实的拖动手势与抽屉开合要量布局，由 e2e 在浏览器里走（`e2e/sidebar.test.ts`）。 */
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createSettingsStore } from '../../src/settings-store';
import { sidebarSkeletonHtml } from '../../src/sidebar-skeleton';
import type { SidebarApi, SidebarChip, SidebarFacets, SidebarHost, SidebarProps } from '../../src/react/sidebar/sidebar-api';
import { configureSidebar } from '../../src/react/sidebar/sidebar-island';
import { moveSidebarKey } from '../../src/react/sidebar/sidebar-order';
import { click, fetchMock, sentBody, settle } from './render';

const CATALOG = [['', '首页', 'home'], ['unseen', '未看', 'eye'], ['follow', '关注', 'rss'], ['stats', '统计', 'chart']] as const;

const chip = (value: string, n: number | null = 1, extra: Partial<SidebarChip> = {}): SidebarChip =>
  ({ value, label: value.toUpperCase(), n, ...extra });

const facets = (patch: Partial<SidebarFacets> = {}): SidebarFacets => ({
  locations: [chip('local', 3), chip('115', 2, { offline: '这块盘没挂上' })],
  regions: [], orientations: [], creators: [], tags: [chip('a', 5), chip('b', 4)], tech: [], followTags: [],
  duration: false, ...patch,
});

function setup(order = ['', 'unseen', 'follow'], current = '') {
  const drawer = document.createElement('aside');
  drawer.setAttribute('data-sidebar-drawer', '');
  const scroll = document.createElement('div');
  scroll.setAttribute('data-sidebar-scroll', '');
  drawer.append(scroll);
  document.body.append(drawer);
  const store = createSettingsStore('peach.settings.v1', { sidebarOrder: order });
  let pressed = current;
  const host: SidebarHost = {
    scroll, store, navCatalog: CATALOG,
    navOn: (key) => key === pressed,
    navTo: vi.fn(), toggleChip: vi.fn(), setDuration: vi.fn(), openFollowTag: vi.fn(), selectFollowTag: vi.fn(),
    attached: vi.fn(),
  };
  scroll.innerHTML = sidebarSkeletonHtml(order, CATALOG, host.navOn);
  let api!: SidebarApi;
  act(() => { api = configureSidebar(host) });
  const render = (props: Partial<SidebarProps>) => act(() => api.render({ content: null, filters: {}, latest: null, ...props }));
  return { drawer, scroll, store, host, api, render, press: (key: string) => { pressed = key } };
}

const navKeys = (root: ParentNode) => [...root.querySelectorAll<HTMLElement>('[data-sidebar-nav] [data-nav]')].map((node) => node.dataset.nav);
const group = (root: ParentNode, title: string) => root.querySelector<HTMLDetailsElement>(`[data-sidebar-group="${title}"]`);
const chipOf = (root: ParentNode, key: string, value: string) =>
  root.querySelector<HTMLButtonElement>(`[data-sidebar-chip][data-key="${key}"][data-val="${value}"]`);

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  document.body.replaceChildren();
});

describe('导航', async () => {
  it('骨架与岛画的是同一列：顺序、按下态与首页记号一致，岛接上之后壳再挪标题行', async () => {
    const skeleton = document.createElement('div');
    skeleton.innerHTML = sidebarSkeletonHtml(['unseen', '', 'missing'], CATALOG, (key) => key === 'unseen');
    expect(navKeys(skeleton)).toEqual(['unseen', '']);
    expect(skeleton.querySelector('[data-nav="unseen"]')!.getAttribute('aria-pressed')).toBe('true');
    expect(skeleton.querySelector('[data-nav=""] [data-sidebar-home-logo]')).not.toBeNull();
    const { scroll, host } = setup(['unseen', '', 'missing'], 'unseen');
    expect(navKeys(scroll)).toEqual(navKeys(skeleton));
    expect(scroll.querySelector(':scope > [data-sidebar-head]')).not.toBeNull();
    expect(scroll.querySelector('[data-nav="unseen"]')!.getAttribute('aria-pressed')).toBe('true');
    expect(host.attached).toHaveBeenCalledTimes(1);
  });

  it('骨架转义名称', async () => {
    const node = document.createElement('div');
    node.innerHTML = sidebarSkeletonHtml(['x'], [['x', '<img src=x>', 'a"b']], () => false);
    expect(node.querySelector('img')).toBeNull();
    expect(node.querySelector('button')!.getAttribute('aria-label')).toBe('<img src=x>');
  });

  it('store 里的顺序一变（设置面板或另一台机器同步回来），这一列当场重排', async () => {
    const { scroll, store } = setup();
    act(() => { store.value.sidebarOrder = ['follow', '', 'stats']; store.save() });
    expect(navKeys(scroll)).toEqual(['follow', '', 'stats']);
  });

  it('点一项交给壳的 navTo；按下态由壳说重读时才换', async () => {
    const { scroll, host, api, press } = setup();
    await click(scroll.querySelector('[data-nav="unseen"]'));
    expect(host.navTo).toHaveBeenCalledWith('unseen');
    press('unseen');
    act(() => api.navChanged());
    expect(scroll.querySelector('[data-nav="unseen"]')!.getAttribute('aria-pressed')).toBe('true');
    expect(scroll.querySelector('[data-nav=""]')!.getAttribute('aria-pressed')).toBe('false');
  });

  it('拖到另一项下半截就排到它后面：先落本地 store，再写 /api/settings', async () => {
    const fetcher = fetchMock(200, { sidebarOrder: ['unseen', 'follow', ''] });
    vi.stubGlobal('fetch', fetcher);
    const { scroll, store } = setup();
    const fire = (node: Element, type: string, clientY = 0) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.defineProperties(event, {
        dataTransfer: { value: { setData: () => {}, effectAllowed: '', dropEffect: '' } },
        clientY: { value: clientY },
      });
      act(() => { node.dispatchEvent(event) });
    };
    const home = scroll.querySelector('[data-nav=""]')!, follow = scroll.querySelector('[data-nav="follow"]')!;
    fire(home, 'dragstart');
    expect(home.hasAttribute('data-dragging')).toBe(true);
    fire(follow, 'dragover', 10);
    expect(follow.getAttribute('data-drop')).toBe('after');
    fire(follow, 'drop', 10);
    await settle();
    expect(store.value.sidebarOrder).toEqual(['unseen', 'follow', '']);
    expect(JSON.parse(localStorage.getItem('peach.settings.v1')!).sidebarOrder).toEqual(['unseen', 'follow', '']);
    expect(navKeys(scroll)).toEqual(['unseen', 'follow', '']);
    expect(scroll.querySelector('[data-dragging],[data-drop]')).toBeNull();
    expect(fetcher.mock.calls[0]?.[0]).toBe('/api/settings');
    expect(sentBody(fetcher)).toEqual({ sidebarOrder: ['unseen', 'follow', ''] });
  });

  it('挪不了的情形不产生新顺序', async () => {
    expect(moveSidebarKey(['a', 'b', 'c'], 'a', 'c', false)).toEqual(['b', 'a', 'c']);
    expect(moveSidebarKey(['a', 'b'], 'a', 'a', true)).toBeNull();
    expect(moveSidebarKey(['a', 'b'], 'x', 'a', true)).toBeNull();
  });
});

describe('筛选分组', async () => {
  it('按下态照当前语境的筛选画，点下去交给壳；脱盘的来源点不了', async () => {
    const { scroll, host, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets() }, filters: { loc: 'local', tag: 'b' } });
    expect(chipOf(scroll, 'loc', 'local')!.getAttribute('aria-pressed')).toBe('true');
    expect(chipOf(scroll, 'tag', 'b')!.getAttribute('aria-pressed')).toBe('true');
    expect(chipOf(scroll, 'tag', 'a')!.getAttribute('aria-pressed')).toBe('false');
    await click(chipOf(scroll, 'loc', 'local'));
    expect(host.toggleChip).toHaveBeenCalledWith('loc', 'local', true);
    await click(chipOf(scroll, 'tag', 'a'));
    expect(host.toggleChip).toHaveBeenLastCalledWith('tag', 'a', false);
    const offline = chipOf(scroll, 'loc', '115')!;
    expect(offline.disabled).toBe(true);
    expect(offline.hasAttribute('data-offline')).toBe(true);
    expect(offline.title).toBe('这块盘没挂上');
  });

  it('就地刷新的计数只改数字：名单里有、新聚合里没有的记 0', async () => {
    const { scroll, render } = setup();
    const content = { kind: 'catalog' as const, key: '1', facets: facets() };
    render({ content });
    expect(chipOf(scroll, 'tag', 'a')!.querySelector('[data-sidebar-count]')!.textContent).toBe('5');
    render({ content, latest: facets({ tags: [chip('b', 9)] }) });
    expect(chipOf(scroll, 'tag', 'a')!.querySelector('[data-sidebar-count]')!.textContent).toBe('0');
    expect(chipOf(scroll, 'tag', 'b')!.querySelector('[data-sidebar-count]')!.textContent).toBe('9');
  });

  it('一进来只展开正在生效的组；人自己开合过的组按会话记住，换一份聚合也不改', async () => {
    const { scroll, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets() }, filters: { tag: 'a' } });
    expect(group(scroll, '内容标签')!.open).toBe(true);
    expect(group(scroll, '来源')!.open).toBe(false);
    const toggle = group(scroll, '来源')!.querySelector<HTMLElement>('[data-sidebar-toggle]')!;
    expect(document.getElementById(toggle.getAttribute('aria-controls')!)).not.toBeNull();
    await click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    render({ content: { kind: 'catalog', key: '2', facets: facets() }, filters: {} });
    expect(group(scroll, '来源')!.open).toBe(true);
    expect(group(scroll, '内容标签')!.open).toBe(false);
  });

  it('「展开全部」接在名单末尾，摊开照最新那一份聚合', async () => {
    const { scroll, render } = setup();
    const tags = Array.from({ length: 32 }, (_, index) => chip(`t${index}`, 40 - index));
    const content = { kind: 'catalog' as const, key: '1', facets: facets({ tags }) };
    render({ content, latest: facets({ tags: [...tags, chip('late', 1)] }) });
    await click(group(scroll, '内容标签')!.querySelector('[data-sidebar-toggle]'));
    const body = group(scroll, '内容标签')!.querySelector('[data-sidebar-body]')!;
    expect(body.querySelectorAll('[data-sidebar-chip]')).toHaveLength(30);
    const more = body.lastElementChild as HTMLButtonElement;
    expect(more.getAttribute('data-sidebar-more')).toBe('tag');
    expect(more.getAttribute('aria-label')).toBe('展开全部内容标签');
    await click(more);
    expect(body.querySelectorAll('[data-sidebar-chip]')).toHaveLength(33);
    expect(more.getAttribute('aria-expanded')).toBe('true');
    expect(more.getAttribute('aria-label')).toBe('收起内容标签');
    /* 收起收的是整组：组标题当场报收起、正文不再可聚焦；`details.open` 等高度过渡走完才摘。 */
    await click(more);
    expect(group(scroll, '内容标签')!.querySelector('[data-sidebar-toggle]')!.getAttribute('aria-expanded')).toBe('false');
    expect(group(scroll, '内容标签')!.querySelector<HTMLElement>('[data-sidebar-collapse]')!.inert).toBe(true);
    expect(body.querySelectorAll('[data-sidebar-chip]')).toHaveLength(30);
  });

  it('换一份聚合时只有数字变了的徽标弹一下', async () => {
    const { scroll, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets({ tags: [chip('pa', 5), chip('pb', 4)] }) } });
    /* `popped` 加上又当场摘掉，回调到来时类名早已不在；摘掉那一笔的旧值里还留着它。 */
    const popped: string[] = [];
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (/\bpopped\b/.test(record.oldValue ?? '')) popped.push((record.target as HTMLElement).dataset.countBadge!);
      }
    });
    observer.observe(scroll, { subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
    render({ content: { kind: 'catalog', key: '2', facets: facets({ tags: [chip('pa', 5), chip('pb', 7)] }) } });
    await settle();
    observer.disconnect();
    expect(popped).toEqual(['tag:pb']);
  });

  it('目录页的关注标签去关注页，关注页的内容标签换成只按这一枚筛', async () => {
    const { scroll, host, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets({ followTags: [chip('x', 2)] }) } });
    await click(scroll.querySelector('[data-follow-drawer-tag="x"]'));
    expect(host.openFollowTag).toHaveBeenCalledWith('x');
    render({ content: { kind: 'follow', tags: [chip('y', 3), chip('z', 1)], selected: ['z'] } });
    expect(group(scroll, '来源')).toBeNull();
    const z = scroll.querySelector('[data-follow-drawer-tag="z"]')!;
    expect(z.getAttribute('aria-pressed')).toBe('true');
    expect(z.querySelector('[data-sidebar-count]')!.textContent).toBe('1');
    await click(scroll.querySelector('[data-follow-drawer-tag="y"]'));
    expect(host.selectFollowTag).toHaveBeenCalledWith('y');
  });

  it('时长两端各有一枚读数，右端拉到头是「不限」；松手才提交', async () => {
    const { scroll, host, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets({ duration: true }) }, filters: { dur_min: '1200' } });
    const tip = (end: string) => scroll.querySelector(`[data-range-end="${end}"]`)!.textContent;
    expect(tip('min')).toBe('20 分钟');
    expect(tip('max')).toBe('不限');
    const max = scroll.querySelector<HTMLInputElement>('#durMax')!;
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(max, '60');
      max.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(tip('max')).toBe('60 分钟');
    expect(host.setDuration).not.toHaveBeenCalled();
    act(() => { max.dispatchEvent(new Event('change', { bubbles: true })) });
    expect(host.setDuration).toHaveBeenCalledWith(20, 60);
  });

  it('content 为 null 时只画导航', async () => {
    const { scroll, render } = setup();
    render({ content: { kind: 'catalog', key: '1', facets: facets() } });
    render({ content: null });
    expect(scroll.querySelector('[data-sidebar-group]')).toBeNull();
    expect(navKeys(scroll)).toEqual(['', 'unseen', 'follow']);
  });
});
