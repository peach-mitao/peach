/* 活动页「云下载」段：粘贴磁力交给 115 或 PikPak 离线下载，下面是提交过的任务。
 *
 * 任务表是 `/api/downloads` 自己的一份，不并进 `/api/tasks`：离线任务跑在网盘那头，一跑
 * 几小时到几天，是一条带远端编号的提交记录，不是这台电脑上的一轮批处理。所以这一段自己取数、
 * 自己轮询：有任务还在远端跑或等着落盘时五秒一次，全是终态三十秒一次。后台的对账节律由
 * 服务端定（提交后约十秒查一次，之后退避），这里只是把它查到的结果读出来。
 *
 * 关注条目、想要清单与高清版目标页上的「云下载」键把番号、标题和来处交进来（`prefill`），用户只需要贴磁力。
 * 失败的任务给中文原因；失败、取消与停滞的可以重新提交，被判违规的不给（服务端也会拒）。
 * 每张卡都能复制磁力：接口失效时退回手动添加。 */
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Chip } from '@/components/base/badges/chip';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';
import { SettingsCard } from '@/components/application/settings/settings-rows';

import { apiGet, apiSend, errorMessage } from '../../api';
import type { DownloadProviderKey, DownloadsSnapshot, DownloadSubmitResult, DownloadTask } from '../bundle';
import { cardClass } from '../components/card';
import { Note } from '../components/note';
import { Progress } from '../components/progress';
import { ErrorText, FieldLabel, Footer, Help, Stack } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import { momentText } from './tasks';
import { ResourceSearch } from './resource-search';
import type { CloudDownloadPrefill } from '../router/shell-actions';

export const DOWNLOADS_URL = '/api/downloads';
export const DOWNLOADS_KEY = ['downloads'] as const;
const CANCEL_URL = '/api/downloads/cancel';

/** 作品页与关注条目带进来的上下文。`origin` 记在任务上，如 `asset:12`、`follow:34`。 */
export type DownloadPrefill = CloudDownloadPrefill;

export const downloadPollInterval = (data: DownloadsSnapshot | undefined) =>
  data?.tasks.some((task) => task.cancellable) ? 5_000 : 30_000;

const STATE_COLORS: Record<string, 'lime' | 'rose' | 'yellow'> = {
  ingested: 'lime', failed: 'rose', cancelled: 'yellow', stalled: 'yellow',
};

const OUTCOME_TEXT: Record<DownloadSubmitResult['outcome'], string> = {
  submitted: '已提交，远端开始下载后这里会显示进度。',
  adopted: '这个磁力已经有任务了，接着跟进那一条，没有重复提交。',
  adopted_remote: '远端已经有同一个任务，已接管，没有再扣配额。',
  refused: '这个资源被判为违规，不再提交。',
  failed: '提交没有成功。',
};

const taskName = (task: DownloadTask) =>
  task.title || task.display_name || task.remote_name || task.code || `磁力 ${task.info_hash?.slice(0, 8) ?? task.id}`;

const failureText = (task: DownloadTask) =>
  task.failure_label ? [task.failure_label, task.failure_detail].filter(Boolean).join('：') : '';

export function DownloadsPanel({ prefill }: { prefill?: DownloadPrefill }) {
  const query = useQuery({
    queryKey: DOWNLOADS_KEY,
    queryFn: ({ signal }) => apiGet<DownloadsSnapshot>(`${DOWNLOADS_URL}?limit=50`, signal),
    refetchInterval: (state) => downloadPollInterval(state.state.data),
  });
  const data = query.data;
  if (!data) {
    return query.error ? <Note tone="error">{errorMessage(query.error)}</Note> : null;
  }
  const configured = data.providers.filter((provider) => provider.configured);
  return (
    <>
      {query.error ? <Note tone="error">{errorMessage(query.error)}</Note> : null}
      {!data.available
        ? <Note tone="neutral">云下载只在账本写入端可用。</Note>
        : configured.length
          ? <SubmitForm snapshot={data} prefill={prefill} />
          : <Note tone="neutral">
              还没有配置云下载。在配置页「下载」分组填好 CloudDrive2 的地址与令牌，或登录 PikPak，
              这里就能粘贴磁力提交离线下载。
            </Note>}
      {data.tasks.length
        ? <ul aria-live="polite" className="flex min-w-0 flex-col gap-3">
            {data.tasks.map((task) => <TaskCard key={task.id} task={task} writable={data.available} />)}
          </ul>
        : null}
    </>
  );
}

