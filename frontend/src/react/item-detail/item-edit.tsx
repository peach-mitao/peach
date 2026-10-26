/* 单片显式保存与资料更新；配套文件和版本规则由服务端统一处理。 */
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UNSAFE_PortalProvider } from 'react-aria';
import { Heading } from 'react-aria-components';

import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';

import { apiGet, apiSend, errorMessage } from '../../api';
import { coverUrl } from '../../card-art/markup';
import { replaceCatalogItem } from '../catalog-grid/catalog-grid';
import type { MediaItem } from '../catalog-grid/types';
import { ModalFrame } from '../components/modal-frame';
import { Note } from '../components/note';
import { overlayHost } from '../components/overlay-host';
import { fetchLibraryProcessing, LIBRARY_PROCESSING_KEY, LIBRARY_PROCESSING_URL,
  pollInterval, processingActive, type LibraryProcessingData } from '../library-processing/library-processing';
import { queryClient } from '../query';
import { busyProps, useAction } from '../settings/use-action';
import { fetchItem, itemKey, type DetailItem, type ItemDetailActions } from './item-detail';

const EDIT_URL = '/api/item-edit';
interface EditForm {
  id: number; filename: string; code: string; title: string; performers: string[]; mutation_revision: number;
  subtitled: boolean; uncensored: boolean;
}

function refreshItem(item: DetailItem) {
  queryClient.setQueryData(itemKey(item.id), item);
  replaceCatalogItem(item.id, { ...item, tags: item.tags?.map(tag => tag.k) } as Partial<MediaItem>);
}

