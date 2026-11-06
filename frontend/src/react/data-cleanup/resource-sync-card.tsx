/* "Resource sync" on the data management page: per library record, look up the file on local disks and cloud drives, list the
 * records whose files are gone, empty folders and no-longer-referenced cache, and after confirmation clear them together
 * (ADR-0080). Stale records come in two tiers: those with personal records are marked vanished and the record stays
 * (ADR-0087), while the rest are permanently deleted and never enter trash, so the run key is the danger tier and the
 * confirmation states which tier is irreversible.
 *
 * Scan and cleanup are two background jobs, both through `useBackgroundJob`. The scan's conclusion is that job's terminal
 * state, so the results area renders the current snapshot: what the last scan found is still waiting to be cleaned. Once
 * that run has cleaned (`applied`), the readout is no longer the current state, and the results area switches to the most
 * recent cleanup receipt the server kept. */
import { confirmModal, MEDIA_SOURCE_ICONS } from '@peach/legacy/ui';
import { fmtSize } from '@peach/legacy/core';

import { Button } from '@/components/base/buttons/button';

import { errorMessage } from '../../api';
import { RESOURCE_SYNC_TEXT } from '../../cleanup-tool-skeletons';
import { useBackgroundJob } from '../background-job';
import { Fieldset, FieldsetTitle } from '../components/fieldset';
import { Note } from '../components/note';
import { ConnectionStatus } from '../components/connection-status';
import { StatusLabel } from '../components/status-label';
import { TaskProgress } from '../components/task-progress';
import { spriteGlyph } from '../components/sprite-glyph';
import { PlainStat, plainStatClass } from '../components/stat-card';
import { queryClient } from '../query';
import { SourceMark } from '../settings/section';
import { busyProps } from '../settings/use-action';
import { TRASH_KEY } from './data-cleanup';
import {
  applyConfirmText, applyLeftovers, applyPlanText, applyText, fetchResourceApply, fetchResourceScan, hasChanges,
  purgeCount, RESOURCE_APPLY_KEY, RESOURCE_SCAN_KEY, scanLine, SOURCE_LABELS, sourceMeta, startResourceApply, startResourceScan,
  type ResourceApplyState, type ResourceScanState,
} from './resource-sync';

const COMPARE = spriteGlyph('git-compare');
const AGAIN = spriteGlyph('rotate-cw');
const DISCONNECTED = 'Progress could not be read for the moment; reconnecting…';
const APPLY_LABEL = 'Clean up stale entries';

/* The two result readout rows each split evenly by card count: no half-row wraps regardless of source count. When narrow they wrap like the top readout row, to two columns then one. */
const RESULT_ROW = 'inline-grid w-full grid-flow-col auto-cols-fr gap-4 max-plain-stat-pair:grid-flow-row'
  + ' max-plain-stat-pair:grid-cols-2 max-plain-stat-single:grid-cols-1';

const count = (value: number | undefined) => Number(value || 0).toLocaleString();

/** The result of one scan: a source row, one stat card per source, and one row for the three things to clean. */
function ScanResult({ scan, partial = false }: { scan: ResourceScanState; partial?: boolean }) {
  const cache = scan.cache ?? { files: 0, bytes: 0 };
  return (
    <>
      <div className={RESULT_ROW}>
        {(scan.sources ?? []).map((source) => (
          <article key={source.location} className={plainStatClass()}>
            <PlainStat label={SOURCE_LABELS[source.location] || 'Media sources'}
              mark={<SourceMark mark={MEDIA_SOURCE_ICONS[source.location] ?? 'database'} />}
              aside={<ConnectionStatus online={source.online}>{source.online ? 'Accessible' : 'Offline'}</ConnectionStatus>}
              figure={source.online ? `${count(source.missing)} items` : '—'}
              meta={source.online ? sourceMeta(source) : `${sourceMeta(source)} · skipped this run`} wrapMeta />
            {source.online && source.unreadable > 0
              ? <span className="self-start"><StatusLabel tone="warning">{count(source.unreadable)} directories not read</StatusLabel></span> : null}
          </article>
        ))}
      </div>
      {!partial && <div className={RESULT_ROW}>
        <article className={plainStatClass()}>
          <PlainStat label="Pending permanent deletion" figure={`${count(purgeCount(scan))} items`} meta="Files no longer on disk, trash included" />
        </article>
        <article className={plainStatClass()}>
          <PlainStat label="Will be marked as vanished" figure={`${count(scan.vanish)} items`} meta="Carries personal records; the records stay" />
        </article>
        <article className={plainStatClass()}>
          <PlainStat label="Empty folders" figure={`${count(scan.empty)} items`} meta="Keep source roots" />
        </article>
        <article className={plainStatClass()}>
          <PlainStat label="Cleanable caches" figure={`${count(cache.files)} items`}
            meta={cache.files ? fmtSize(cache.bytes) : ''} />
        </article>
      </div>}
    </>
  );
}

