/* Activity page: the only UI over the task center's table.
 *
 * This screen answers three questions, ordered by urgency: what is running right now, which round was blocked, and how the
 * recently finished ones went. The three sections share one `/api/tasks` response. The leading "Needs attention" is the
 * background services' current problems; the "Cloud download" section at the end is cloud drive offline tasks; the two fetch
 * and poll on their own (`background-issues.tsx`, `downloads-panel.tsx`), independent of these three.
 *
 * Polling is Query's `refetchInterval`: the interval is computed from the last response, every two seconds while something
 * runs, every ten seconds when everything is terminal. It is a background refresh and does not write `aria-busy`: the page's
 * content is always complete, and writing it would tell assistive tech and smoke tests "this screen is not ready". Fetch
 * failures report one line inside the page and keep the previous data: in the seconds a service is restarting, replacing the
 * page with an error is harder to use than keeping progress from ten seconds ago.
 *
 * The "Load earlier" at the end of "Recently completed" pages backward; appended rows stay in the component and merge by id
 * with the polled copy: polling only manages the first page, so pages already flipped through are not washed away by the next
 * refresh. */
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { RiArrowDownSLine, RiArrowRightLine, RiHistoryLine } from '@remixicon/react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Chip } from '@/components/base/badges/chip';
import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';

import { errorMessage } from '../../api';
import { cardClass } from '../components/card';
import { CodeBlock } from '../components/code-block';
import { EmptyState } from '../components/empty-state';
import { IssueRow } from '../components/issue-row';
import { LoadingDots } from '../components/loading-dots';
import { NameLink } from '../components/name-link';
import { Note } from '../components/note';
import { Page } from '../components/page';
import { Progress } from '../components/progress';
import { busyProps } from '../settings/use-action';
import { Disclosure } from '../settings/section';
import { BackgroundIssues } from './background-issues';
import { DownloadsPanel } from './downloads-panel';
import { ErrorDetails, ErrorExcerpt } from './error-excerpt';
import { TaskControlFeedback, TaskControls } from './task-controls';
import { TaskIcon } from './task-icon';
import { TaskResources } from './task-resources';
import {
  elapsedText, fetchEarlier, fetchTasks, foldByKind, foldRoutine, followupDetail, followupDetailLong, followupTally, groupFollowups, isActive,
  hasResultProblems, isRoutine, latestOfKind, mergeFinished, momentText, pollInterval, problemDestination, progressText,
  readableErrorHeadline, statusLabel, summaryItems, taskIssues, taskSubject, TASKS_KEY, TRIGGER_LABELS, type FollowupCounts, type TaskControlState, type TaskRunPayload,
} from './tasks';

/** How many successors one card may list. Batches merged into one card can reach thousands, and painting them all fills the screen with the same sentence. */
const FOLLOWUP_ROWS = 50;
/** It only dispatches successor tasks: one round is just 'how many were scheduled'; what matters is the results of those items. */
const DISPATCHERS = new Set(['upgrade-repairs']);
/** 开跑时写进摘要、指明这一轮处理哪部作品的两项（`taskSubject`）。 */
const SUBJECT_KEYS = new Set(['asset_id', 'name']);

/* 完成绿、失败与已取消红、进行中蓝、意外中断黄，排队为中性。 */
const BADGE_COLORS: Record<string, 'lime' | 'rose' | 'yellow' | 'blue' | 'neutral'> = {
  succeeded: 'lime', failed: 'rose', cancelled: 'rose', interrupted: 'yellow', running: 'blue', pending: 'neutral',
};

const CONTROL_LABELS: Record<TaskControlState, string> = {
  running: '进行中', pausing: '正在暂停', paused: '已暂停', cancelling: '正在取消',
};

function StatusBadge({ run }: { run: TaskRunPayload }) {
  const control = run.control?.state;
  if (control && (control !== 'running' || !isActive(run))) {
    return <Chip color={control === 'running' ? 'blue' : 'neutral'}>
      <span data-copy-key={`tasks.control.state.${control}`}>{CONTROL_LABELS[control]}</span>
    </Chip>;
  }
  const partial = run.status === 'failed' && run.task_key === 'library-processing'
    && run.result_summary?.outcome === 'partial';
  const problems = partial || run.status === 'succeeded' && hasResultProblems(run);
  return <Chip color={problems ? 'yellow' : BADGE_COLORS[run.status] ?? 'neutral'}>
    {partial ? 'Some items need handling' : problems ? 'Issues found' : statusLabel(run.status)}
  </Chip>;
}