export function ItemEdit({ item, actions, onOpenChange }: {
  item: DetailItem; actions: ItemDetailActions; onOpenChange(open: boolean): void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const anchor = useRef<HTMLButtonElement>(null);
  const changeOpen = (next: boolean) => { setOpen(next); onOpenChange(next) };
  if (item.location !== 'local' || item.disposal) return null;
  return <>
    <div className="flex flex-wrap gap-2 py-2" data-item-maintenance="">
      <Button ref={anchor} variant="secondary" size="small" data-item-edit="" aria-haspopup="dialog"
        onClick={() => changeOpen(true)}>编辑资料</Button>
      <UpdateItem key={item.id} item={item} actions={actions} />
    </div>
    <UNSAFE_PortalProvider getContainer={() => overlayHost(anchor.current)}>
      <ModalFrame isOpen={open} onOpenChange={next => { if (!saving) changeOpen(next) }} width="form" label="编辑视频资料">
        {open ? <Editor item={item} actions={actions} close={() => { setSaving(false); changeOpen(false) }} onBusy={setSaving} /> : null}
      </ModalFrame>
    </UNSAFE_PortalProvider>
  </>;
}

function Editor({ item, actions, close, onBusy }: { item: DetailItem; actions: ItemDetailActions; close(): void; onBusy(busy: boolean): void }) {
  const id = item.id;
  const form = useQuery({ queryKey: ['item-edit', id],
    queryFn: ({ signal }) => apiGet<EditForm>(`${EDIT_URL}?id=${id}`, signal), staleTime: 0, gcTime: 0,
    refetchOnMount: 'always' });
  return form.data && !form.isFetching ? <EditFields key={form.data.mutation_revision + ':' + form.data.filename}
    form={form.data} item={item} actions={actions} close={close} onBusy={onBusy} />
    : <div className="p-5">{form.error ? <Note tone="error">{errorMessage(form.error)}</Note>
      : <div className="relative h-64 skeleton-sheen" data-skeleton="item-edit" role="status" aria-label="正在读取编辑资料" />}</div>;
}

function EditFields({ form, item, actions, close, onBusy }: { form: EditForm; item: DetailItem; actions: ItemDetailActions; close(): void; onBusy(busy: boolean): void }) {
  const [filename, setFilename] = useState(form.filename);
  const [code, setCode] = useState(form.code);
  const [title, setTitle] = useState(form.title);
  const [performers, setPerformers] = useState(form.performers.join('、'));
  const [subtitled, setSubtitled] = useState(form.subtitled);
  const [uncensored, setUncensored] = useState(form.uncensored);
  const [cover, setCover] = useState('');
  const [coverName, setCoverName] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const [picking, setPicking] = useState(false);
  const [coverError, setCoverError] = useState('');
  const action = useAction();
  const pending = !!action.busy;
  useEffect(() => { onBusy(pending) }, [pending, onBusy]);
  const save = () => {
    if (pending || picking || coverError) return;
    const edition = subtitled !== form.subtitled || uncensored !== form.uncensored ? { subtitled, uncensored } : undefined;
    void action.run('save', signal => apiSend<DetailItem>(EDIT_URL, {
      id: form.id, filename, title, performers: performers.split(/[、,，\n]/).map(name => name.trim()).filter(Boolean),
      expected_revision: form.mutation_revision, expected_name: form.filename,
      ...(code !== form.code ? { code } : {}),
      ...(edition ? { edition } : {}), ...(cover ? { cover } : {}),
    }, 'POST', signal), next => {
      refreshItem(next);
      void queryClient.invalidateQueries({ queryKey: ['item-edit', form.id] });
      actions.toast('已保存视频资料');
      close();
    });
  };
  const chooseCover = async (file?: File) => {
    if (!file) { setCover(''); setCoverName(''); setCoverError(''); return }
    if (file.size > 16 * 1024 * 1024) { setCoverError('封面图片超过 16 MB'); return }
    setPicking(true);
    try {
      const data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('无法读取所选图片'));
        reader.readAsDataURL(file);
      });
      setCover(data); setCoverName(file.name); setCoverError('');
    } catch (error) { setCoverError(errorMessage(error)) }
    finally { setPicking(false) }
  };
  const preview = cover || (item.has_cover ? coverUrl(item) : '');
  const clearCover = () => { setCover(''); setCoverName(''); setCoverError('') };
  return <form className="flex min-h-0 flex-col" onSubmit={event => { event.preventDefault(); save() }}
    onKeyDown={event => { if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault() }}>
    <div className="shrink-0 border-b border-separator-border px-5 py-4"><Heading slot="title" className="text-headline-medium">编辑视频资料</Heading></div>
    <div className="flex min-h-0 flex-col gap-3 overflow-y-auto p-5">
      <p className="text-caption-1-regular text-text-secondary">修改只在保存后生效。</p>
      <Input size="small" label="番号" name="code" placeholder="例如 IPX-061" hint="用于匹配封面与资料；保存时同步到文件名" value={code} onChange={setCode} autoComplete="off" />
      <Input size="small" label="文件名" name="filename" hint="可省略后缀，保存时自动补齐原格式" value={filename} onChange={setFilename} autoComplete="off" isRequired />
      <div className="flex flex-wrap gap-4">
        <Checkbox isSelected={subtitled} onChange={setSubtitled}>中字</Checkbox>
        <Checkbox isSelected={uncensored} onChange={setUncensored}>无码破解</Checkbox>
      </div>
      <Input size="small" label="作品标题" name="title" placeholder="填写片名" hint="只填写片名，番号填在上方；保存后显示在馆藏卡片上" value={title} onChange={setTitle} autoComplete="off" />
      <Input size="small" label="演员" name="performers" placeholder="填写演员姓名" hint="多位演员用顿号或逗号分隔" value={performers}
        onChange={setPerformers} autoComplete="off" />
      <section aria-label="封面图片" className="flex min-w-0 gap-4 rounded-xl border border-separator-border p-3">
        {preview ? <img src={preview} alt={cover ? '所选封面预览' : '当前封面'}
          className="h-32 w-24 shrink-0 rounded-lg bg-background-secondary-default object-contain" />
          : <div className="flex h-32 w-24 shrink-0 items-center justify-center rounded-lg bg-background-secondary-default text-caption-1-regular text-text-secondary">暂无封面</div>}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
          <p className="text-body-medium">封面图片</p>
          <p className="truncate text-caption-1-regular text-text-secondary" title={coverName || undefined}>{coverName || (item.has_cover ? '保留当前封面' : '选择一张本地图片')}</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="small" {...busyProps(picking)} aria-disabled={pending || picking}
              onClick={() => { if (!pending && !picking) fileInput.current?.click() }}>{item.has_cover || cover ? '更换封面' : '选择封面'}</Button>
            {cover ? <Button variant="ghost" size="small" onClick={clearCover}>取消所选封面</Button> : null}
          </div>
          <p className="text-caption-1-regular text-text-secondary">JPG、PNG、WebP · 最大 16 MB</p>
          <p className="text-caption-1-regular text-text-secondary">保存成功后，视频旁会保留一份封面。</p>
        </div>
        <input ref={fileInput} type="file" tabIndex={-1} aria-hidden className="hidden" accept="image/jpeg,image/png,image/webp"
          onChange={event => {
            const file = event.currentTarget.files?.[0];
            event.currentTarget.value = '';
            void chooseCover(file);
          }} />
      </section>
      {coverError ? <Note tone="error" action={<Button variant="ghost" size="small" onClick={clearCover}>取消所选封面</Button>}>{coverError}</Note> : null}
      {action.error ? <Note tone="error">{action.error}</Note> : null}
    </div>
    <div className="flex shrink-0 justify-end gap-2 border-t border-separator-border p-4">
      <Button variant="secondary" data-item-edit-cancel="" onClick={() => { if (!pending) close() }}>取消</Button>
      <Button variant="primary" type="submit" disabled={picking || !!coverError} {...busyProps(pending)}>{pending ? '正在保存' : '保存资料'}</Button>
    </div>
  </form>;
}

