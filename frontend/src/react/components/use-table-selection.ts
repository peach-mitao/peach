import { useCallback, useEffect, useId, useRef } from 'react';

const tables = new Map<string, () => void>();

/** On a given page, only the current table retains its selection, so there is only one bulk-action bar. */
export function useTableSelection(clear: () => void) {
  const id = useId();
  const latest = useRef(clear);
  latest.current = clear;
  useEffect(() => {
    tables.set(id, () => latest.current());
    return () => { tables.delete(id); };
  }, [id]);
  return useCallback(() => {
    for (const [other, reset] of tables) if (other !== id) reset();
  }, [id]);
}