function SubmitForm({ snapshot, prefill }: { snapshot: DownloadsSnapshot; prefill?: DownloadPrefill }) {
  const client = useQueryClient();
  const configured = snapshot.providers.filter((provider) => provider.configured);
  const [provider, setProvider] = useState<DownloadProviderKey>(configured[0]!.key);
  const [magnet, setMagnet] = useState('');
  const [code, setCode] = useState(prefill?.code ?? '');
  const [target, setTarget] = useState(configured[0]!.target);
  const [result, setResult] = useState<DownloadSubmitResult | null>(null);
  const action = useAction();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (prefill) input.current?.focus() }, [prefill]);
  const current = configured.find((row) => row.key === provider) ?? configured[0]!;

  const choose = (key: DownloadProviderKey) => {
    setProvider(key);
    setTarget(configured.find((row) => row.key === key)?.target ?? '');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { magnet, provider, target, code, title: prefill?.title, origin: prefill?.origin };
    setResult(null);
    void action.run('submit', (signal) => apiSend<DownloadSubmitResult>(DOWNLOADS_URL, body, 'POST', signal),
      (next) => {
        setResult(next);
        if (next.ok) setMagnet('');
        void client.invalidateQueries({ queryKey: DOWNLOADS_KEY });
      });
  };

  return (
    <form aria-label="提交磁力" noValidate onSubmit={submit}>
      <SettingsCard>
        <Stack>
          <ResourceSearch initialCode={prefill?.code ?? ''} reason={prefill?.searchReason} choose={(uri, selectedCode) => {
            setMagnet(uri); setCode(selectedCode); input.current?.focus();
          }} />
          {prefill?.title ? <Help>{`给「${prefill.title}」找来的资源，下载完由推送发现登记入库。`}</Help> : null}
          <Input ref={input} label="磁力链接" placeholder="magnet:?xt=urn:btih:…" autoComplete="off" maxLength={4000}
            value={magnet} onChange={setMagnet} />
          <div className="flex flex-col gap-1">
            <FieldLabel>下载到</FieldLabel>
            <Select aria-label="下载到" selectedKey={provider}
              onSelectionChange={(key) => { if (key !== null) choose(String(key) as DownloadProviderKey) }}>
              {configured.map((row) => <SelectItem key={row.key} id={row.key}>{row.label}</SelectItem>)}
            </Select>
          </div>
          <Input label="目标目录" placeholder={current.target || '/云下载'} autoComplete="off" maxLength={300}
            hint="留空就用配置页填的目标目录。" value={target} onChange={setTarget} />
          <Input label="番号" placeholder="可不填" autoComplete="off" maxLength={60} value={code} onChange={setCode} />
        </Stack>
        {result ? <Stack divided><SubmitReceipt result={result} /></Stack> : null}
        {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
        <Footer status={provider === '115' ? '115 每提交一次扣一条离线配额，重新提交也算。' : undefined}>
          <Button type="submit" disabled={!magnet.trim()} {...busyProps(action.busy === 'submit')}>提交离线下载</Button>
        </Footer>
      </SettingsCard>
    </form>
  );
}

function SubmitReceipt({ result }: { result: DownloadSubmitResult }) {
  const reason = failureText(result.task);
  const text = OUTCOME_TEXT[result.outcome];
  if (result.outcome === 'failed') return <ErrorText>{reason ? `${text}${reason}` : text}</ErrorText>;
  if (result.outcome === 'refused') return <ErrorText>{text}</ErrorText>;
  return <Help role="status">{text}</Help>;
}

function TaskCard({ task, writable }: { task: DownloadTask; writable: boolean }) {
  const client = useQueryClient();
  const action = useAction();
  const [copied, setCopied] = useState(false);
  const reason = failureText(task);
  const failed = task.state === 'failed';
  const meta = [task.provider_label, task.code, task.target, momentText(task.submitted_at)]
    .filter(Boolean).join(' · ');
  const refresh = () => { void client.invalidateQueries({ queryKey: DOWNLOADS_KEY }) };

  const cancel = () => {
    void action.run('cancel', (signal) => apiSend(CANCEL_URL, { id: task.id }, 'POST', signal), refresh);
  };
  const resubmit = () => {
    const body = { magnet: task.source_uri, provider: task.provider, target: task.target,
      code: task.code, title: task.title, origin: task.origin };
    void action.run('resubmit', (signal) => apiSend(DOWNLOADS_URL, body, 'POST', signal), refresh);
  };
  const copy = () => {
    void navigator.clipboard.writeText(task.source_uri).then(() => setCopied(true), () => setCopied(false));
  };

  return (
    <li data-download-state={task.state} data-download-id={task.id}
      className={cardClass({
        padding: 'none', bordered: 'line',
        className: failed ? 'flex flex-col border-border-error-default' : 'flex flex-col',
      })}>
      <div className="flex flex-col gap-1.5 px-5 pt-5 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <strong className="min-w-0 break-words text-title-1-medium text-text-primary">{taskName(task)}</strong>
          <Chip color={STATE_COLORS[task.state] ?? 'neutral'}>{task.state_label}</Chip>
        </div>
        <p className="min-w-0 break-words text-caption-1-regular text-text-secondary">{meta}</p>
        {task.state === 'remote_running' && task.progress != null
          ? <Progress label="远端下载进度" value={Math.round(task.progress * 100)} max={100} />
          : null}
        {task.ledger_path
          ? <p className="min-w-0 break-all text-caption-1-regular text-text-secondary">{task.ledger_path}</p>
          : null}
        {action.error ? <ErrorText>{action.error}</ErrorText> : null}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {writable && task.cancellable
            ? <Button variant="secondary" size="small" {...busyProps(action.busy === 'cancel')} onClick={cancel}>取消</Button>
            : null}
          {writable && task.resubmittable
            ? <Button variant="secondary" size="small" {...busyProps(action.busy === 'resubmit')} onClick={resubmit}>重新提交</Button>
            : null}
          <Button variant="ghost" size="small" onClick={copy}>{copied ? '已复制磁力' : '复制磁力'}</Button>
        </div>
      </div>
      {reason
        ? <div className="flex min-h-14 flex-col justify-center rounded-b-2xl border-t border-separator-border bg-card-footer px-5 py-3">
            <p className="text-caption-1-regular text-text-secondary">{reason}</p>
          </div>
        : null}
    </li>
  );
}
