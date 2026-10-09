/* 云下载弹层：在点它的那一页原地打开，搜索索引器或贴磁力，交给 115 或 PikPak 离线下载。
 *
 * 入口有两处：JAV 入库页（每条作品与页上那一颗）、高清版目标卡，都带得出番号。它们把番号、
 * 标题和来处（`prefill`）交进来，提交时一并记在任务上；提交过的任务在活动页「云下载」段看。
 *
 * 下载配置（`/api/downloads`）在弹层打开时才取，和活动页、入库页读同一个缓存键。 */
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heading } from 'react-aria-components';

import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';

import { apiGet, apiSend, errorMessage } from '../../api';
import type { DownloadProviderKey, DownloadsSnapshot, DownloadSubmitResult } from '../bundle';
import { ModalFrame } from '../components/modal-frame';
import { Note } from '../components/note';
import { ErrorText, FieldLabel, Help } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import { DOWNLOADS_KEY, DOWNLOADS_URL, downloadPollInterval, failureText } from './downloads-panel';
import { ResourceSearch } from './resource-search';

/** 入口带进来的上下文。`origin` 记在任务上，如 `asset:12`、`wishlist:5`。 */
export interface DownloadPrefill { code?: string; title?: string; origin?: string; searchReason?: string }

const RECEIPTS: Partial<Record<DownloadSubmitResult['outcome'], string>> = {
  submitted: '已提交离线下载，进度在活动页',
  adopted: '这个磁力已有任务，没有重复提交',
  adopted_remote: '远端已有同一任务，已接管',
};

export function CloudDownloadDialog({ prefill, close, receipt, provider }: {
  /** 空就是关着；不带番号与标题的空对象是「随手贴一条磁力」。 */
  prefill: DownloadPrefill | null;
  close(): void;
  receipt(message: string): void;
  /** 打开时先选中的下载方式，入库页把页上那一份交进来。 */
  provider?: string;
}) {
  return (
    <ModalFrame isOpen={Boolean(prefill)} onOpenChange={(open) => { if (!open) close() }} width="form">
      {prefill ? <Body prefill={prefill} close={close} receipt={receipt} provider={provider} /> : null}
    </ModalFrame>
  );
}

function Body({ prefill, close, receipt, provider }: {
  prefill: DownloadPrefill; close(): void; receipt(message: string): void; provider?: string;
}) {
  const query = useQuery({
    queryKey: DOWNLOADS_KEY,
    queryFn: ({ signal }) => apiGet<DownloadsSnapshot>(`${DOWNLOADS_URL}?limit=50`, signal),
    refetchInterval: (state) => downloadPollInterval(state.state.data),
  });
  const data = query.data;
  const configured = data?.providers.filter((row) => row.configured) ?? [];
  const subject = [prefill.code, prefill.title].filter(Boolean).join(' ');
  const header = (
    <div className="flex flex-col gap-1 px-5 pt-5">
      <Heading slot="title" className="text-title-2-semibold text-text-primary">云下载</Heading>
      {subject ? <p className="min-w-0 truncate text-body-2-regular text-text-secondary">{subject}</p> : null}
    </div>
  );
  if (data?.available && configured.length) {
    return <SubmitForm header={header} snapshot={data} prefill={prefill} close={close} receipt={receipt} provider={provider} />;
  }
  return (
    <div className="flex min-h-0 flex-col">
      {header}
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5">
        {query.error ? <Note tone="error">{errorMessage(query.error)}</Note> : null}
        {data && !data.available ? <Note tone="neutral">云下载只在账本写入端可用。</Note> : null}
        {data?.available && !configured.length
          ? <Note tone="neutral">先在配置页「下载」分组登录 PikPak，或填好 CloudDrive2 的地址与令牌。</Note>
          : null}
      </div>
      <div className="flex justify-end p-3">
        <Button variant="secondary" onClick={close}>关闭</Button>
      </div>
    </div>
  );
}

function SubmitForm({ header, snapshot, prefill, close, receipt, provider: preferred }: {
  header: ReactNode; snapshot: DownloadsSnapshot; prefill: DownloadPrefill;
  close(): void; receipt(message: string): void; provider?: string;
}) {
  const client = useQueryClient();
  const configured = snapshot.providers.filter((row) => row.configured);
  const first = configured.find((row) => row.key === preferred) ?? configured[0]!;
  const [provider, setProvider] = useState<DownloadProviderKey>(first.key);
  const [magnet, setMagnet] = useState('');
  const [code, setCode] = useState(prefill.code ?? '');
  const [target, setTarget] = useState(first.target);
  const [failure, setFailure] = useState('');
  const action = useAction();
  const input = useRef<HTMLInputElement>(null);

  const choose = (key: DownloadProviderKey) => {
    setProvider(key);
    setTarget(configured.find((row) => row.key === key)?.target ?? '');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!magnet.trim()) return;
    const body = { magnet, provider, target, code, title: prefill.title, origin: prefill.origin };
    setFailure('');
    void action.run('submit', (signal) => apiSend<DownloadSubmitResult>(DOWNLOADS_URL, body, 'POST', signal),
      (next) => {
        void client.invalidateQueries({ queryKey: DOWNLOADS_KEY });
        const text = RECEIPTS[next.outcome];
        if (next.ok && text) { receipt(text); close(); return }
        const reason = failureText(next.task);
        setFailure(next.outcome === 'refused' ? '这个资源被判为违规，不再提交。'
          : reason ? `提交没有成功：${reason}` : '提交没有成功。');
      });
  };

  return (
    <form aria-label="提交磁力" noValidate onSubmit={submit} className="flex min-h-0 flex-col">
      {header}
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-5">
        <ResourceSearch initialCode={prefill.code ?? ''} reason={prefill.searchReason} choose={(uri, selectedCode) => {
          setMagnet(uri); setCode(selectedCode); input.current?.focus();
        }} />
        <Input ref={input} label="磁力链接" placeholder="magnet:?xt=urn:btih:…" autoComplete="off" maxLength={4000}
          value={magnet} onChange={setMagnet} />
        <div className="flex flex-col gap-1">
          <FieldLabel>下载到</FieldLabel>
          <Select aria-label="下载到" selectedKey={provider}
            onSelectionChange={(key) => { if (key !== null) choose(String(key) as DownloadProviderKey) }}>
            {configured.map((row) => <SelectItem key={row.key} id={row.key}>{row.label}</SelectItem>)}
          </Select>
          {provider === '115' ? <Help>每提交一次扣一条离线配额，重新提交也算。</Help> : null}
        </div>
        <Input label="目标目录" placeholder="/云下载" autoComplete="off" maxLength={300}
          value={target} onChange={setTarget} />
        {/* 带着番号进来时它和搜索框是同一个值，选中候选也会跟着换，不再单列一格。 */}
        {prefill.code ? null
          : <Input label="番号" placeholder="可不填" autoComplete="off" maxLength={60} value={code} onChange={setCode} />}
        {failure || action.error ? <ErrorText>{failure || action.error}</ErrorText> : null}
      </div>
      <div className="flex justify-between gap-4 p-3">
        <Button variant="secondary" onClick={close}>取消</Button>
        <Button type="submit" disabled={!magnet.trim()} {...busyProps(action.busy === 'submit')}>提交离线下载</Button>
      </div>
    </form>
  );
}
