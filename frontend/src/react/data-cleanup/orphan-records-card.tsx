/* 数据管理页上的「孤儿记录」：文件已不在盘上、带着个人记录的作品（ADR-0087）。
 *
 * 每行一条已消失的作品：快照图供认片，后面是它带的记录、在库里可能是它新版本的文件。
 * 选一个文件接过去，记录搬到那个文件上、旧行删掉，整批可按批次号撤回；彻底删除连记录一起
 * 删，过危险档确认弹层。没有已消失的作品时整块不出现。 */
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { confirmModal } from '@peach/legacy/ui';
import { LOC } from '@peach/legacy/core';

import { Button } from '@/components/base/buttons/button';
import { Select, SelectItem } from '@/components/base/select/select';
import {
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
} from '@/components/base/table/table';

import { errorMessage } from '../../api';
import { DataTableFrame } from '../components/data-table-frame';
import { Fieldset, FieldsetTitle, SectionHeading } from '../components/fieldset';
import { Note } from '../components/note';
import { spriteGlyph } from '../components/sprite-glyph';
import { queryClient } from '../query';
import { busyProps } from '../settings/use-action';
import {
  attachOrphan, candidateText, fetchOrphanRecords, ORPHAN_RECORDS_KEY, purgeOrphan, recordsText,
  type OrphanRecord,
} from './orphan-records';

const PLAY = spriteGlyph('play');

const refresh = () => queryClient.invalidateQueries({ queryKey: ORPHAN_RECORDS_KEY, exact: true });

function OrphanRow({ item, toast }: { item: OrphanRecord; toast(message: string): void }) {
  const [target, setTarget] = useState<number | null>(item.candidates[0]?.id ?? null);
  const attach = useMutation({
    mutationFn: () => attachOrphan(item.id, Number(target)),
    onSuccess: (data) => { toast(`记录已接到新文件，批次 ${data.batch}`); void refresh(); },
    onError: (error) => toast(errorMessage(error)),
  });
  const purge = useMutation({
    mutationFn: () => purgeOrphan(item.id),
    onSuccess: (data) => {
      toast(data.blocked.length
        ? `${item.name} 的文件又回到盘上，没有删除；下一次扫描会把它接回在库`
        : `已彻底删除 ${item.name}`);
      void refresh();
    },
  });
  const remove = () => {
    void confirmModal({
      title: '彻底删除',
      body: `将删除「${item.name}」这一条和它带的记录（${recordsText(item.records)}）。此操作不可撤销。`,
      confirmLabel: '彻底删除',
      danger: true,
      onConfirm: () => purge.mutateAsync(),
    });
  };
  const busy = attach.isPending || purge.isPending;
  return (
    <TableRow id={item.id}>
      <TableCell>
        <span className="flex min-w-0 items-center gap-3">
          {/* 快照图供认片；没有图或取不到时留一格带描边的占位，和重复文件页的封面格同一个样子。
              窄屏收起，把宽度让给名字与记录。 */}
          <span className="relative inline-grid aspect-16/10 w-24 flex-none place-items-center max-cleanup-tight:hidden overflow-hidden rounded-lg border border-separator-border bg-background-tertiary-default text-text-tertiary">
            <PLAY aria-hidden className="size-5" />
            {item.has_thumb
              ? <img src={`/thumb?id=${item.id}&c=4`} alt="" loading="lazy"
                  onError={(event) => event.currentTarget.remove()}
                  className="absolute inset-0 size-full object-contain" />
              : null}
          </span>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span title={item.name} className="max-w-56 truncate text-body-regular text-text-primary">{item.name}</span>
            <small className="max-w-56 truncate text-caption-1-regular text-text-secondary">
              {[item.code, LOC[item.location] || item.location].filter(Boolean).join(' · ')}
            </small>
          </span>
        </span>
      </TableCell>
      <TableCell><span className="block min-w-28">{recordsText(item.records)}</span></TableCell>
      <TableCell>
        {item.candidates.length
          ? <Select aria-label={`把 ${item.name} 的记录接到哪个文件`} className="w-52" selectedKey={target}
              onSelectionChange={(key) => { if (key !== null) setTarget(Number(key)) }}>
              {item.candidates.map((candidate) => (
                <SelectItem key={candidate.id} id={candidate.id} textValue={candidateText(candidate)}>
                  {candidateText(candidate)}
                </SelectItem>
              ))}
            </Select>
          : <span className="text-text-secondary">没有番号或文件名对得上的文件</span>}
      </TableCell>
      <TableCell>
        <span className="flex flex-wrap gap-2">
          {item.candidates.length
            ? <Button size="small" disabled={busy || target === null}
                {...busyProps(attach.isPending)} onClick={() => attach.mutate()}>接到这个文件</Button>
            : null}
          <Button variant="danger" size="small" disabled={busy} {...busyProps(purge.isPending)}
            onClick={remove}>彻底删除</Button>
        </span>
      </TableCell>
    </TableRow>
  );
}

export function OrphanRecordsCard({ toast }: { toast(message: string): void }) {
  const query = useQuery({ queryKey: ORPHAN_RECORDS_KEY, queryFn: ({ signal }) => fetchOrphanRecords(signal) });
  const items = query.data?.items ?? [];
  const total = query.data?.total ?? items.length;
  if (!query.isError && !items.length) return null;
  return (
    <section id="orphan-records" aria-labelledby="orphan-records-title" className="flex scroll-mt-20 flex-col gap-4">
      <SectionHeading id="orphan-records-title">孤儿记录</SectionHeading>
      <Fieldset layout="stack" labelledBy="orphan-records-box">
        <FieldsetTitle id="orphan-records-box" gap="small">文件已消失的作品</FieldsetTitle>
        <p className="mb-3 text-body-regular text-text-secondary">
          这些作品的文件已不在盘上，喜欢、稍后看、播放列表与观看历史都还留着。接到新文件后记录跟过去，旧的这一条删掉。
        </p>
        {query.isError
          ? <Note tone="error" title="孤儿记录读取失败">{errorMessage(query.error)}</Note>
          : <DataTableFrame>
              <Table aria-label="文件已消失的作品" size="sm">
                <TableHeader>
                  <TableColumn id="item" isRowHeader>作品</TableColumn>
                  <TableColumn id="records">带的记录</TableColumn>
                  <TableColumn id="target">接到</TableColumn>
                  <TableColumn id="actions">操作</TableColumn>
                </TableHeader>
                <TableBody>
                  {items.map((item) => <OrphanRow key={item.id} item={item} toast={toast} />)}
                </TableBody>
              </Table>
            </DataTableFrame>}
        {!query.isError && total > items.length
          ? <p className="mt-3 text-caption-1-regular text-text-secondary">
              {`显示前 ${items.length.toLocaleString()} 条，共 ${total.toLocaleString()} 条。`}
            </p>
          : null}
      </Fieldset>
    </section>
  );
}
