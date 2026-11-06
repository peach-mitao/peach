/* User-triggered requests: only one runs at a time per section; leaving the page cancels the wait, and the result is only handed to components still mounted.
 * The busy state lands on the button that triggered it, with several in the same section distinguished by key. */
import { useEffect, useRef, useState } from 'react';

import { errorMessage } from '../../api';

export function useAction(initialError = '') {
  const pending = useRef<AbortController | null>(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState(initialError);
  useEffect(() => () => pending.current?.abort(), []);

  async function run<T>(key: string, work: (signal: AbortSignal) => Promise<T>, done: (result: T) => void,
    failed?: (cause: unknown) => void) {
    if (pending.current) return;
    const controller = new AbortController();
    pending.current = controller;
    setBusy(key);
    setError('');
    try {
      const result = await work(controller.signal);
      if (!controller.signal.aborted) done(result);
    } catch (cause) {
      if (controller.signal.aborted) return;
      if (failed) failed(cause); else setError(errorMessage(cause));
    } finally {
      if (pending.current === controller) pending.current = null;
      if (!controller.signal.aborted) setBusy('');
    }
  }

  return { run, busy, error, setError };
}

export { busyProps } from './busy-props';
