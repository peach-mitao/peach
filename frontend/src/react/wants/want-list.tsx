/* JAV 入库：按状态分组的作品卡，卡片下方查询磁链并提交云下载。
 *
 * 卡片下方的候选来自 JavDB；「搜索资源」打开云下载弹层，查自配索引器或贴磁力。页上那颗
 * 「提交磁力」是不挂在任何作品上的同一个弹层。 */
import { useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiStarLine, RiExternalLinkLine, RiDeleteBinLine } from '@remixicon/react';

import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';

import { apiGet, errorMessage } from '../../api';
import type { DownloadsSnapshot } from '../bundle';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { DOWNLOADS_KEY, DOWNLOADS_URL } from '../activity/downloads-panel';
import { cardClass } from '../components/card';
import { EmptyState } from '../components/empty-state';
import { Note } from '../components/note';
import { Pagination } from '../follow-manage/source-list';
import { pageWindow } from '../follow-manage/follow-manage';
import { ErrorLine } from '../follow-manage/source-view';
import { Help } from '../settings/section';
import { WantMagnets } from './want-magnets';
import { busyProps, useAction } from '../settings/use-action';
import {
  addWant, fetchWants, invalidateWants, PHASES, removeWants, resetWants, searchNote, wantName,
  WANTS_KEY, type Want,
} from './wants';

const ORIGINS: Record<Want['origin'], string> = { code: '手动添加', feed: 'Feed 新作', follow: '关注' };
/** 每一段一页摆多少张：一张卡二十来个节点，上千条一次摆开就是十几万像素高的一页。 */
export const WANT_PAGE_SIZE = 20;

/** 资料那一行：发行日、厂牌、女优、从哪儿加进来的。 */
const facts = (want: Want) => [want.release_date, want.studio, want.performers, ORIGINS[want.origin]]
  .filter(Boolean).join(' · ');

function Cover({ want }: { want: Want }) {
  return (
    <span className="relative inline-grid w-card-cover shrink-0 aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default max-sm:w-24">
      <span className="text-caption-1-regular text-text-secondary">无封面</span>
      {want.cover ? (
        <img src={want.cover} alt="" loading="lazy" referrerPolicy={want.remote_cover ? 'no-referrer' : undefined}
          onError={(event) => event.currentTarget.remove()} className="absolute inset-0 size-full object-cover" />
      ) : null}
    </span>
  );
}

function WantRow({ want, readOnly, busy, onReset, onRemove, onCloudDownload, downloads, provider, toast }: {
  want: Want; readOnly: boolean; busy: string; downloads?: DownloadsSnapshot; provider: string; toast(message: string): void;
  onReset(): void; onRemove(): void; onCloudDownload(): void;
}) {
  const [resolvedSource, setResolvedSource] = useState('');
  const source = want.link || resolvedSource || (want.code ? `https://javdb.com/search?q=${encodeURIComponent(want.code)}&f=all` : '');
  return (
    <li data-want-id={want.id}
      className={cardClass({ bordered: 'soft', className: 'flex flex-col gap-4 max-sm:p-4' })}>
      <div className="flex min-w-0 items-start gap-4 max-sm:gap-3">
      <Cover want={want} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2">
          <b className="min-w-0 text-headline-medium wrap-anywhere text-text-primary">{wantName(want)}</b>
          {want.code && want.title ? (
            <span className="min-w-0 truncate text-body-2-regular text-text-secondary">{want.title}</span>
          ) : null}
        </p>
        {facts(want) ? <p className="text-body-2-regular text-text-secondary">{facts(want)}</p> : null}
        {!want.code || want.phase === 'unreleased' || want.phase === 'acquired' ?
          <p data-want-note="" className="text-caption-1-regular text-text-secondary">{searchNote(want)}</p> : null}
        {want.scrape_error ? <ErrorLine text={want.scrape_error} prefix="资料未取得：" tone="muted" /> : null}
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {source ? <ButtonLink data-button-link="" variant="secondary" size="small" trailingIcon={RiExternalLinkLine} href={source} target="_blank" rel="noopener noreferrer">来源页</ButtonLink> : null}
          {/* 还在找的两段才给云下载：未发售的没有资源可下，已入库的已经到手。 */}
          {want.phase === 'searching' || want.phase === 'given_up' ? (
            <Button variant="secondary" size="small" disabled={readOnly} onClick={onCloudDownload}>搜索资源</Button>
          ) : null}
          {want.phase === 'given_up' ? (
            <Button variant="secondary" size="small" disabled={readOnly} {...busyProps(busy === `reset:${want.id}`)}
              onClick={onReset}>重新查找</Button>
          ) : null}
          <Button variant="secondary" size="small" leadingIcon={RiDeleteBinLine} disabled={readOnly} {...busyProps(busy === `remove:${want.id}`)}
            onClick={onRemove}>移除</Button>
        </div>
      </div>
      </div>
      {want.code && (want.phase === 'searching' || want.phase === 'given_up')
        ? <WantMagnets want={want} readOnly={readOnly} downloads={downloads} provider={provider} toast={toast} onSource={setResolvedSource} /> : null}
    </li>
  );
}

/** 一段（待找、未发售……）：标题带这一段的总数，多于一页时分页，页码各段各记各的。 */
function WantPhase({ phase, label, rows, row }: {
  phase: string; label: string; rows: Want[]; row(want: Want): ReactNode;
}) {
  const [page, setPage] = useState(1);
  const win = pageWindow(rows.length, WANT_PAGE_SIZE, page);
  return (
    <section aria-label={label} data-want-phase={phase} className="flex flex-col gap-4">
      <h3 className="flex items-baseline gap-2 text-title-2-medium text-text-primary">
        {label}
        <span className="text-body-2-regular tabular-nums text-text-secondary">{rows.length.toLocaleString()}</span>
      </h3>
      <ul className="flex flex-col gap-4">{rows.slice(win.start, win.end).map(row)}</ul>
      {win.pages > 1 ? (
        <div data-want-pager="" className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-body-2-regular tabular-nums text-text-secondary">
            {`${(win.start + 1).toLocaleString()}–${win.end.toLocaleString()} / ${win.total.toLocaleString()} 条`}
          </span>
          <Pagination label={`${label}分页`} page={win.page} pages={win.pages} onPage={setPage} />
        </div>
      ) : null}
    </section>
  );
}

