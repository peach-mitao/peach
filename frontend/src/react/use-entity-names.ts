import { useSyncExternalStore } from 'react';
import { nameRevision, subscribeNames } from '../core/entity-names';

/** When the name preference or profile projection updates, only redraw the display; don't change the identity in the query cache. */
export function useEntityNames(): number {
  return useSyncExternalStore(subscribeNames, nameRevision, nameRevision);
}
