/* The "Scan and collect" card on the data management page.
 *
 * The card describes what that button is doing right now (progress or waiting dots); results and failures describe the run's
 * outcome and hang outside the card, written the same way as the link management and resource sync blocks.
 *
 * 写操作是 `useMutation`：服务端回的就是这一趟的新快照，用 `setQueryData` 换进缓存，
 * 再让这个键立刻重读一次接上轮询的节律。首屏读到的旧终态不冒充新结果——任务关掉页面
 * 照样在跑，状态里常年躺着上一趟的回执，判据在 `use-library-processing.ts`。 */
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from '@remixicon/react';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';
import { Chip } from '@/components/base/badges/chip';

import { apiSend, errorMessage } from '../../api';
import { SCAN_CARD_TEXT } from '../../management';
import type { LibraryProcessingProps } from '../bundle';
import { Fieldset, FieldsetTitle } from '../components/fieldset';
import { IssueRow } from '../components/issue-row';
import { Note } from '../components/note';
import { StatusLabel } from '../components/status-label';
import { useOverlayScrollbar } from '../components/overlay-scrollbar';
import { PathLine } from '../components/path-line';
import { Disclosure } from '../settings/section';
import { queryClient } from '../query';
import {
  ALL_CONTENT_URL, busyText, DISCONNECTED_TEXT, issueDetails, LIBRARY_PROCESSING_KEY, LIBRARY_PROCESSING_URL, PARTIAL_RESULT_TEXT,
  notesLine, processingActive, processingHasPartialResult, remainingTime, slowItem, type LibraryProcessingCommand, type LibraryProcessingData,
} from './library-processing';
import { SlowItemNote } from './slow-item';
import { useLibraryProcessingJob } from './use-library-processing';
import { setProcessingNoticeVisible, useProcessingNoticeVisibility } from './processing-notice-visibility';
import { ProcessingActions } from './processing-actions';
import { ProcessingProgress } from './processing-line';
import { TrafficProgress } from './processing-traffic';
import { ProcessingControls } from './processing-controls';
import { downloadIssueList, exportProcessingIssues } from './issue-export';
import { busyProps, useAction } from '../settings/use-action';

/* Body text is kept in constants: text wrapped across JSX lines picks up an extra space at the seam, which shows in Chinese sentences.
   The card body and the first-screen skeleton share `SCAN_CARD_TEXT` (`management.ts`). */
const STALLED_TEXT = 'This one takes a while and has no fresh progress yet. After the task ends you can retry the unfinished parts.';
/* Filling in performer profiles is a step after database entry, and a run often has nothing to fill; in that case this line does not appear:
   with all four readouts at 0, a line like "0 aliases" leaves readers unable to tell whether there was nothing to fill or the step never ran. */
const profileText = (state: LibraryProcessingData) => {
  const aliases = state.performer_aliases || 0;
  const avatars = state.performer_avatars || 0;
  const conflicts = state.performer_profile_conflicts || 0;
  const failed = state.performer_profile_failed || 0;
  if (!aliases && !avatars && !conflicts && !failed) return '';
  const parts = [`Fill in performer profiles: ${aliases} aliases, ${avatars} avatars`];
  if (conflicts) parts.push(`${conflicts} ${conflicts === 1 ? 'profile shares a name and needs' : 'profiles share a name and need'} confirmation they are the same person`);
  if (failed) parts.push(`${failed} avatars could not be fetched`);
  return `${parts.join(', ')}.`;
};

const receiptText = (state: LibraryProcessingData) => {
  if (state.requested_stage === 'previews') return `Generated ${state.previews || 0} video previews.`;
  const profile = profileText(state);
  return `Scanned ${state.scanned || 0} files, identified ${state.identified || 0} codes, `
    + `fetched ${state.candidates || 0} sets of video details, auto-saved ${state.auto_applied || 0}.`
    + (state.previews ? ` Generated previews for ${state.previews} videos.` : '')
    + (profile ? ` ${profile}` : '');
};

