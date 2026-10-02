/* 全站那一份浏览器历史（`src/history/`）：壳经 `shellNavigate` 写地址，后退前进与 React 子树的写入
 * 都从同一个对象分发。 */
import { afterEach, beforeEach, expect, it } from 'vitest';

import * as islands from '../../src/islands';
import { peachHistory, shellNavigate, type Navigation } from '../../src/history';

let seen: Navigation[] = [];
let stop = () => {};
beforeEach(() => {
  shellNavigate('/', { replace: true });
  seen = [];
  stop = peachHistory.listen((navigation) => { seen.push(navigation) });
});
afterEach(() => stop());

/** 浏览器自己的后退前进：地址先变，再派发 `popstate`。 */
function pop(path: string) {
  window.history.replaceState(window.history.state, '', path);
  window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
}

it('壳从 peach-ui.js 取到的就是这一份', () => {
  expect(islands.peachHistory).toBe(peachHistory);
  expect(islands.shellNavigate).toBe(shellNavigate);
});

it('push 加一条历史，replace 不加', () => {
  const length = window.history.length;
  shellNavigate('/stats');
  expect([location.pathname, window.history.length]).toEqual(['/stats', length + 1]);
  shellNavigate('/taste', { replace: true });
  expect([location.pathname, window.history.length]).toEqual(['/taste', length + 1]);
  expect(seen.map((n) => n.action)).toEqual(['PUSH', 'REPLACE']);
});

it('路径照 pushState 的规则按当前地址解析：只带查询串或只带锚点时其余部分不丢', () => {
  shellNavigate('/performers?q=a');
  shellNavigate('?q=b');
  expect(location.pathname + location.search).toBe('/performers?q=b');
  shellNavigate('#top');
  expect(location.pathname + location.search + location.hash).toBe('/performers?q=b#top');
  shellNavigate(`${location.origin}/tags`);
  expect(location.pathname).toBe('/tags');
});

it('清理地址时把当前条目的状态原样带过去', () => {
  peachHistory.push('/follow', { from: 'router' });
  const state = peachHistory.navigation.location.state;
  shellNavigate('/follow?onboarding=1', { replace: true, state });
  expect(peachHistory.navigation.location.state).toEqual({ from: 'router' });
  shellNavigate('/data-cleanup#libraryProcessing', { replace: true, state: null });
  expect(peachHistory.navigation.location.state).toBeNull();
});

it('每一次变化领一个递增序号，后退前进也算', () => {
  shellNavigate('/stats');
  pop('/');
  peachHistory.push('/tags');
  expect(seen.map((n) => n.action)).toEqual(['PUSH', 'POP', 'PUSH']);
  const [first, second, third] = seen.map((n) => n.seq);
  expect([second! - first!, third! - second!]).toEqual([1, 1]);
  expect(peachHistory.navigation).toBe(seen.at(-1));
  expect(seen[1]!.location.pathname).toBe('/');
});