/** Successors dispatched by one run (ADR-0040). Attached inside the parent task card, one per row.
 *
 * A successor is its own run with its own status and results, but shown alone it cannot tell who dispatched it,
 * and that is exactly the only thing this screen needs to explain: the user never clicked "fetch covers", yet it is running.
 * Inter-row lines are written on each li itself; the first row's line doubles as the divider from the card body. */
function FollowupList({ rows }: { rows: TaskRunPayload[] }) {
  return (
    <ul className="-mr-5 flex min-w-0 flex-col">
      {rows.map((row) => {
        const detail = followupDetail(row);
        const detailLong = followupDetailLong(row);
        return (
          <li key={row.id} data-status={row.status} data-followup-key={row.followup_key}
            className="flex min-w-0 flex-col gap-1 border-t border-separator-border py-2.5 pr-10 pl-5">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <TaskIcon taskKey={row.task_key} className="size-4 shrink-0 text-text-secondary" />
                <span className="min-w-0 break-words text-caption-1-regular text-text-primary">
                  {row.task_label}
                </span>
                <StatusBadge run={row} />
                {detail
                  ? <span className="min-w-0 break-words text-caption-1-regular text-text-secondary">{detail}</span>
                  : null}
              </div>
              <TaskControls run={row} />
            </div>
            <TaskResources run={row} />
            {/* 排队中的那些还没有结果：空的「技术详情」展开只有一对花括号。 */}
            {Object.keys(row.result_summary || {}).length
              ? <div className="w-full min-w-0">
                  <Disclosure summary="Technical details" contentClassName="pb-2.5">
                    {detailLong !== detail
                      ? <p className="wrap-anywhere text-caption-1-regular text-text-secondary">{detailLong}</p>
                      : null}
                    <CodeBlock code={JSON.stringify(row.result_summary, null, 2)} language="json"
                      label={`${row.task_label} technical details`} />
                  </Disclosure>
                </div>
              : null}
          </li>
        );
      })}
    </ul>
  );
}

/** One card per task run. On failure the whole card's border switches to the danger color instead of coloring the end-reason line:
 *  reading red text line by line across a dozen rows is much slower than glancing at which card has a red border. */