export interface WantListProps {
  readOnly: boolean;
  toast(message: string): void;
}

export function WantList({ readOnly, toast }: WantListProps) {
  const [code, setCode] = useState('');
  const [download, setDownload] = useState<DownloadPrefill | null>(null);
  const [provider, setProvider] = useState('');
  const action = useAction();
  const wants = useQuery({
    queryKey: WANTS_KEY, queryFn: ({ signal }) => fetchWants(signal),
    // 刚登记的那几条还在取资料：跑着就隔几秒再读一次，取完了就停。
    refetchInterval: (query) => (query.state.data?.scraping ? 3000 : false),
  });

  const add = () => {
    const text = code.trim();
    if (!text || readOnly) return;
    void action.run('add', (signal) => addWant({ code: text }, signal), (done) => {
      toast(done.created ? `已加入想要：${wantName(done.want)}` : `${wantName(done.want)} 已经在想要里`);
      setCode('');
      void invalidateWants();
    });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) { event.preventDefault(); add() }
  };
  const remove = (want: Want) => {
    void action.run(`remove:${want.id}`, (signal) => removeWants([want.id], signal), () => {
      toast(`已移除：${wantName(want)}`);
      void invalidateWants();
    });
  };
  const reset = (want: Want) => {
    void action.run(`reset:${want.id}`, (signal) => resetWants([want.id], signal), () => {
      toast(`${wantName(want)} 回到待找`);
      void invalidateWants();
    });
  };

  const data = wants.data;
  const items = data?.items || [];
  const downloads = useQuery({
    queryKey: DOWNLOADS_KEY,
    queryFn: ({ signal }) => apiGet<DownloadsSnapshot>(`${DOWNLOADS_URL}?limit=100`, signal),
    enabled: items.some((want) => want.code && (want.phase === 'searching' || want.phase === 'given_up')),
  });
  const configured = downloads.data?.providers.filter((row) => row.configured) || [];
  const selected = configured.find((row) => row.key === provider)?.key || configured[0]?.key || '';
  return (
    <div className="flex flex-col gap-8">
      <div className={cardClass({ padding: 'none', className: 'flex flex-col gap-4 px-6 py-5 max-sm:px-4' })}>
        <h3 className="text-title-2-medium text-text-primary">按番号添加</h3>
        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-64 grow max-sm:min-w-0">
            <Input aria-label="番号" placeholder="输入番号，例如 SSIS-950" value={code}
              isDisabled={readOnly} onChange={setCode} onKeyDown={onKeyDown} />
          </div>
          <Button variant="primary" disabled={readOnly || !code.trim()} {...busyProps(action.busy === 'add')}
            onClick={add}>添加</Button>
        </div>
        <Help>Feed 新作卡和关注详情上点「想要」也会加到这里。文件扫进库后自动挪到「已入库」。</Help>
        {action.error ? <Note tone="error" title="这一次没有完成">{action.error}</Note> : null}
      </div>

      {wants.error ? <Note tone="error" title="想要清单读取失败">{errorMessage(wants.error)}</Note> : null}
      {data?.scraping ? <Help role="status">正在给刚加入的番号取资料与封面。</Help> : null}
      {configured.length ? <div className="flex flex-col gap-2">
        <p className="text-body-medium text-text-primary">下载到</p>
        <div className="flex flex-wrap items-center gap-2">
          <Select aria-label="下载到" selectedKey={selected} onSelectionChange={(key) => setProvider(String(key))}>
            {configured.map((row) => <SelectItem key={row.key} id={row.key}>{row.label}</SelectItem>)}
          </Select>
          <Button variant="secondary" disabled={readOnly} onClick={() => setDownload({})}>提交磁力</Button>
        </div>
        <Help>{configured.find((row) => row.key === selected)?.target || '使用已配置的目标目录'}</Help>
      </div> : null}
      {downloads.error ? <Note tone="error" title="下载配置未取得">{errorMessage(downloads.error)}</Note> : null}
      {downloads.data && !configured.length ? <Note tone="neutral">先在配置页「下载」分组登录 PikPak，或填好 CloudDrive2 的地址与令牌。</Note> : null}
      {downloads.data && !downloads.data.available ? <Note tone="neutral">云下载只在账本写入端可用。</Note> : null}

      {data && !items.length ? (
        <EmptyState shell="plain" icon={RiStarLine} title="还没有想要的作品">
          在上面输入番号，或在 Feed 新作卡、关注详情上点「想要」。
        </EmptyState>
      ) : null}

      {PHASES.map(([phase, label]) => {
        const rows = items.filter((want) => want.phase === phase);
        if (!rows.length) return null;
        return (
          <WantPhase key={phase} phase={phase} label={label} rows={rows} row={(want) => (
            <WantRow key={want.id} want={want} readOnly={readOnly} busy={action.busy}
              downloads={downloads.data} provider={selected} toast={toast}
              onReset={() => reset(want)} onRemove={() => remove(want)}
              onCloudDownload={() => setDownload({
                code: want.code || '', title: want.title || '', origin: `wishlist:${want.id}`,
              })} />
          )} />
        );
      })}
      <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={toast} provider={selected} />
    </div>
  );
}
