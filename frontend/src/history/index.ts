/* The site-wide single browser history (`@peach/history`).
 *
 * Application and the React route tree import this module directly, and one history instance ships with peach-app.js.
 * Startup address cleanup and redirects use shellNavigate, and the Router's navigator reads the same instance.
 *
 * The implementation is React Router's own `createBrowserHistory` (`v5Compat` mode: push / replace also notify listeners),
 * reading and writing the same `{usr, key, idx}` history entries as its `<Router>`, without pulling in a second history
 * library. It accepts a single listener and only attaches `popstate` when one exists: this module attaches itself as soon as
 * the history is built and then fans out to subscribers, so the page counts back and forward from the moment it loads, without
 * waiting for anyone to subscribe.
 *
 * Every history change (written by the shell, written by the React subtree, back/forward) takes an increasing sequence number
 * `seq`. Shell address writes go through `shellNavigate`, which claims them on the spot (`claimed`): page elements keep their
 * generation and overlay elements take over that open request. Back/forward, React-subtree writes, and shell writes via
 * `peachHistory` go unclaimed and each take a page-open epoch (`openEpoch`): every one of them reopens that page by address.
 * The generation is decided before subscribers are notified, so what the router root's synchronous commit reads is already the
 * new generation; pages key by it and one open mounts once. The criteria use sequence numbers and generations, not addresses:
 * a replayed `popstate` of the same entry keeps the same address, and that page still has to reopen. */
import { UNSAFE_createBrowserHistory, type Location, type NavigationType, type Navigator, type To } from 'react-router';

import { backgroundOf, type BackgroundLocation } from './overlay';
import { canonicalPath } from './canonical-path';
import { settingsBackgroundOf, isPreferencePath } from './settings-route';
export * from './settings-route';
export { canonicalPath } from './canonical-path';

/** One history change: the action, the URL after the change, the counter it drew, the page open counter as of this change, and whether this one was a shell-claimed write. */
export interface Navigation {
  action: NavigationType;
  location: Location;
  seq: number;
  openEpoch: number;
  claimed: boolean;
}

export type NavigationListener = (navigation: Navigation) => void;

/** The copy handed to `<Router navigator>`, plus the current change and its subscription. */
export interface PeachHistory extends Navigator {
  readonly navigation: Navigation;
  listen(listener: NavigationListener): () => void;
}

const browser = UNSAFE_createBrowserHistory({ v5Compat: true });
let seq = 0;
let openEpoch = 0;
let current: Navigation = { action: browser.action, location: browser.location, seq, openEpoch, claimed: true };
const listeners = new Set<NavigationListener>();
/* `claiming` is true only during the moment `shellNavigate` writes the address. */
let claiming = false;
/* Still on the entry from page load: since then only rewritten via replace (cleaning the startup address, in-page parameter writes), no push and no back/forward. */
let onBootEntry = true;

browser.listen(({ action, location }) => {
  const path = location.pathname + location.search + location.hash;
  const canonical = canonicalPath(path);
  if (canonical !== path) {
    window.history.replaceState(window.history.state, '', canonical);
    location = browser.location;
  }
  seq += 1;
  if (!claiming) openEpoch += 1;
  if (action !== 'REPLACE') onBootEntry = false;
  current = { action, location, seq, openEpoch, claimed: claiming };
  for (const listener of [...listeners]) listener(current);
});

function canonicalTo(to: To): To {
  if (typeof to === 'string') return canonicalPath(new URL(to, window.location.href).href);
  const source = new URL(`${to.pathname ?? window.location.pathname}${to.search || ''}${to.hash || ''}`, window.location.href);
  const canonical = canonicalPath(source.href);
  if (canonical === source.pathname + source.search + source.hash) return to;
  const target = new URL(canonical, window.location.origin);
  return { ...to, pathname: target.pathname, search: target.search, hash: target.hash };
}

export const peachHistory: PeachHistory = {
  get navigation() { return current },
  listen(listener) {
    listeners.add(listener);
    return () => { listeners.delete(listener) };
  },
  createHref: (to) => browser.createHref(to),
  createURL: (to) => browser.createURL(to),
  encodeLocation: (to) => browser.encodeLocation(to),
  go: (delta) => browser.go(delta),
  push: (to, state) => browser.push(canonicalTo(to), state),
  replace: (to, state) => browser.replace(canonicalTo(to), state),
};

export interface ShellNavigateOptions {
  replace?: boolean;
  /** The `usr` state of the new entry. When cleaning the address, pass `peachHistory.navigation.location.state` to preserve the current one intact. */
  state?: unknown;
}

/** The shell writes the address: push or replace one entry, claimed on the spot.
 *
 * Paths are first resolved against the current address into absolutes: what the shell passes in includes relative paths, query-string-only ones, and full hrefs;
 * `history.pushState` already resolves them that way, while React Router's `To` only accepts paths, and `#x`-style ones would drop the query string. */
export function shellNavigate(path: string | URL, { replace = false, state }: ShellNavigateOptions = {}): void {
  const url = new URL(path, window.location.href);
  const to: To = canonicalPath(`${url.pathname}${url.search}${url.hash}`);
  claiming = true;
  try {
    if (replace) browser.replace(to, state);
    else browser.push(to, state);
  } finally {
    claiming = false;
  }
}

/** Whether the current entry is the one from page load (refresh, new tab, deep link). */
export const bootEntry = (): boolean => onBootEntry;

/** The page group matches its background: the page the current entry recorded in `usr`. The startup entry is not read (ADR-0031 "details entries record the page pressed beneath"):
 *  `usr` survives refresh, but the page beneath was never painted, so refresh, new tabs, and deep links landing on details count as having no background. */
export function navigationBackground(): BackgroundLocation | null {
  if (isPreferencePath(current.location.pathname)) {
    const settings = onBootEntry ? null : settingsBackgroundOf(current.location.state);
    return settings ? backgroundOf(settings.state) || settings : null;
  }
  return onBootEntry ? null : backgroundOf(current.location.state);
}

export {
  adoptOverlayState, backgroundOf, clearOverlayBackground, holdOverlayBackground, isOverlayPath, OVERLAY_PATHS,
  overlayState, overlayTarget, takeOverlayReturn,
  type BackgroundLocation, type OverlayKind, type OverlayPath, type OverlayState, type OverlayTarget,
} from './overlay';
export { ROUTE_META, routeMetaOf, type RouteMeta } from './route-meta';
export {
  connectManagedRoutes, failManagedRoute, listenManagedEntry, managedEntries, managedEntry, managedTaken, openManagedRoute,
  openResidentSurface, preloadManagedRoutes, releaseAllManagedRoutes, releaseManagedRoute, updateManagedRoute,
  type ManagedEntry, type ManagedOpenOptions, type ManagedPrefetch,
} from './managed';