/** The block outside the card: what happened in this run. Per-item details load on expand; the full list is in the log file the status names. */
function Outcome(
  { state, problem, settled, onRetry, toast }:
  {
    state: LibraryProcessingData; problem: string;
    settled: LibraryProcessingData | null; onRetry(): void; toast(message: string): void;
  },
) {
  const details = issueDetails(state);
  const exporter = useAction();
  const archive = useAction();
  /* 「已归档」那句只给刚点了归档的人看，带着撤销；刷新后服务端只剩 `archived`，整块都不再出现。 */
  const [archivedHere, setArchivedHere] = useState('');
  const active = processingActive(state);
  const retryable = state.status === 'failed' && !!state.retryable_asset_ids?.length;
  const notes = notesLine(state.notes || {});
  const failed = !!problem || (!state.archived && state.status === 'failed');
  const partial = !problem && !state.archived && processingHasPartialResult(state);
  /* 这一趟的问题收在同一块里：结论、「7 天内不再问」、清单、日志。分成几块同色的提示，
     读的人分不清哪句跟着哪个按钮。 */
  const issues = failed || (!state.archived && !active && (!!notes || !!state.issue_count));
  const archivable = !active && !!state.job_id && !state.archived;
  const log = state.issues_log || '';
  const slow = slowItem(state);
  /* The manifest is the only self-scrolling block on this page, so its native scrollbar is just a plain system-gray column. */
  const list = useOverlayScrollbar<HTMLUListElement>();
  const setArchived = (archived: boolean) => void archive.run(archived ? 'archive' : 'unarchive',
    signal => apiSend<LibraryProcessingData>(LIBRARY_PROCESSING_URL,
      { action: archived ? 'archive' : 'unarchive', job_id: state.job_id }, 'POST', signal),
    next => {
      queryClient.setQueryData(LIBRARY_PROCESSING_KEY, next);
      setArchivedHere(archived ? state.job_id! : '');
    });
  const exportButton = state.issue_count && !active
    ? <Button variant="secondary" size="small" {...busyProps(!!exporter.busy)} onClick={() => void exporter.run('export',
        signal => exportProcessingIssues(state, signal), contents => {
          downloadIssueList(state.job_id!, contents); toast('已导出问题清单');
        })}>导出完整问题清单</Button>
    : null;
  const body = failed
    ? [problem || state.error || '处理未完成，请重试', partial ? PARTIAL_RESULT_TEXT : '', notes].filter(Boolean).join('\n')
    : notes || `这一趟有 ${(state.issue_count || 0).toLocaleString()} 项问题。`;
  return (
    /* Collapse the whole block when empty: the `aria-live` container would otherwise leave an empty track and add a phantom gap under the card. */
    <div aria-live="polite" className="flex flex-col gap-4 empty:hidden">
      {slow
        ? <SlowItemNote state={state} slow={slow} />
        : state.status === 'running' && state.stalled
        ? <Note tone="warning" title="Processing slowly">{STALLED_TEXT}</Note>
        : null}
      {settled?.status === 'complete'
        ? <Note tone="success" title="处理完成">{receiptText(settled)}</Note>
        : null}
      {/* 取消不止是眼前点的那一下：命令行、任务中心取消的、重开页面才读到的，都留这一句。 */}
      {(settled ?? state).status === 'cancelled' && !state.archived ? <Note tone="neutral" title="已取消上次任务">
        已取得的资料和预览已保留，这一轮不会自动继续，需要时重新同步。
      </Note> : null}
      {issues
        ? <Note tone={!failed ? 'neutral' : partial ? 'warning' : 'error'} className="gap-0 p-3"
            title={!failed ? undefined : partial ? '处理已结束，部分项目需处理' : '处理未完成'}
            action={<div className="flex flex-wrap items-center gap-2">
              {partial ? <LinkButton href={ALL_CONTENT_URL} size="small" trailingIcon={RiArrowRightLine}>查看全部内容</LinkButton> : null}
              {retryable ? <Button variant="secondary" size="small" aria-label="立即重试未完成项" onClick={onRetry}>立即重试</Button> : null}
              {archivable ? <Button variant="secondary" size="small" aria-label="归档提示" {...busyProps(!!archive.busy)}
                onClick={() => setArchived(true)}>归档</Button> : null}
            </div>}
            extra={<>
              {/* 三层东西叠在同一块提示里：一句结论、一份清单、一条日志地址。各自之间
                  横一条自己颜色的发丝线，读的人才看得出哪一段结束了——只靠间距的话，
                  几十条同样长短的明细会连成一片。 */}
              {details ? <div className="-mx-3 mt-3 border-t border-current/20 px-3 pt-3">
                  <Disclosure summary={details.label} contentClassName="gap-0">
                    {/* 轨道是滚动容器的兄弟，得有一层只裹着清单的定位祖先给它落脚。 */}
                    <div className="relative -mr-3">
                      <ul ref={list} className="max-h-96 overflow-y-auto">
                        {details.items.map((item) => (
                          <IssueRow key={item.key} title={item.label} href={item.href}>
                            <span className="text-caption-1-regular">{item.note}</span>
                            {item.hint ? <code className="text-caption-1-regular break-all">{item.hint}</code> : null}
                          </IssueRow>
                        ))}
                      </ul>
                    </div>
                  </Disclosure>
                </div> : null}
              {/* 日志地址与分隔线使用次级文字色；导出读的是同一份记录，排在打开位置旁边。 */}
              {log ? <div className="-mx-3 mt-3 border-t border-current/20 px-3 pt-3 text-text-secondary">
                  <PathLine path={log} prefix="完整记录：" className="text-caption-1-regular"
                    action={exportButton} onRevealed={toast} />
                </div>
              : exportButton ? <div className="-mx-3 mt-3 flex justify-end border-t border-current/20 px-3 pt-3">{exportButton}</div>
              : null}
            </>}>
            {body}
          </Note>
        : null}
      {state.archived && archivedHere === state.job_id && !problem
        ? <Note tone="neutral" action={<Button variant="secondary" size="small" {...busyProps(!!archive.busy)}
              onClick={() => setArchived(false)}>撤销</Button>}>
            已归档上一趟的问题提示，完整记录仍保留。
          </Note>
        : null}
      {exporter.error || archive.error ? <Note tone="warning">{exporter.error || archive.error}</Note> : null}
    </div>
  );
}