function UpdateItem({ item, actions }: { item: DetailItem; actions: ItemDetailActions }) {
  const [started, setStarted] = useState('');
  const [message, setMessage] = useState('');
  const completed = useRef('');
  const action = useAction();
  const target = String(item.code || item.name || `视频 ${item.id}`);
  const job = useQuery({ queryKey: LIBRARY_PROCESSING_KEY, enabled: !!started,
    queryFn: ({ signal }) => fetchLibraryProcessing(signal), refetchInterval: query => pollInterval(query.state.data, true) });
  useEffect(() => {
    const state = job.data;
    if (!started || !state || state.job_id !== started || state.asset_ids?.length !== 1 || state.asset_ids[0] !== item.id
      || processingActive(state) || completed.current === started) return;
    completed.current = started;
    void fetchItem(item.id).then(next => {
      refreshItem(next);
      setMessage(!next.code ? '未取得番号，请在编辑资料中填写番号后重试'
        : state.status === 'complete' ? `${target} 资料已更新` : state.error || '更新结束，部分来源未取得资料');
    }).catch(error => action.setError(errorMessage(error)));
  }, [job.data, started, item.id, target]);
  const running = !!started && job.data?.job_id === started && processingActive(job.data);
  const feedback = running ? `正在更新 ${target}${job.data?.stage ? ' · ' + job.data.stage : ''}` : message;
  return <div className="flex flex-col gap-2">
    <Button variant="secondary" size="small" data-item-update="" {...busyProps(!!action.busy || running)} onClick={() => {
      if (action.busy || running) return;
      void action.run('update', async signal => {
        const before = await fetchLibraryProcessing(signal);
        if (processingActive(before)) throw new Error('已有资料任务正在运行，请完成后再更新此视频');
        const state = await apiSend<LibraryProcessingData>(LIBRARY_PROCESSING_URL, { stage: 'metadata', asset_ids: [item.id], refresh: true }, 'POST', signal);
        if (state.job_id === before.job_id || state.requested_stage !== 'metadata' || !state.refresh_metadata
          || state.asset_ids?.length !== 1 || state.asset_ids[0] !== item.id)
          throw new Error('资料任务已由其他操作启动，请查看任务进度');
        return state;
      }, state => {
        queryClient.setQueryData(LIBRARY_PROCESSING_KEY, state);
        setStarted(state.job_id || ''); setMessage(`已开始更新 ${target}`);
        actions.toast(`已开始更新 ${target} 的资料`);
      });
    }}>{action.busy || running ? '正在更新资料' : '更新此视频'}</Button>
    {action.error || feedback ? <p className="break-words text-caption-1-regular text-text-secondary" role="status">{action.error || feedback}</p> : null}
  </div>;
}