function RunCard(
  { run, meta, children, error, issues, followups, followupTotal = 0, badge, resourceActive, controlled }:
  { run: TaskRunPayload; meta: string; children?: ReactNode; error?: string; issues?: ReactNode;
    followups?: TaskRunPayload[]; followupTotal?: number; badge?: ReactNode; resourceActive?: boolean;
    controlled?: TaskRunPayload[] },
) {
  /* When one round dispatches thousands of follow-ups, only the most recent few dozen are sent down, and merged batches may each carry dozens more: the title states the full count,
     the list shows running and queued first, then the most recently finished, capped at `FOLLOWUP_ROWS` entries, and says how many of the total are listed. */
  const rank = (row: TaskRunPayload) => (row.status === 'running' ? 3 : row.status === 'pending' ? 2
    : row.status === 'failed' || row.status === 'interrupted' ? 1 : 0);
  const listed = followups ? [...followups].sort((a, b) =>
    rank(b) - rank(a) || b.id - a.id).slice(0, FOLLOWUP_ROWS) : [];
  const shown = listed.length;
  const total = Math.max(followups?.length || 0, followupTotal);
  const subject = taskSubject(run);
  const errorFull = String(error || '').trim();
  const errorHead = readableErrorHeadline(errorFull);
  return (
    // The `id` lets the "needs attention" row's "View failures" scroll straight to this card.
    <li id={`run-${run.id}`} data-status={run.status} data-task-key={run.task_key} data-run-id={run.id}
      className={cardClass({
        padding: 'none', bordered: run.status === 'failed' ? 'error' : undefined, className: 'flex flex-col',
      })}>
      {/* The card title is one step below the section title ('In progress'), and title, time and summary share one line spacing. */}
      <div className="flex flex-col gap-2 px-5 py-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <TaskIcon taskKey={run.task_key} className="size-5 shrink-0 text-text-secondary" />
            <strong className="min-w-0 break-words text-title-3-medium text-text-primary">{run.task_label}</strong>
            {badge ?? <StatusBadge run={run} />}
          </div>
          <TaskControls run={run} runs={controlled} />
        </div>
        <p className="text-caption-1-regular text-text-secondary">{meta}</p>
        <TaskResources run={run} active={resourceActive} />
        {/* 文件名常有上百字：单行末尾省略，番号在开头，完整名称在悬停提示里。不用 data-middle-truncate：
            它按 Canvas 量宽，不计中西文自动间距，中日文夹英文的名字会被裁掉末尾几个像素。 */}
        {subject ? <NameLink href={subject.href} data-task-subject={run.id} title={subject.label}
          className="min-w-0 max-w-full self-start truncate text-text-primary">
          {subject.label}
        </NameLink> : null}
        {/* 结束原因是这一轮的结论，和摘要一样写在正文里；全文是明细，收进下面的「错误详情」。 */}
        {errorHead ? <p data-task-error="" className="text-caption-1-regular text-text-secondary wrap-anywhere">{errorHead}</p> : null}
        {children}
      </div>
      {/* 问题详情、错误详情、任务明细、技术详情都是可展开的明细，同样排成卡片底部带分隔线的一行，按这个顺序。 */}
      {issues ? <div className="border-t border-separator-border px-5 py-2.5">{issues}</div> : null}
      {errorHead && errorFull !== errorHead ? <div className="border-t border-separator-border px-5 py-2.5">
        <Disclosure summary="错误详情" contentClassName="pb-2.5">
          <ErrorDetails label={`${run.task_label}错误详情`}>{errorFull}</ErrorDetails>
        </Disclosure>
      </div> : null}
      {shown ? <div className="border-t border-separator-border px-5 py-2.5">
        <Disclosure summary={`Task details · ${total.toLocaleString()} ${total === 1 ? 'item' : 'items'}`}
          contentClassName="pb-2.5"
          defaultOpen={listed.some((row) => isActive(row))}>
          {shown < total
            ? <p className="text-caption-1-regular text-text-secondary">Listing {shown.toLocaleString()} {shown === 1 ? 'item' : 'items'}, in-progress first</p>
            : null}
          <FollowupList rows={listed} />
        </Disclosure>
      </div> : null}
      {/* 摘要里只有开跑时写下的作品时，它已经链接在卡片上，不再单列一块技术详情。 */}
      {Object.keys(run.result_summary || {}).some((key) => !(subject && SUBJECT_KEYS.has(key)))
        ? <div className="border-t border-separator-border px-5 py-2.5">
        <Disclosure summary="技术详情" contentClassName="pb-2.5">
          <CodeBlock code={JSON.stringify(run.result_summary, null, 2)} language="json"
            label={`${run.task_label} technical details`} />
        </Disclosure>
      </div> : null}
    </li>
  );
}

function RunningRun({ run, followups }: { run: TaskRunPayload; followups?: TaskRunPayload[] }) {
  const total = run.progress_total || 0;
  const current = run.progress_current || 0;
  const control = run.control?.state;
  const stopping = control && control !== 'running';
  const label = stopping ? CONTROL_LABELS[control] : run.progress_label || '正在进行';
  const elapsed = elapsedText(run.elapsed_seconds);
  const meta = [TRIGGER_LABELS[run.trigger] || run.trigger, elapsed && `Ran for ${elapsed}`]
    .filter(Boolean).join(' · ');
  return (
    <RunCard run={run} meta={meta} followups={followups}>
      {total > 0
        ? <div className="flex flex-col gap-1.5">
            <Progress label={label} value={Math.min(current, total)} max={total} />
            <p className="text-caption-1-regular text-text-secondary wrap-anywhere">{label} · {progressText(current, total)} items</p>
          </div>
        : stopping ? <p data-copy-key={`tasks.control.state.${control}`}
            className="text-caption-1-regular text-text-secondary">{label}</p> : <LoadingDots label={label} />}
    </RunCard>
  );
}

/** A finished run. With more than one entry in `runs`, these are collapsed routine rounds: the time is written as the span
 *  from earliest to latest, and the summary takes the newest round, since routine rounds' summaries are identical anyway and
 *  listing each would just copy one line N times.
 *  The job card records only this run's history: problems still unresolved and "Retry now" live in the page-top "Needs
 *  attention" block.
 *  `latest` says whether it is that job kind's newest round: some jobs only have an action entry point on the newest round. */
