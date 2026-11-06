/* Docker access setup: for a deployment that is configured but has no access policy yet, the login page swaps to this card (ADR-0149). A fresh deployment goes to the first-run setup page.
 *
 * Same controls as the access part of desktop first-run setup: an "Access password" switch, two password boxes, and a line of explanation. When on, it sets an access password;
 * when off, it is an explicit choice of no login, and the button says which. Submission goes to `POST /api/configuration/access/first`;
 * on success the browser carries the session the server issued (not needed without login) to `next`. Field errors are written back under their own box; whole-page reasons such as a wrong
 * source or someone else already having set it go above the button. */
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/base/buttons/button';
import { Label } from '@/components/base/input/label';
import { Switch } from '@/components/base/switch/switch';

import { Note } from '../../components/note';
import { PasswordPair } from '../../settings/password-pair';
import { busyProps } from '../../settings/busy-props';
import { Help } from '../../settings/section';
import { AuthCard, CardGroup } from '../auth-card';
import type { PageData } from '../page-data';

export const FIRST_ACCESS_URL = '/api/configuration/access/first';

type Errors = Partial<Record<'password' | 'confirmation', string>>;

const go = (url: string) => window.location.assign(url);

export function AccessSetup({ data, navigate = go }: { data: PageData; navigate?: (url: string) => void }) {
  const [passwordOn, setPasswordOn] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setFailure('');
    setErrors({});
    const body = passwordOn
      ? { mode: 'password', password, confirmation, next: data.next || '/' }
      : { mode: 'open', next: data.next || '/' };
    try {
      const response = await fetch(FIRST_ACCESS_URL, {
        method: 'POST', credentials: 'same-origin', body: JSON.stringify(body),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });
      const answer = await response.json().catch(() => null) as { url?: string; error?: string; errors?: Errors } | null;
      if (response.ok) {
        navigate(answer?.url || '/');
        return;
      }
      if (answer?.errors && Object.keys(answer.errors).length) setErrors(answer.errors);
      else setFailure(answer?.error || 'Could not save the access setup; try again');
    } catch {
      setFailure('Cannot reach Peach; confirm it is still running, then retry');
    }
    setBusy(false);
  };

  return (
    <AuthCard title="Access setup" lede="This Peach has no access setup yet; first decide whether signing in is required on open.">
      <form aria-labelledby="auth-card-title" className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
        <CardGroup first>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-col gap-0.5">
              <Label id="access-setup-title" elementType="span">Access password</Label>
              <p id="access-setup-description" className="text-body-2-regular text-text-secondary">When on, accessing Peach requires signing in first.</p>
            </div>
            <Switch aria-labelledby="access-setup-title" aria-describedby="access-setup-description"
              isSelected={passwordOn} onChange={(on) => { setPasswordOn(on); setErrors({}); }} />
          </div>
          <Help>A password is recommended for LAN access. Without one, devices on the same network that can reach Peach get in directly.</Help>
          {passwordOn
            ? <PasswordPair label="Access password" password={password} confirmation={confirmation}
                onPassword={(value) => { setPassword(value); setErrors({}); }}
                onConfirmation={(value) => { setConfirmation(value); setErrors({}); }}
                passwordError={errors.password ? <span role="alert">{errors.password}</span> : undefined}
                passwordHint="Enter 8-256 characters."
                confirmationError={errors.confirmation ? <span role="alert">{errors.confirmation}</span> : undefined} />
            : null}
        </CardGroup>
        {failure ? <Note tone="error">{failure}</Note> : null}
        <Button type="submit" className="w-full" {...busyProps(busy)}>
          {passwordOn ? 'Set password and continue' : 'Continue without login'}
        </Button>
      </form>
    </AuthCard>
  );
}
