/* Login page: one Auth Card, a single password box, "Keep me signed in" and "Sign in".
 *
 * Which variant is drawn is decided server-side and handed in via `data-mode`; the page does not guess: with no such
 * key it is a deployment with an access policy and the box takes the access password; `legacy` is a non-Docker
 * deployment without an access policy yet, the box takes the auto-generated access token, and the line below says how
 * to view it with `peach token`; `setup` is Docker without an access policy from the local machine or LAN, swap to the
 * access setup; `denied` is the same but the source does not satisfy it, first say where to open it, then give the
 * access token to sign in with (ADR-0149).
 *
 * The form submits natively: `POST /login` receives `token` and `next`, carries `days=30` when "Stay signed in" is checked,
 * and the session cookie is set by its 303; the page sends no requests through script. On wrong password (401), too many
 * attempts (429) or an invalid stay-signed-in duration (400), the server returns the same shell with the reason handed in via
 * `data-invalid` or `data-error` under the password box: the box is marked `aria-invalid`, the reason is announced by
 * `role="alert"`, and focus lands in the box. Editing the box's contents clears the reason: BoardUI's Input uses native
 * validation, and a form marked with an error cannot submit. */
import { useState } from 'react';

import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';

import { Note } from '../../components/note';
import { AuthCard } from '../auth-card';
import type { PageData } from '../page-data';
import { FIRST_ACCESS_DENIED } from '../first-access';
import { AccessSetup } from './access-setup';

/** The line under the field when the passphrase is wrong. Rate-limit and bad-parameter reasons come from the server. */
export const WRONG_PASSWORD = 'Access password is incorrect';
export const WRONG_TOKEN = 'Access token is incorrect';

const tokenHint = (docker: boolean) => (
  <>Run <code className="wrap-anywhere">{docker ? 'docker compose exec peach peach token' : 'peach token'}</code> {docker ? 'on the host machine' : 'in the environment running Peach'} to view it.</>
);

export function LoginPage({ data }: { data: PageData }) {
  if (data.mode === 'setup') return <AccessSetup data={data} />;
  return <LoginForm data={data} />;
}

function LoginForm({ data }: { data: PageData }) {
  const token = data.mode === 'legacy' || data.mode === 'denied';
  const [reason, setReason] = useState(data.error || (data.invalid === 'true' ? (token ? WRONG_TOKEN : WRONG_PASSWORD) : ''));
  return (
    <AuthCard title="Peach">
      {data.mode === 'denied' ? <Note tone="warning">{FIRST_ACCESS_DENIED}</Note> : null}
      <form method="post" action="/login" aria-labelledby="auth-card-title" className="flex flex-col gap-6">
        <Input id="login-token" label={token ? 'Access token' : 'Access password'} name="token" type="password" maxLength={256}
          autoComplete="current-password" autoFocus={data.mode !== 'denied'} isRequired
          isInvalid={reason ? true : undefined} onChange={() => setReason('')}
          hint={reason ? <span role="alert">{reason}</span> : token ? tokenHint(data.mode === 'denied') : undefined} />
        <input type="hidden" name="next" value={data.next || '/'} />
        <Checkbox name="days" value="30" defaultSelected>Keep me signed in</Checkbox>
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </AuthCard>
  );
}