function SettledRun(
  { run, followups, runs, latest, followupTotal, followupFailed = 0, followupCancelled = 0 }:
  { run: TaskRunPayload; followups?: TaskRunPayload[]; runs?: TaskRunPayload[]; latest: boolean;
    followupTotal?: number; followupFailed?: number; followupCancelled?: number },
) {
  /* When several dispatched batches merge into one card, the latest batch's "64 items scheduled" cannot tell the whole story: say instead how many items were processed in total and how many failed,
     with the badge reading "issues found" when there are failures, and the failed entries sorted to the front of the task details. */
  const batches = Boolean(runs && runs.length > 1 && followupTotal);
  const summary = batches
    ? [`Processed ${followupTotal!.toLocaleString()} items in total`, followupFailed ? `${followupFailed.toLocaleString()} of them failed` : '']
        .filter(Boolean)
    // 作品链接已写出文件名，摘要不再列「名称」。
    : summaryItems(taskSubject(run) ? { ...run.result_summary, name: '' } : run.result_summary)
        // 结束原因由卡片单独写一行，摘要里同一句不再重复。
        .filter((line) => line !== run.error && line !== readableErrorHeadline(run.error));
  const issues = taskIssues(run);
  const destination = problemDestination(run, latest);
  const elapsed = elapsedText(run.elapsed_seconds);
  const oldest = runs && runs.length > 1 ? runs[runs.length - 1] : undefined;
  const meta = (oldest
    ? [TRIGGER_LABELS[run.trigger] || run.trigger, `Last ${runs!.length} rounds`,
       `${momentText(oldest.finished_at)} – ${momentText(run.finished_at)}`]
    : [TRIGGER_LABELS[run.trigger] || run.trigger, momentText(run.finished_at),
       elapsed && `Took ${elapsed}`]).filter(Boolean).join(' · ');
  return (
    <RunCard run={run} meta={meta} error={run.error} followups={followups} followupTotal={followupTotal}
      issues={issues.length ? <Disclosure summary={`问题详情 · ${issues.length} 项`} contentClassName="pb-2.5">
        <ErrorDetails label="任务问题详情">
        {/* 与数据管理的问题清单同一种分层：名字一层，来源与问题类别跟在名字后面用次级色，原因再低一档。 */}
        <ul className="flex min-w-0 flex-col whitespace-normal" data-task-issues="">
          {issues.map((issue, index) => <IssueRow key={`${issue.source}-${index}`} title={<>
              {issue.label}
              {issue.provider || issue.kind
                ? <span className="text-body-2-regular text-text-secondary"> · {[issue.provider, issue.kind].filter(Boolean).join(' · ')}</span>
                : null}
            </>}>
            <ErrorExcerpt text={issue.error} className="text-caption-1-regular text-text-secondary" />
          </IssueRow>)}
        </ul>
        </ErrorDetails>
      </Disclosure> : undefined}
      badge={followupCancelled && run.status === 'succeeded'
        ? <Chip color="rose"><span data-copy-key={`tasks.followups.cancelled.${followupCancelled === followupTotal ? 'all' : 'partial'}`}>
            {followupCancelled === followupTotal ? '后续任务已取消' : '部分后续任务已取消'}
          </span></Chip>
        : batches && followupFailed ? <Chip color="yellow">发现问题</Chip> : undefined}>
      {followupCancelled ? <p className="text-caption-1-regular text-text-secondary">
        后续任务已取消 {followupCancelled.toLocaleString()} 项
      </p> : null}
      {/* 只有一句摘要时不加项目符号：单独一个圆点读起来像漏了下文。 */}
      {summary.length === 1
        ? <p className="text-caption-1-regular text-text-secondary wrap-anywhere">{summary[0]}</p>
        : summary.length ? <ul className="flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere">
            {summary.map((line, index) => <li key={index}>{line}</li>)}
          </ul> : null}
      {!issues.length && hasResultProblems(run) && ['follow-check', 'feed-check'].includes(run.task_key)
        ? <p className="text-body-2-regular text-text-secondary">未取得本轮逐项详情，可到来源列表查看检查结果。</p> : null}
      {destination
        ? <LinkButton href={destination.href} size="small" trailingIcon={RiArrowRightLine}
            className="self-start">
            {destination.label}
          </LinkButton> : null}
    </RunCard>
  );
}

/** Rounds that finished themselves while their dispatched successors are still running merge into one card per task kind.
 *
 * The parent task's round is only "scheduling", done in seconds; what the user cares about is how far the scheduled batch got. So the badge reads in-progress,
 * and the progress bar counts all successors, not the rows listed on the page. */
