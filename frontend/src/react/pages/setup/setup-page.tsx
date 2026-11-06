/* The first-run page: fetch the questions, draw the form, and switch to the done state on the same page after success.
 *
 * The questions endpoint is open only to the computer running Peach (for Docker, the host machine and the LAN); when another
 * device opens it, it answers 403 and the page draws no form, only saying where to open it. Docker's 403 body carries `docker`, so that line is swapped for the container's wording. */
import { useEffect, useState } from 'react';

import { Button } from '@/components/base/buttons/button';

import { Note } from '../../components/note';
import { FIRST_ACCESS_DENIED } from '../first-access';
import { describeFailure, fetchQuestions, SetupRequestError, type SetupDone, type SetupQuestions } from './setup-api';
import { SetupDoneView } from './setup-done';
import { SetupForm } from './setup-form';
import { SetupRestore } from './setup-restore';
import { SetupShell } from './setup-scene';

type View =
  | { kind: 'loading' }
  | { kind: 'denied'; docker: boolean }
  | { kind: 'failed'; message: string }
  | { kind: 'form'; setup: SetupQuestions }
  | { kind: 'done'; done: SetupDone };

export function SetupPage() {
  const [view, setView] = useState<View>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetchQuestions(controller.signal).then(
      (setup) => setView({ kind: 'form', setup }),
      (cause: unknown) => {
        if (controller.signal.aborted) return;
        setView(cause instanceof SetupRequestError && cause.status === 403
          ? { kind: 'denied', docker: cause.docker }
          : { kind: 'failed', message: describeFailure(cause) });
      });
    return () => controller.abort();
  }, [attempt]);

  if (view.kind === 'done') return <SetupDoneView done={view.done} />;
  const retry = () => {
    setView({ kind: 'loading' });
    setAttempt((count) => count + 1);
  };
  // Docker's data directory is the `/data` volume; attaching existing data is a volume swap, not done on this page.
  if (view.kind === 'form' && !restoring) return <SetupForm setup={view.setup}
    onRestore={view.setup.docker ? undefined : () => setRestoring(true)} onDone={(done) => setView({ kind: 'done', done })} />;
  if (view.kind === 'form') return <SetupRestore onBack={() => setRestoring(false)}
    onDone={(done) => setView({ kind: 'done', done })} />;
  return (
    <SetupShell step={0}>
    <section data-setup-form-panel="" aria-labelledby="auth-card-title" aria-busy={view.kind === 'loading' || undefined}>
      <div data-setup-top=""><span className="text-body-2-regular text-text-secondary">First-time setup</span></div>
      <div data-setup-step-scroll=""><div data-setup-step-content="">
      <header data-setup-step-heading="">
        <h1 id="auth-card-title" className="text-title-1-semibold text-text-primary">Welcome to Peach</h1>
        <p className="text-body-regular text-text-secondary">Take a moment to make Peach fit you better.</p>
      </header>
      {view.kind === 'loading' ? <div data-setup-loading="" data-skeleton="" role="status" aria-label="Reading settings"><span /><span /><span /></div> : null}
      {view.kind === 'denied'
        ? <Note tone="error">{view.docker ? FIRST_ACCESS_DENIED : 'Please open Settings on the computer running Peach.'}</Note> : null}
      {view.kind === 'failed'
        ? <Note tone="error" action={<Button variant="secondary" onClick={retry}>Retry now</Button>}>{view.message}</Note>
        : null}
      </div></div>
    </section>
    </SetupShell>
  );
}
