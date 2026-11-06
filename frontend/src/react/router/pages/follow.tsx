/* The follows and playlists route elements (ADR-0031): mount when the page group matches these two `BROWSE_ROUTES` entries,
 * open that page by address, and render into `#stats`. The elements render nothing themselves: pages register into `#stats`
 * via `openManagedRoute` and are rendered by `ManagedSurface`.
 *
 * When they open, same as the index page (`usePageOpen`): once each on mount, on taking a page-open epoch (back/forward and
 * unclaimed jumps), and on the shell asking for a reopen at the current address (`pageOpens` +1 in `@peach/shell`); while
 * `pageOpens` is still 0 the shell has not started routing and the element only mounts; if details are stacked on it at that
 * moment (the page group matches on background) nothing happens, and when details close, the page opens only if it is not
 * already rendered.
 *
 * 关注页不按代次挂 key，回来时交壳按地址恢复筛选、取样种子与刷新代次（`refresh`）：
 * - 关注页还画在 `#stats` 里就铺开它，就地推属性，不因进入页面增加刷新代次。
 * - 没画着时，缓存已有内容就直接提交，不铺加载骨架；首次取数才铺骨架。已加载分页沿用同一标签页里的缓存，
 *   共用导航入口平滑恢复保存的位置，首次进入回到顶上。
 * 主动重新进入才由壳换种子和刷新代次。关掉关注详情回列表由壳认领写地址、只推筛选，元素不动。深链直接进关注详情时页面组没有背景，不挂这个
 * 元素，列表等关掉详情才打开。后退前进落到压在列表上的关注详情、列表却没画着（中间去过别的页）时，交壳让出
 * `#stats`（`ShellActions.follow.ground`），不画列表。
 *
 * The playlists page reopens fully on every open and fetches the newest copy. While on the page, when the shell asks for a
 * reread (the top bar's "Shuffle"), write a new refresh generation (`playlistsRevision`) that the element pushes to the
 * rendered page; the page refetches without remounting.
 *
 * Neither element tears its page down on unmount: switching to management or the index page lets those claim the surface and
 * tear it down; when the profile page stacks over, the shell only hides `#stats` and it is still needed on return. */
import { useContext, useEffect, useRef, useSyncExternalStore } from 'react';

import { managedEntry, openManagedRoute, peachHistory, updateManagedRoute } from '@peach/history';
import { playlistsRevision, subscribeShell } from '@peach/shell';
import { pageNavigationReady, rememberPageState, restoredPageState } from '../../../history/page-navigation';
import { followFeedQuery, type FollowFeedProps } from '../../follow-feed/follow-feed';
import { queryClient } from '../../query';
import { managementSkeletonHtml, paintManagementPlaceholder } from '../../../management-placeholder';

import { ShellActionsContext, useOpenEpoch } from '../router';
import type { ShellActions } from '../shell-actions';
import { usePageOpen } from './index-entity';

const statsHost = () => document.getElementById('stats');
const readPlaylistsRevision = () => playlistsRevision;

/* ── 关注 ── */

async function openFollow(actions: ShellActions, live: () => boolean) {
  const stats = statsHost();
  const shell = actions.follow;
  if (!stats || !shell) return;
  const restored = restoredPageState<Pick<FollowFeedProps, 'view' | 'seed' | 'revision'>>('follow');
  const shown = shell.refresh(restored);
  const props = shell.props();
  rememberPageState('follow', { view: props.view, seed: props.seed, revision: props.revision });
  if (shown) return;
  const cached = queryClient.getQueryData(followFeedQuery(props.view, props.revision).queryKey) !== undefined;
  if (!cached) {
    actions.surfaceChanged('follow', '/follow');
    paintManagementPlaceholder(stats, shell.skeleton());
    void pageNavigationReady(live, stats, { pending: true });
  }
  await openManagedRoute('/follow', props, { container: stats, isCurrent: live,
    beforePlace: cached ? () => actions.surfaceChanged('follow', '/follow') : undefined });
  if (live()) void pageNavigationReady(live, stats.querySelector('[data-filter-frame]'));
}

/* What is drawn and shown inside `#stats` is the follows page. */
function followShown(): boolean {
  const stats = statsHost();
  const entry = stats ? managedEntry(stats) : null;
  return !!stats && !stats.hidden && !!entry && entry.path === '/follow' && entry.host.isConnected;
}

/** The follows page elements. */
export function FollowMatch() {
  const actions = useContext(ShellActionsContext);
  usePageOpen(useOpenEpoch(), (_fresh, live) => {
    if (actions) void openFollow(actions, live);
  }, {
    shown: followShown,
    onCovered: () => {
      if (peachHistory.navigation.location.pathname.startsWith('/posts/')) actions?.follow?.ground();
    },
  });
  return null;
}

/* ── Playlist ── */

/* What is drawn inside `#stats` is the playlist page. */
function playlistsShown(stats: HTMLElement | null): stats is HTMLElement {
  const entry = stats ? managedEntry(stats) : null;
  return !!entry && entry.path === '/playlists' && entry.host.isConnected;
}

async function openPlaylists(actions: ShellActions, live: () => boolean) {
  const stats = statsHost();
  if (!stats) return;
  actions.surfaceChanged('playlists', '/playlists');
  paintManagementPlaceholder(stats, managementSkeletonHtml('/playlists', { followLayout: '', followSort: '', followDir: '' }));
  void pageNavigationReady(live, stats, { pending: true });
  await openManagedRoute('/playlists', { revision: playlistsRevision }, { container: stats, isCurrent: live });
  if (live()) void pageNavigationReady(live);
}

/** The playlist page elements. */
export function PlaylistsMatch() {
  const actions = useContext(ShellActionsContext);
  const revision = useSyncExternalStore(subscribeShell, readPlaylistsRevision);
  const last = useRef(revision);
  useEffect(() => {
    if (last.current === revision) return;
    last.current = revision;
    const stats = statsHost();
    if (playlistsShown(stats)) updateManagedRoute(stats, { revision });
  }, [revision]);
  usePageOpen(useOpenEpoch(), (_fresh, live) => {
    if (actions) void openPlaylists(actions, live);
  }, { shown: () => { const stats = statsHost(); return playlistsShown(stats) && !stats.hidden } });
  return null;
}
