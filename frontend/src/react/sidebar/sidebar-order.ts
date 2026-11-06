/* The sidebar order's single write is shared by the sidebar column's drag and the settings panel's "Sidebar" page.
 *
 * Order follows the database, not the browser: arranged on Windows, it should be the same on a Mac. After changing, it lands
 * in the local copy first (`store.save()` notifies subscribers and the sidebar reorders on the spot), then writes
 * `/api/settings`. A failed server write neither rolls back nor interrupts: a read-only client answers 409, the local order
 * already took effect, and this change simply does not sync across machines, which is the read-only client's standing
 * constraint, not a failed operation. */
import { useCallback } from 'react';

import type { SettingsStore } from '../../settings-store';
import { useSaveSettings } from '../settings-panel/settings-data';

export function useCommitSidebarOrder(store: SettingsStore<{ sidebarOrder: string[] }>) {
  const save = useSaveSettings();
  const { mutate } = save;
  return useCallback((next: string[]) => {
    store.value.sidebarOrder = next;
    store.save();
    mutate({ sidebarOrder: next }, { onError: () => {} });
  }, [store, mutate]);
}

/** Moves `key` before or after `target`; null when it cannot be moved (same item, or either item missing from the order). */
export function moveSidebarKey(order: readonly string[], key: string, target: string, after: boolean): string[] | null {
  if (key === target) return null;
  const next = [...order];
  const from = next.indexOf(key);
  if (from < 0) return null;
  next.splice(from, 1);
  const at = next.indexOf(target);
  if (at < 0) return null;
  next.splice(at + (after ? 1 : 0), 0, key);
  return next;
}
