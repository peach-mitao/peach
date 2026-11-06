/* Task center top "Needs attention": problems the background services have right now, one row per item.
 *
 * These are ongoing states (repeated scheduling failures, the public entry disconnected, the network down), not a run that's already passed, so they don't go into the task table;
 * the data comes from `/api/background-issues`, and the server reads each service's snapshot fresh each time; once the problem clears the row is gone.
 * A row only states what it is and when it started, plus a link that names where to go (the copy is given by the server); the cause is explained only at the
 * Settings spot the link points to, not restated here. Things an in-place rerun might fix (network, scheduling, the amane bridge) get an extra
 * "Retry now"; ones that need a Settings change or a credential filled in get only the link. Link on the left, Retry on the right: the action that fixes it in place is this row's
 * primary action, placed at the far right like the section's bottom action bar; on rows without a Retry, the link lands in that same position.
 *
 * There are two kinds of time: the start the service itself recorded reads "since …"; for services that don't record the failure time, it reads the moment it was first
 * seen in this run "found at …", and the two aren't mixed. When there are no problems the whole block isn't drawn, and neither is it on a fetch failure: when a service is unreachable,
 * there's already a read-failure banner at the top of the page. */
import { useId } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiArrowRightLine } from '@remixicon/react';

import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';

import { apiGet, apiSend, errorMessage } from '../../api';
import { Note } from '../components/note';
import { busyProps } from '../settings/use-action';
import { momentText } from './tasks';

export const BACKGROUND_ISSUES_URL = '/api/background-issues';
export const BACKGROUND_ISSUES_KEY = ['background-issues'] as const;

export interface BackgroundIssue {
  key: string;
  title: string;
  href: string;
  /** Link copy naming a concrete destination, such as "Open notification settings". */
  link_label: string;
  /** The starting point each service records itself; null for services that do not record one. */
  since: string | null;
  /** The moment this item was first read in this run. */
  noticed_at: string;
  retry: string | null;
  retry_available: boolean;
}

export function BackgroundIssues() {
  const id = useId();
  const query = useQuery({
    queryKey: BACKGROUND_ISSUES_KEY,
    queryFn: ({ signal }) => apiGet<{ issues: BackgroundIssue[] }>(BACKGROUND_ISSUES_URL, signal),
    refetchInterval: 30_000,
  });
  const issues = query.data?.issues || [];
  if (!issues.length) return null;
  return (
    <section aria-labelledby={id} className="flex min-w-0 flex-col gap-3">
      <h3 id={id} className="text-title-2-medium text-text-primary">Needs attention</h3>
      <ul className="flex min-w-0 flex-col gap-3">
        {issues.map((issue) => <li key={issue.key}><IssueRow issue={issue} /></li>)}
      </ul>
    </section>
  );
}

function IssueRow({ issue }: { issue: BackgroundIssue }) {
  const client = useQueryClient();
  const retry = useMutation({
    mutationFn: () => apiSend(issue.retry!, {}),
    onSuccess: () => { void client.invalidateQueries({ queryKey: BACKGROUND_ISSUES_KEY }) },
  });
  const moment = issue.since ? `Since ${momentText(issue.since)}` : `Noticed at ${momentText(issue.noticed_at)}`;
  return (
    <Note tone="error" title={issue.title} action={
      <div className="flex flex-wrap items-center gap-2">
        <LinkButton href={issue.href} size="small" trailingIcon={RiArrowRightLine}>{issue.link_label}</LinkButton>
        {issue.retry
          ? <Button variant="secondary" size="small" disabled={!issue.retry_available}
              {...busyProps(retry.isPending)} onClick={() => retry.mutate()}>Retry now</Button>
          : null}
      </div>
    }>
      {retry.error ? `${moment}\nNot retried: ${errorMessage(retry.error)}` : moment}
    </Note>
  );
}