export function LibraryProcessingCard(props: LibraryProcessingProps) {
  const { toast, onComplete } = props;
  const { job, settled, forget } = useLibraryProcessingJob(props);
  const start = useMutation({
    mutationFn: (command: LibraryProcessingCommand) =>
      apiSend<LibraryProcessingData>(LIBRARY_PROCESSING_URL, command),
    onSuccess: (next) => {
      forget();
      // The response is this round's fresh snapshot, just swap it into the cache; the cadence belongs to this key, so have it refetch once immediately to catch up.
      queryClient.setQueryData(LIBRARY_PROCESSING_KEY, next);
      void queryClient.invalidateQueries({ queryKey: LIBRARY_PROCESSING_KEY });
    },
  });
  // When this run finishes, have the legacy layer repaint the data management page counters: the review and candidate readings change with it.
  useEffect(() => { if (settled) onComplete?.() }, [settled, onComplete]);

  const state = job.data ?? { status: 'idle' };
  const noticeKey = state.job_id || 'unavailable';
  const { hidden } = useProcessingNoticeVisibility(noticeKey);
  const problem = start.error ? errorMessage(start.error)
    : job.isError ? (job.data ? DISCONNECTED_TEXT : errorMessage(job.error))
    : '';
  const busy = start.isPending || processingActive(state);

  const run = async (command: LibraryProcessingCommand) => {
    if (busy) return;
    start.reset();
    await start.mutateAsync(command);
  };
  const retry = () => {
    if (!state.job_id || !state.retryable_asset_ids?.length) return;
    void run({ job_id: state.job_id, retry: state.retryable_asset_ids }).catch(() => {});
  };

  return (
    <div className="flex flex-col gap-4">
      <Fieldset layout="stack" label="Scan and scrape" footer={
        <>
          <LinkButton href="/sources" size="small" trailingIcon={RiArrowRightLine}>Sources and credentials</LinkButton>
          <LinkButton href="/settings/diagnostics" size="small" trailingIcon={RiArrowRightLine}>Diagnostics and logs</LinkButton>
          {state.candidates
            ? <LinkButton href="/review" size="small" trailingIcon={RiArrowRightLine}>Review details</LinkButton>
            : null}
          {/* 日常同步保留独立入口，原任务的定向重试只处理该任务的失败项。 */}
          <ProcessingActions scan busy={start.isPending} occupied={processingActive(state)} metadataOnly={state?.metadata_only}
            speedMode={state.speed_mode} pendingCount={state.new_asset_count} onRun={run} onOccupied={() => toast(busyText(state))} />
        </>
      }>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <FieldsetTitle>Scan and collect</FieldsetTitle>
              {state.new_asset_count ? <Chip variant="caption" color="blue">
                <span className="tabular-nums">{state.new_asset_count.toLocaleString()} videos to complete</span>
              </Chip> : null}
            </div>
            {hidden && (processingActive(state) || state.status === 'failed' || job.isError)
              ? <Button variant="secondary" size="small" onClick={() => setProcessingNoticeVisible(noticeKey, true)}>
                  Show progress window
                </Button> : null}
          </div>
          <p className="text-body-2-regular text-text-secondary">{SCAN_CARD_TEXT}</p>
          {state.status === 'paused' && !state.total
            ? <span className="self-start"><StatusLabel>Paused</StatusLabel></span>
            : processingActive(state)
            ? <ProcessingProgress state={state} />
            : null}
          {processingActive(state) ? <p className="text-body-2-regular text-text-secondary tabular-nums" data-processing-eta="">
            {remainingTime(state)}
          </p> : null}
          {processingActive(state) ? <TrafficProgress traffic={state.traffic} /> : null}
          {processingActive(state) ? <ProcessingControls state={state} /> : null}
        </div>
      </Fieldset>
      <Outcome state={state} problem={problem} settled={settled} onRetry={retry} toast={toast} />
    </div>
  );
}
