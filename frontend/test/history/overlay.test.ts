/* 详情类历史条目的背景（`src/history/overlay.ts`）：壳决定打开详情时记下背景，push 详情地址时带进 `usr`；
 * 详情之间换条沿用上一条的背景，关掉详情与别的地址都不带。这里照壳的调用顺序走一遍：
 * `holdOverlayBackground()` → `shellNavigate(详情地址, {state: overlayState(种类)})`。 */
import { beforeEach, expect, it } from 'vitest';

import * as islands from '../../src/islands';
import {
  clearOverlayBackground, holdOverlayBackground, isOverlayPath, overlayState, peachHistory, retagOverlay,
  shellNavigate,
} from '../../src/history';

beforeEach(() => {
  shellNavigate('/', { replace: true, state: null });
  clearOverlayBackground();
});

const usr = () => peachHistory.navigation.location.state;
const length = () => window.history.length;

/** 壳打开一条详情：决定那一刻记背景，再 push 详情地址。 */
function open(path: string, overlay: 'item' | 'follow' = 'item') {
  holdOverlayBackground();
  shellNavigate(path, { state: overlayState(overlay) });
}

it('壳从 peach-ui.js 取到的就是这一份', () => {
  expect(islands.holdOverlayBackground).toBe(holdOverlayBackground);
  expect(islands.overlayState).toBe(overlayState);
  expect(islands.retagOverlay).toBe(retagOverlay);
});

it('覆盖层地址是作品详情、四种队列与关注详情，页面与沉浸不算', () => {
  for (const path of ['/item/7', '/mix/4/5', '/parts/1/2', '/editions/3/3', '/playlists/2/9', '/follow/item/3']) {
    expect([path, isOverlayPath(path)]).toEqual([path, true]);
  }
  for (const path of ['/', '/playlists', '/follow', '/performers/x', '/immerse', '/trash', '/stats']) {
    expect([path, isOverlayPath(path)]).toEqual([path, false]);
  }
});

it('从页面点进详情：push 带上打开那一刻的地址与查询串', () => {
  shellNavigate('/performers/x?sort=new');
  const before = length();
  open('/item/7');
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/performers/x', search: '?sort=new' }, overlay: 'item' });
  expect(length()).toBe(before + 1);
});

it('队列地址取完数才推：背景是决定那一刻的地址，不是推的那一刻', () => {
  shellNavigate('/?tag=a');
  holdOverlayBackground();
  shellNavigate('/stats', { replace: true });
  shellNavigate('/mix/4/5', { state: overlayState('item') });
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/', search: '?tag=a' }, overlay: 'item' });
});

it('同队列换条沿用上一条的背景，不把上一条详情当背景', () => {
  shellNavigate('/playlists');
  open('/playlists/2/9');
  open('/playlists/2/10');
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/playlists', search: '' }, overlay: 'item' });
});

it('关注详情组内换条沿用列表那一页（带筛选）', () => {
  shellNavigate('/follow?view=saved');
  open('/follow/item/3', 'follow');
  open('/follow/item/4', 'follow');
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/follow', search: '?view=saved' }, overlay: 'follow' });
});

it('关掉详情的 push 与别的地址都不带状态；清掉之后再进详情重新记', () => {
  shellNavigate('/trash');
  open('/item/7');
  clearOverlayBackground();
  shellNavigate('/trash');
  expect(usr()).toBeNull();
  shellNavigate('/immerse');
  expect(usr()).toBeNull();
  open('/item/8');
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/immerse', search: '' }, overlay: 'item' });
});

it('页面上从不接着旧背景：没清也按这一页重新记', () => {
  shellNavigate('/');
  open('/item/7');
  shellNavigate('/stats');
  open('/item/8');
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/stats', search: '' }, overlay: 'item' });
});

it('落在详情地址上又没有背景（深链、后退进来）：再开一条不带状态，不把详情地址当背景', () => {
  shellNavigate('/item/7');
  open('/item/8');
  expect(usr()).toBeNull();
});

it('作品详情转成关注详情：原地改记种类，背景、地址与条目数不变', () => {
  shellNavigate('/performers/x');
  open('/item/7');
  const before = length();
  retagOverlay('follow');
  expect([location.pathname, length()]).toEqual(['/item/7', before]);
  expect(usr()).toEqual({ backgroundLocation: { pathname: '/performers/x', search: '' }, overlay: 'follow' });
  clearOverlayBackground();
  shellNavigate('/item/9', { replace: true, state: null });
  retagOverlay('follow');
  expect(usr()).toBeNull();
});
