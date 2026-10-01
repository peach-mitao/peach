/* 关注管理页的「想要」页签：上面一张按番号添加的填充卡，下面按四段列出全部想要（待办第 40 条）。
 *
 * 想要从三处来：Feed 新作卡上的「想要」、关注详情上的「想要」、这里直接输入的库外番号。Peach
 * 没有库外作品的详情页，这张卡就是库外番号的入口。四段是待找、未发售、暂时放弃、已入库：未发售
 * 按发行日现算，到了发售日自己回到待找；文件扫进库或关注条目保存进账本时自动挪到已入库。
 *
 * 版式与同页其余页签一致：分组靠标题，行与行之间只用一条发丝线，不各自套框。条间线写在每一行
 * 自己身上（`border-t`），岛里 `divide-*` 压不过 `@scope` 末尾的边框清零。 */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiStarLine } from '@remixicon/react';

import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';

import { errorMessage } from '../../api';
import { cardClass } from '../components/card';
import { EmptyState } from '../components/empty-state';
import { Note } from '../components/note';
import { ExternalLink, Help } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import {
  addWant, fetchWants, invalidateWants, PHASES, removeWants, resetWants, searchNote, wantName,
  WANTS_KEY, type Want,
} from './wants';

const ORIGINS: Record<Want['origin'], string> = { code: '手动添加', feed: 'Feed 新作', follow: '关注' };

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

function WantRow({ want, first, readOnly, busy, onReset, onRemove }: {
  want: Want; first: boolean; readOnly: boolean; busy: string;
  onReset(): void; onRemove(): void;
}) {
  return (
    <li data-want-id={want.id}
      className={`flex min-w-0 items-start gap-4 py-4 max-sm:gap-3 ${first ? '' : 'border-t border-separator-border'}`}>
      <Cover want={want} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-2">
          <b className="text-headline-medium text-text-primary">{wantName(want)}</b>
          {want.code && want.title ? (
            <span className="min-w-0 truncate text-body-2-regular text-text-secondary">{want.title}</span>
          ) : null}
        </p>
        {facts(want) ? <p className="text-body-2-regular text-text-secondary">{facts(want)}</p> : null}
        <p data-want-note="" className="text-caption-1-regular text-text-secondary">
          {searchNote(want)}
          {want.scrape_error ? `；资料没取到：${want.scrape_error}` : ''}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {want.link ? <ExternalLink href={want.link}>来源页</ExternalLink> : null}
          {want.phase === 'given_up' ? (
            <Button variant="secondary" size="small" disabled={readOnly} {...busyProps(busy === `reset:${want.id}`)}
              onClick={onReset}>重新查找</Button>
          ) : null}
          <Button variant="secondary" size="small" disabled={readOnly} {...busyProps(busy === `remove:${want.id}`)}
            onClick={onRemove}>移除</Button>
        </div>
      </div>
    </li>
  );
}

export interface WantListProps {
  readOnly: boolean;
  toast(message: string): void;
}

export function WantList({ readOnly, toast }: WantListProps) {
  const [code, setCode] = useState('');
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

      {data && !items.length ? (
        <EmptyState shell="plain" icon={RiStarLine} title="还没有想要的作品">
          在上面输入番号，或在 Feed 新作卡、关注详情上点「想要」。
        </EmptyState>
      ) : null}

      {PHASES.map(([phase, label]) => {
        const rows = items.filter((want) => want.phase === phase);
        if (!rows.length) return null;
        return (
          <section key={phase} aria-label={label} data-want-phase={phase} className="flex flex-col gap-1">
            <h3 className="flex items-baseline gap-2 text-title-2-medium text-text-primary">
              {label}
              <span className="text-body-2-regular tabular-nums text-text-secondary">{rows.length}</span>
            </h3>
            <ul className="flex flex-col">
              {rows.map((want, at) => (
                <WantRow key={want.id} want={want} first={at === 0} readOnly={readOnly} busy={action.busy}
                  onReset={() => reset(want)} onRemove={() => remove(want)} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