export function ResourceSyncCard(
  { toast }: { toast(message: string, options?: { warning?: boolean }): void },
) {
  const apply = useBackgroundJob<ResourceApplyState, string>({
    queryKey: RESOURCE_APPLY_KEY,
    queryFn: ({ signal }) => fetchResourceApply(signal),
    start: startResourceApply,
    onFinish: (out) => {
      /* Stale records in the trash are deleted along with it: the trash stat card at the top refetches accordingly. The check request carries `applied`. */
      void queryClient.invalidateQueries({ queryKey: TRASH_KEY, exact: true });
      void queryClient.invalidateQueries({ queryKey: RESOURCE_SCAN_KEY, exact: true });
      if (out.status !== 'complete') return;
      /* What remains undeleted is what this round left behind; the deletable ones are gone: report the warning tier, write completion and the unprocessed count, and do not call it failure. */
      const { done, left } = applyLeftovers(out);
      if (left) toast(`Completed ${count(done)} items, ${count(left)} items not processed`, { warning: true });
      else toast('Cleaned dead entries');
    },
  });
  const scan = useBackgroundJob<ResourceScanState>({
    queryKey: RESOURCE_SCAN_KEY,
    queryFn: ({ signal }) => fetchResourceScan(signal),
    start: startResourceScan,
    /* Another scan ran: the previous cleanup's receipt describes the old list. */
    onStarted: () => apply.dismiss(),
  });

  const state = scan.job;
  const scanning = scan.running || scan.start.isPending;
  const cleaning = apply.running || apply.start.isPending;
  const scanned = state?.status === 'complete' || state?.status === 'failed';
  const label = scanning ? 'Scanning' : scanned ? 'Rescan' : 'Check files';

  /* The execution step only accepts this check's candidates, each reviewed again before deleting; there is no undo after deletion. */
  const runApply = (payload: ResourceScanState) => void confirmModal({
    title: APPLY_LABEL,
    body: applyConfirmText(payload),
    confirmLabel: APPLY_LABEL,
    danger: true,
    onConfirm: () => apply.start.mutateAsync(payload.scan_id || ''),
  });

  const done = apply.outcome;
  const receipt = (out: ResourceApplyState) => {
    const partial = applyLeftovers(out).left > 0;
    return (
      <Note tone={partial ? 'warning' : 'success'} title={partial ? 'Partially finished' : 'Cleanup results'}>
        {applyText(out, fmtSize)}
      </Note>
    );
  };
  let progress = null;
  let result = null;
  if (done?.status === 'failed') {
    result = <Note tone="error" title="Resource cleanup did not finish">{done.error || 'Check the task records to verify the processed files.'}</Note>;
  } else if (done) {
    result = receipt(done);
  } else if (apply.running) {
    progress = <TaskProgress embedded label={apply.job?.message || 'Reviewing and cleaning dead entries'} />;
  } else if (scan.start.isError) {
    result = <Note tone="error" title="Scan failed">{errorMessage(scan.start.error)}</Note>;
  } else if (scan.query.isError && state) {
    result = <Note tone="neutral" title="Task state">{DISCONNECTED}</Note>;
  } else if (state?.status === 'running') {
    const line = scanLine(state);
    progress = (
      <TaskProgress embedded label={line} value={state.completed_sources} total={state.total_sources} />
    );
    if (state.sources?.length) result = <ScanResult scan={state} partial />;
  } else if (state?.status === 'failed') {
    result = <>
      {state.sources?.length ? <ScanResult scan={state} partial /> : null}
      <Note tone="error" title="Scan failed">{state.error || 'The background scan failed'}</Note>
    </>;
  } else if (state?.status === 'complete' && state.applied) {
    result = apply.job?.status === 'complete'
      ? receipt(apply.job)
      : <Note tone="neutral" title="Cleanup results">This check's results have been cleaned up; rescanning re-checks them.</Note>;
  } else if (state?.status === 'complete') {
    const changes = hasChanges(state);
    result = (
      <>
        <ScanResult scan={state} />
        {changes
          ? <Note tone="neutral" title="Clean content" action={
              <Button variant="danger" {...busyProps(cleaning)} onClick={() => runApply(state)}>
                {cleaning ? 'Reviewing and cleaning…' : APPLY_LABEL}
              </Button>
            }>{applyPlanText(state)}</Note>
          : <p className="mr-auto text-body-regular text-notification-success-foreground">
              Reachable sources checked; no records, empty folders, or caches waiting for cleanup.
            </p>}
      </>
    );
  }
  if (apply.start.isError && !done) {
    result = <>{result}<Note tone="error" title="Cleanup failed">{errorMessage(apply.start.error)}</Note></>;
  }

  return (
    <section id="resource-sync" aria-labelledby="resource-sync-title" className="flex scroll-mt-20 flex-col gap-4">
      <Fieldset layout="split" labelledBy="resource-sync-title" footer={
        <Button data-resource-scan leadingIcon={scanned && !scanning ? AGAIN : COMPARE} {...busyProps(scanning)}
          onClick={() => { if (!scanning) scan.start.mutate() }}>{label}</Button>
      }>
        <FieldsetTitle id="resource-sync-title" gap="small">Resource sync</FieldsetTitle>
        <p className="max-w-190 text-body-2-regular leading-5 text-text-secondary">
          {RESOURCE_SYNC_TEXT}
        </p>
        <div aria-live="polite" className="mt-4 empty:hidden">{progress}</div>
      </Fieldset>
      <div aria-live="polite" className="flex flex-col gap-4 empty:hidden">{result}</div>
    </section>
  );
}