function WorkingRun(
  { runs, followups, counts }:
  { runs: TaskRunPayload[]; followups: TaskRunPayload[]; counts: FollowupCounts | undefined },
) {
  const run = runs[0]!;
  const oldest = runs[runs.length - 1]!;
  const tally = followupTally(counts, runs);
  const total = Math.max(tally.total, followups.length);
  const settled = tally.total ? tally.settled : followups.filter((row) => !isActive(row)).length;
  const failed = tally.total ? tally.failed
    : followups.filter((row) => row.status === 'failed' || row.status === 'interrupted').length;
  const meta = [TRIGGER_LABELS[run.trigger] || run.trigger,
    runs.length > 1 ? `${runs.length} batches` : '',
    `Started ${momentText(oldest.started_at || oldest.finished_at)}`].filter(Boolean).join(' · ');
  return (
    <RunCard run={run} meta={meta} followups={followups} followupTotal={total} resourceActive controlled={runs}
      badge={run.control ? <StatusBadge run={run} /> : <Chip color="blue">进行中</Chip>}>
      <div className="flex flex-col gap-1.5">
        <Progress label={`${run.task_label} progress`} value={settled} max={total} />
        <p className="text-caption-1-regular text-text-secondary">
          Processed {progressText(settled, total)} items{failed ? ` · ${failed.toLocaleString()} of them failed` : ''}
        </p>
      </div>
    </RunCard>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="flex min-w-0 flex-col gap-3">
      <h3 id={id} className="text-title-2-medium text-text-primary">{title}</h3>
      {children}
    </section>
  );
}

function RunList({ live = false, children }: { live?: boolean; children: ReactNode }) {
  return (
    <ul aria-live={live ? 'polite' : undefined} className="flex min-w-0 flex-col gap-3">{children}</ul>
  );
}

