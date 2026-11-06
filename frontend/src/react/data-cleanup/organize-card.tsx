/* "Organize" on the data management page (ADR-0039): pick a source, fill two templates, preview, run, plus batch rollback.
 *
 * The preview is one synchronous request whose result lives only on this card; run and rollback are one background job with
 * the snapshot spread over `/api/organize`'s top level, so `useBackgroundJob` uses `withJob` to swap only the job cells,
 * leaving sources, templates and the last batch untouched. Run and rollback touch real file names and database paths, and
 * both pass a confirmation dialog first. */
import { useLayoutEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { confirmModal, MEDIA_SOURCE_ICONS } from '@peach/legacy/ui';
import { LOC } from '@peach/legacy/core';

import { Button } from '@/components/base/buttons/button';
import { IconButton } from '@/components/base/buttons/icon-button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '../components/select';

import { errorMessage } from '../../api';
import { ORGANIZE_PARAMETER_HINT, ORGANIZE_SCOPE_HINT, ORGANIZE_TEXT } from '../../cleanup-tool-skeletons';
import { useBackgroundJob } from '../background-job';
import { Fieldset, FieldsetTitle } from '../components/fieldset';
import { Note } from '../components/note';
import { TaskProgress } from '../components/task-progress';
import { queryClient } from '../query';
import { SourceMark } from '../settings/section';
import { FolderSearchIcon } from '../settings/folder-rows';
import { busyProps } from '../settings/use-action';
import {
  baseName, DIRECTORY_TEMPLATE_ERROR, fetchOrganize, fetchOrganizeExample, ORGANIZE_KEY, organizeOutcome, planSummary,
  pickOrganizeFolder, previewOrganize, rememberTemplates, startOrganize, withOrganizeJob,
  type OrganizeCommand, type OrganizeData, type OrganizeJob, type OrganizePlan,
} from './organize';

const APPLY_BODY = (name: string, path: string) => `Organize ${name}${path ? ` in ${path} and its subdirectories` : '\'s file names and directories'}: clean up special symbols and garbled characters, and rename or move per the filled-in template. Rows whose target already exists are skipped whole. `
  + 'This batch can be reverted whole via "Roll back previous batch".';
const ROLLBACK_BODY = 'This moves the files the last organize run touched back to their earlier names and locations, and the database paths follow. '
  + 'After reverting, this batch no longer appears here.';
/* The Preview only lists the first 8 rows: this is for a person to glance at whether the direction is right; the full plan is in the CSV. */
const PLAN_ROWS = 8;

function PlanRows({ plan }: { plan: OrganizePlan }) {
  return (
    <>
      <ol className="mt-2 flex min-w-0 flex-col gap-1">
        {plan.rows.slice(0, PLAN_ROWS).map((row) => (
          <li key={row.current_path}
            className="flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary">
            <span data-middle-truncate title={row.current_path} className="min-w-0 truncate">{baseName(row.current_path)}</span>
            <span aria-hidden>→</span>
            <span data-middle-truncate title={row.target_path} className="min-w-0 truncate text-text-primary">{baseName(row.target_path)}</span>
          </li>
        ))}
      </ol>
      {plan.truncated || plan.rows.length > PLAN_ROWS
        ? <p className="text-caption-1-regular text-text-secondary">Only the first 8 rows are listed; the full plan is in the plan CSV.</p>
        : null}
    </>
  );
}

export function OrganizeCard(
  { toast, failure }: { toast(message: string): void; failure(action: string, error: unknown): void },
) {
  const organize = useQuery({ queryKey: ORGANIZE_KEY, queryFn: ({ signal }) => fetchOrganize(signal) });
  const data = organize.data;
  const locations = data?.locations ?? [];
  const [chosen, setChosen] = useState('');
  const location = locations.some((row) => row.location === chosen) ? chosen : locations[0]?.location ?? '';
  const stored = data?.templates?.[location];
  /* Before the user touches them, the two boxes follow the stored template: switching sources swaps in the two lines that source used last time. */
  const [draft, setDraft] = useState<{ location: string; file: string; dir: string } | null>(null);
  const fields = draft?.location === location ? draft : { location, file: stored?.file ?? '', dir: stored?.dir ?? '' };
  const edit = (patch: Partial<{ file: string; dir: string }>) => { setDraft({ ...fields, ...patch }); preview.reset() };
  const [scope, setScope] = useState({ location: '', path: '' });
  const path = scope.location === location ? scope.path : '';
  const scopeRef = useRef({ location, path });
  scopeRef.current = { location, path };
  const [invalid, setInvalid] = useState<'file' | 'dir' | 'path' | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const dirInput = useRef<HTMLInputElement>(null);
  const pathInput = useRef<HTMLInputElement>(null);
  const example = useQuery({
    queryKey: ['organize-example', fields.file, fields.dir],
    queryFn: ({ signal }) => fetchOrganizeExample(fields.file, fields.dir, signal),
    enabled: Boolean(data),
  });
  const [target, setTarget] = useState<'file' | 'dir'>('file');
  const focused = useRef(false);
  const insertion = useRef<{ field: 'file' | 'dir'; caret: number } | null>(null);
  useLayoutEffect(() => {
    const next = insertion.current;
    if (!next) return;
    insertion.current = null;
    const input = (next.field === 'file' ? fileInput : dirInput).current;
    input?.focus();
    input?.setSelectionRange(next.caret, next.caret);
  });

  const request = () => ({ location, path: path.trim(), file_template: fields.file.trim(), dir_template: fields.dir.trim() });
  const preview = useMutation({
    mutationFn: previewOrganize,
    /* When a template is invalid the error lives in one of the two boxes, so besides the reason, name which one. */
    onError: (cause) => {
      const target = /Organize路径/.test(errorMessage(cause)) ? 'path'
        : DIRECTORY_TEMPLATE_ERROR.test(errorMessage(cause)) ? 'dir' : 'file';
      setInvalid(target);
      (target === 'path' ? pathInput : target === 'dir' ? dirInput : fileInput).current?.focus();
    },
  });
  const picker = useMutation({
    mutationFn: ({ initial }: { initial: string; location: string; path: string }) => pickOrganizeFolder(initial),
    onSuccess: (picked, sent) => {
      if (!picked.path || sent.location !== scopeRef.current.location || sent.path !== scopeRef.current.path) return;
      setScope({ location: sent.location, path: picked.path });
      setInvalid(null); preview.reset();
      pathInput.current?.focus();
    },
  });
  const job = useBackgroundJob<OrganizeJob, OrganizeCommand, OrganizeData>({
    queryKey: ORGANIZE_KEY,
    queryFn: ({ signal }) => fetchOrganize(signal),
    start: startOrganize,
    jobOf: (current) => current,
    withJob: withOrganizeJob,
    onStarted: () => preview.reset(),
    onFinish: (finished) => {
      /* The previous batch changed with this run: execute adds a batch, rollback removes one. Re-read once to pick up the new `last_batch`. */
      void queryClient.invalidateQueries({ queryKey: ORGANIZE_KEY, exact: true });
      if (finished.status !== 'complete') return;
      const { text, failed } = organizeOutcome(finished);
      if (failed) failure('Organize files', new Error(`${failed} rows could not be processed`));
      else toast(text.replace(/.$/, ''));
    },
  });

  const running = job.running || job.start.isPending;
  const previewMatches = JSON.stringify(preview.variables) === JSON.stringify(request());
  const plan = previewMatches ? preview.data : undefined;
  const changes = Number(plan?.counts?.change || 0);
  const name = LOC[location] || location;
  const changeTemplates = (patch: Partial<{ file: string; dir: string }>) => {
    edit(patch); setInvalid(null); preview.reset();
  };
  const insertParameter = (key: string) => {
    const input = (target === 'file' ? fileInput : dirInput).current;
    const value = fields[target];
    const start = focused.current ? input?.selectionStart ?? value.length : value.length;
    const end = focused.current ? input?.selectionEnd ?? start : start;
    const token = `{${key}}`;
    insertion.current = { field: target, caret: start + token.length };
    changeTemplates({ [target]: value.slice(0, start) + token + value.slice(end) });
  };

  const runPreview = () => {
    if (preview.isPending || running || !location) return;
    job.dismiss(); job.start.reset();
    setInvalid(null);
    preview.mutate(request());
  };
  const runApply = () => {
    const sent = preview.variables;
    if (!sent || !plan || !changes) return;
    void confirmModal({
      title: 'Organize files', body: APPLY_BODY(name, sent.path), confirmLabel: 'Organize files',
      /* Save the template for that source when confirming the run. */
      onConfirm: async () => {
        await job.start.mutateAsync({ kind: 'apply', request: sent });
        void rememberTemplates({
          ...(data?.templates ?? {}), [sent.location]: { file: sent.file_template, dir: sent.dir_template },
        });
      },
    });
  };
  const runRollback = () => void confirmModal({
    title: 'Roll back the previous organize batch', body: ROLLBACK_BODY, confirmLabel: 'Roll back organizing',
    onConfirm: () => job.start.mutateAsync({ kind: 'rollback' }),
  });

  /* The conclusion on this card is one line: the running trip, the trip just followed through this time, and the Preview just produced — take the newest by recency. */
  let state = null;
  const applicable = !!changes && !running && !job.outcome;
  const current = job.job;
  const outcome = job.outcome;
  if (current?.status === 'running') {
    const line = current.message || current.stage || 'Organizing files';
    state = <TaskProgress embedded label={line} value={Math.min(current.checked || 0, current.total || 0)} total={current.total} />;
  } else if (outcome?.status === 'failed') {
    state = <Note tone="error" title="File organizing did not finish">{outcome.error || 'Check the task records to verify the processed files.'}</Note>;
  } else if (outcome) {
    const { text, failed } = organizeOutcome(outcome);
    state = <Note tone={failed ? 'warning' : 'success'} title={failed ? 'Partially finished' : 'Organize results'}>{text}</Note>;
  } else if (job.start.isError) {
    state = <Note tone="error" title="Organizing failed">{errorMessage(job.start.error)}</Note>;
  } else if (preview.isPending) {
    state = <TaskProgress embedded label="Verifying the organize plan" />;
  } else if (preview.isError && previewMatches) {
    state = <Note tone="error" title="Organize preview failed">{errorMessage(preview.error)}</Note>;
  } else if (plan) {
    state = <><Note tone="neutral" title="Preview results">{planSummary(plan)}</Note>{changes ? <PlanRows plan={plan} /> : null}</>;
  }

  return (
    <Fieldset layout="stack" id="organize" labelledBy="cleanup-organize-title"
      attributes={{ 'data-cleanup-organize': '' }}
      footer={
        <>
          {data?.last_batch
            ? <Button variant="secondary" {...busyProps(running)} onClick={runRollback}>Roll back last batch</Button>
            : null}
          <Button variant={applicable ? 'secondary' : 'primary'} disabled={!locations.length || running}
            {...busyProps(preview.isPending)} onClick={runPreview}>Preview</Button>
          {applicable ? <Button variant="primary" onClick={runApply}>Run organizing</Button> : null}
        </>
      }>
      <FieldsetTitle id="cleanup-organize-title" gap="medium">Organize</FieldsetTitle>
      <p className="text-body-regular text-text-secondary">
        {ORGANIZE_TEXT}
      </p>
      {organize.isError
        ? <div className="mt-3"><Note tone="error" title="Reading organize configuration failed">{errorMessage(organize.error)}</Note></div>
        : null}
      <div className="mt-3 flex flex-col gap-3">
        <div data-organize-scope className="flex min-w-0 flex-wrap items-start gap-2">
        {locations.length
          ? <Select aria-label="Which source to organize" prefix="Source" className="w-fit min-w-25" selectedKey={location || null}
              onSelectionChange={(key) => {
                if (key === null) return;
                setChosen(String(key)); setScope({ location: String(key), path: '' });
                setInvalid(null); preview.reset(); picker.reset(); focused.current = false;
              }}>
              {locations.map((row) => (
                <SelectItem key={row.location} id={row.location} textValue={LOC[row.location] || row.location}>
                  <SourceMark mark={MEDIA_SOURCE_ICONS[row.location] || 'database'} />{LOC[row.location] || row.location}
                </SelectItem>
              ))}
            </Select>
          : null}
          <div className="flex min-w-0 basis-64 flex-1 items-start gap-2">
            <Input aria-label="Organize path" className="min-w-0 flex-1" placeholder="Leave empty to organize the whole source"
              name="organize-path" autoComplete="off" spellCheck="false" value={path} ref={pathInput}
              isInvalid={invalid === 'path'}
              onChange={(value) => { setScope({ location, path: value }); setInvalid(null); preview.reset(); picker.reset() }} />
            <IconButton icon={FolderSearchIcon} aria-label="Choose the organize path" {...busyProps(picker.isPending)}
              onClick={() => picker.mutate({ initial: path || locations.find((row) => row.location === location)?.roots[0] || '', location, path })} />
          </div>
        </div>
        <p className="text-caption-1-regular text-text-secondary">{ORGANIZE_SCOPE_HINT}</p>
        {picker.isError ? <Note tone="error" title="目录选择失败">{errorMessage(picker.error)}；也可直接输入路径。</Note> : null}
        <Input label="文件名模板" placeholder="{code}[ {title}]" value={fields.file} ref={fileInput}
          spellCheck="false" isInvalid={invalid === 'file'}
          onFocus={() => { setTarget('file'); focused.current = true }}
          onChange={(value) => changeTemplates({ file: value })} />
        <Input label="Folder template" placeholder="Leave empty to rename in place" value={fields.dir} ref={dirInput}
          spellCheck="false" isInvalid={invalid === 'dir'}
          onFocus={() => { setTarget('dir'); focused.current = true }}
          onChange={(value) => changeTemplates({ dir: value })} />
        {data?.presets?.length
          ? <div className="flex flex-col gap-2" role="group" aria-label="Apply template">
              <p className="text-caption-1-medium text-text-secondary">Apply template</p>
              <div className="flex flex-wrap gap-2">
              {data.presets.map((preset) => (
                <Button key={preset.label} variant="secondary" size="small" title={preset.example || preset.label}
                  className="max-w-full [&>span]:min-w-0 [&>span]:shrink"
                  onClick={() => { changeTemplates({ file: preset.file, dir: preset.dir }); focused.current = false }}>
                  <span className="truncate">{preset.label}</span>
                </Button>
              ))}
              </div>
            </div>
          : null}
        <p aria-live="polite" aria-busy={example.isFetching} data-organize-example=""
          className="text-caption-1-regular text-text-secondary">
          Path example:<code className="wrap-anywhere">{example.data?.example || example.data?.error
            || (example.isError ? errorMessage(example.error) : 'Previewing…')}</code>
        </p>
        {data?.placeholders?.length ? <div className="flex flex-col gap-2" role="group" aria-label="Insert parameters">
          <p className="text-caption-1-regular text-text-secondary" aria-live="polite">
            <strong className="text-caption-1-semibold text-text-primary">Insert parameters</strong> (into {target === 'file' ? 'File name template' : 'Folder template'}）
          </p>
          <div className="flex flex-wrap gap-1">
            {data.placeholders.map((item) => <Button key={item.key} variant="ghost" size="small"
              aria-label={`${item.label} {${item.key}}`} onClick={() => insertParameter(item.key)}>
              <span className="inline-flex flex-wrap items-center gap-x-1.5">
                <code>{`{${item.key}}`}</code><span className="text-text-secondary">{item.label}</span>
              </span>
            </Button>)}
          </div>
        </div> : null}
        <p className="text-caption-1-regular leading-4.5 text-text-secondary">
          {ORGANIZE_PARAMETER_HINT}
        </p>
      </div>
      <div aria-live="polite" className="mt-3 flex flex-col gap-2 empty:hidden">{state}</div>
    </Fieldset>
  );
}
