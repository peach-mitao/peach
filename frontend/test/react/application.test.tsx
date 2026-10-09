import { act, StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import type { ShellActions } from '../../src/react/router/shell-actions';

const boot = vi.hoisted(() => ({ initialize: vi.fn(), truncate: vi.fn(() => () => {}) }));
vi.mock('../../src/application/initialize.js', () => ({ initializeApplication: boot.initialize }));
vi.mock('../../src/ui-kit/middle-truncate', () => ({ initMiddleTruncate: boot.truncate }));
const roots = new Set<Root>();

beforeEach(() => {
  vi.resetModules(); boot.initialize.mockReset(); boot.truncate.mockClear();
  window.history.replaceState(null, '', '/nowhere');
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});
afterEach(async () => {
  for (const root of roots) await act(async () => { root.unmount(); });
  roots.clear(); document.body.innerHTML = ''; vi.useRealTimers(); vi.restoreAllMocks();
});

async function load() {
  const [app, residents, effects, shell] = await Promise.all([
    import('../../src/react/application'), import('../../src/react/application-residents'),
    import('../../src/application/effects'), import('../../src/shell'),
  ]);
  return { ...app, residents, effects, shell };
}
function host() { const node = document.createElement('div'); document.body.append(node); return node; }

function actions(): ShellActions {
  return {
    openItem: vi.fn(), openEntity: vi.fn(), openTag: vi.fn(), openTasteSignal: vi.fn(), navigate: vi.fn(),
    openManage: vi.fn(), managePath: vi.fn(() => ''), openFollow: vi.fn(), receipt: vi.fn(), toast: vi.fn(),
    failure: vi.fn(), revealSource: vi.fn(async () => ''), reopenTutorial: vi.fn(async () => {}),
    requestConfigurationSection: vi.fn(), routeReview: vi.fn(), routeFollowManage: vi.fn(),
    saveFollowPreference: vi.fn(), srcBadge: () => '', routeIndex: vi.fn(), savePeopleLayout: vi.fn(),
    exitSelectMode: vi.fn(), personAvatar: vi.fn(() => ({ html: '', face: '' })), authorAvatar: vi.fn(() => ''),
    showIndexTags: vi.fn(), openFollowAuthor: vi.fn(), openFollowTag: vi.fn(), openPlaylist: vi.fn(),
    canFlip: vi.fn(() => true), surfaceChanged: vi.fn(), clearSearch: vi.fn(), openImmerse: vi.fn(),
    openOverlay: vi.fn(), closeStage: vi.fn(), grid: {} as ShellActions['grid'],
  };
}

it('同宿主重复挂载沿用实际 Application，一次后退只打开一次覆盖', async () => {
  const r = await load(), node = host(), capabilities = actions();
  boot.initialize.mockImplementation(() => { void r.residents.loadRouter(capabilities); });
  let first!: Root, second!: Root;
  await act(async () => { first = r.mountApplication(node); second = r.mountApplication(node); });
  roots.add(first); expect(second).toBe(first); expect(boot.initialize).toHaveBeenCalledTimes(1);
  r.shell.writeShell({ pageOpens: 1 });
  await act(async () => {
    window.history.replaceState({ usr: { backgroundLocation: { pathname: '/nowhere', search: '' }, overlay: 'item' }, key: 'x', idx: 1 }, '', '/item/7');
    window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
  });
  await act(async () => { await new Promise(resolve => { setTimeout(resolve, 0); }); });
  expect(vi.mocked(capabilities.openOverlay).mock.calls).toEqual([[{ kind: 'item', id: 7 }]]);
});

it('实际卸载后立即重挂同宿主重新初始化，旧资源信号已取消', async () => {
  const r = await load(), node = host();
  let first!: Root, second!: Root, oldSignal!: AbortSignal;
  await act(async () => {
    first = r.mountApplication(node); oldSignal = r.effects.applicationEffects.signal;
    first.unmount(); second = r.mountApplication(node);
  });
  roots.add(second); expect(second).not.toBe(first);
  expect(boot.initialize).toHaveBeenCalledTimes(2); expect(oldSignal.aborted).toBe(true);
});

it('StrictMode 诊断重取仅初始化一次，最终卸载移除监听和调度', async () => {
  vi.useFakeTimers();
  const r = await load(), node = host(), heard = vi.fn(), timer = vi.fn();
  let signal!: AbortSignal;
  boot.initialize.mockImplementation(() => {
    const effects = r.effects.applicationEffects; signal = effects.signal;
    effects.listen(document, 'application-probe', heard); effects.delay(timer, 100);
  });
  const root = createRoot(node); roots.add(root);
  await act(async () => { root.render(<StrictMode><r.Application /></StrictMode>); });
  expect(boot.initialize).toHaveBeenCalledTimes(1);
  document.dispatchEvent(new Event('application-probe')); expect(heard).toHaveBeenCalledTimes(1);
  await act(async () => { root.unmount(); }); roots.delete(root);
  document.dispatchEvent(new Event('application-probe')); vi.runAllTimers();
  expect(heard).toHaveBeenCalledTimes(1); expect(timer).not.toHaveBeenCalled(); expect(signal.aborted).toBe(true);
});