export function ActivityPage() {
  const tasks = useQuery({
    queryKey: TASKS_KEY,
    queryFn: ({ signal }) => fetchTasks(signal),
    refetchInterval: (query) => pollInterval(query.state.data),
  });
  const data = tasks.data;
  const top = data?.finished;
  // Rows that continue when paging backward. Empty until a backward page happens, in which case the page looks exactly like the first page alone.
  const [earlier, setEarlier] = useState<TaskRunPayload[]>([]);
  const [earlierMore, setEarlierMore] = useState(false);
  const [earlierCounts, setEarlierCounts] = useState<FollowupCounts>({});
  const [seenTop, setSeenTop] = useState(top);
  if (top !== seenTop) {
    setSeenTop(top);
    // After paging, newly finished rounds push items off the end of page one; merge the previous page one into the already-paged portion,
    // Otherwise the rounds that got squeezed out end up between two segments, and neither segment contains them anymore.
    if (earlier.length && seenTop) setEarlier(mergeFinished(earlier, seenTop));
  }
  const more = useMutation({
    mutationFn: ({ oldest }: { oldest: TaskRunPayload; shown: TaskRunPayload[] }) => fetchEarlier(oldest),
    onSuccess: (page, { shown }) => {
      setEarlier((current) => mergeFinished(current, shown, page.finished || []));
      setEarlierMore(Boolean(page.finished_has_more));
      setEarlierCounts((current) => ({ ...current, ...page.followup_counts }));
    },
  });
  const problem = tasks.error ? errorMessage(tasks.error) : '';
  // The first screen got no data at all: only this one line remains, and the empty three segments are not drawn.
  if (!data) return <Page><Note tone="error">{problem || 'Reading the task center failed'}</Note></Page>;

  const allFinished = mergeFinished(data.finished || [], earlier);
  const parents = data.working_parents || [];
  const allRuns = [...(data.running || []), ...(data.skipped || []), ...allFinished, ...parents];
  // A successor hangs under the card that dispatched it. When the parent job is not on this screen (already pruned) it still stands alone
  // -- If it cannot mount, it does not render, which makes a running task vanish into thin air.
  const byParent = groupFollowups(allRuns);
  const visible = new Set(allRuns.map((run) => run.id));
  const topLevel = (rows: TaskRunPayload[]) => rows.filter(
    (run) => !(run.followup_key && run.parent_run_id != null && visible.has(run.parent_run_id)));
  const settled = topLevel(allFinished);
  // The cursor takes the oldest top-level round: the server pages by top-level rows, and successors follow their parent task.
  const oldest = settled[settled.length - 1];
  const hasEarlier = Boolean(oldest) && (earlier.length ? earlierMore : Boolean(data.finished_has_more));
  const loadEarlier = () => {
    if (!more.isPending && oldest) more.mutate({ oldest, shown: allFinished });
  };
  const counts: FollowupCounts = { ...earlierCounts, ...data.followup_counts };
  const childrenOf = (runs: TaskRunPayload[]) => runs.flatMap((run) => byParent.get(run.id) || []);
  // A round that finished itself while its dispatched successors are still running counts as 'in progress': the whole job is not done yet, it goes under 'Recently finished'
  // Just one Done and one Running per card. The page only lists a portion of the successors, so check the count first.
  const working = [...settled, ...topLevel(parents)].filter((run) => followupTally(counts, [run]).active > 0
    || byParent.get(run.id)?.some(isActive)).sort((a, b) => b.id - a.id);
  const running = topLevel(data.running || []);
  const skipped = topLevel(data.skipped || []);
  // The same round does not appear twice under 'Recently finished': two rows on one screen telling one story reads like two runs.
  const finished = settled.filter((run) => !working.includes(run)
    && !skipped.some((row) => row.id === run.id));
  // The hourly scheduled check lists every item even when nothing happened, filling a page with the same "checked 83" line.
  // For a round that dispatched successors, it counts as routine only when every successor finished cleanly; one failure and it stands alone. The dispatch-only kind
  // (Auto-repair runs one batch per minute) Exception: several batches of the same thing still merge into one card, with the failure count written on it.
  const quietChildren = (run: TaskRunPayload) => {
    const children = byParent.get(run.id) || [];
    return children.every((row) => row.status === 'succeeded' && !hasResultProblems(row))
      && followupTally(counts, [run]).failed === 0;
  };
  const folds = foldRoutine(finished, (run) => isRoutine(run)
    && (quietChildren(run) || DISPATCHERS.has(run.task_key)));
  // 控制状态相同的几批合成一张，卡上的暂停、继续、取消对其中每一批都发一次；
  // 状态不同的（一批已暂停、一批在跑）分开摆，按钮才说得清作用在哪批上。
  const workingGroups = foldByKind(working, (run) => run.control?.state || '')
    .sort((left, right) => right.run.id - left.run.id);
  const newest = latestOfKind(allRuns);
  const quiet = !running.length && !working.length && !skipped.length && !finished.length;
  return (
    <Page>
      {problem ? <Note tone="error">{problem}</Note> : null}
      <TaskControlFeedback />
      {data.available === false
        ? <Note tone="warning">{data.message || 'The database has not set up the task records table yet'}</Note>
        : null}
      {/* Background service problems come first: they do not finish on their own and need a human to handle. */}
      <BackgroundIssues />
      {quiet
        ? <EmptyState icon={RiHistoryLine} title="No task records yet">
            Once scans, update checks, bulk actions, and command-line batches run, their progress and results show up here.
          </EmptyState>
        : <>
            <Section title="Running">
              {running.length || working.length
                ? <RunList live>
                    {running.map((run) => (
                      <RunningRun key={run.id} run={run} followups={byParent.get(run.id)} />))}
                    {workingGroups.map(({ run, runs }) => (
                      <WorkingRun key={run.id} runs={runs} followups={childrenOf(runs)} counts={counts} />))}
                  </RunList>
                : <Note tone="neutral">No tasks running.</Note>}
            </Section>
            {/* Only this section can answer "why did the last round not run": a scheduled trigger that lands on a running round skips silently,
                and without a record it looks on screen exactly like never having triggered. */}
            {skipped.length
              ? <Section title="Not executed this time">
                  <RunList>{skipped.map((run) => (
                    <SettledRun key={run.id} run={run} latest={newest.has(run.id)} followups={byParent.get(run.id)} />))}</RunList>
                </Section>
              : null}
            {finished.length || hasEarlier
              ? <Section title="Recently completed">
                  {finished.length
                    ? <RunList>{folds.map(({ run, runs }) => {
                        const tally = followupTally(counts, runs);
                        return <SettledRun key={run.id} run={run} runs={runs} latest={newest.has(run.id)}
                          followups={childrenOf(runs)} followupTotal={tally.total} followupFailed={tally.failed}
                          followupCancelled={tally.cancelled} />;
                      })}</RunList>
                    : null}
                  {more.error ? <Note tone="error">{errorMessage(more.error)}</Note> : null}
                  {hasEarlier
                    ? <Button variant="secondary" size="small" leadingIcon={RiArrowDownSLine}
                        className="self-start" {...busyProps(more.isPending)} onClick={loadEarlier}>
                        Load earlier
                      </Button>
                    : null}
                </Section>
              : null}
          </>}
      {/* Offline downloads run on the cloud drive's side, with their own table and their own polling; they are there even when the task center is empty. */}
      <DownloadsPanel />
    </Page>
  );
}
