/* 文件面板的目录状态只在面板内变化，背景页面不参与导航。 */
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button as AriaButton, Heading } from 'react-aria-components';
import { RiArrowUpLine, RiArrowRightSLine, RiFileLine, RiFolder3Line } from '@remixicon/react';
import { Button } from '@/components/base/buttons/button';
import { Breadcrumb, BreadcrumbItem } from '@/components/base/breadcrumb/breadcrumb';
import { apiGet, errorMessage } from '../../api';
import { t } from '../../i18n';
import { ModalFrame } from '../components/modal-frame';
import { EmptyState } from '../components/empty-state';
import { Note } from '../components/note';
import { SettingsDialogClose } from '../components/settings-dialog-close';
import { ShellActionsContext } from '../router/router';
import './media-directory.css';
import { closeMediaDirectory, directorySnapshot, subscribeDirectory } from './media-directory-navigation';

interface DirectoryPage {
  roots: { id: string; name: string; mount: string; location: string }[];
  root: string | null; relative: string; path?: string; last_path?: string; focus_name?: string;
  state: 'roots' | 'ready' | 'unmapped' | 'denied' | 'missing' | 'timeout' | 'unreachable';
  directories: { name: string }[]; files: { name: string; asset_id: number | null }[];
  next_offset: number | null;
  read_only?: boolean | null;
  offset?: number;
}

export function MediaDirectoryBrowser() {
  const request = useSyncExternalStore(subscribeDirectory, directorySnapshot);
  return request ? <DirectoryBrowser key={request.revision} initial={request.search} /> : null;
}

function DirectoryBrowser({ initial }: { initial: string }) {
  const [params, setParams] = useState(() => new URLSearchParams(initial));
  const actions = useContext(ShellActionsContext);
  const queryParams = new URLSearchParams();
  for (const key of ['root', 'relative', 'asset', 'offset']) {
    const value = params.get(`directory_${key}`);
    if (value) queryParams.set(key, value);
  }
  const query = useQuery({ queryKey: ['media-directory', queryParams.toString()], retry: false, refetchOnWindowFocus: false,
    queryFn: ({ signal }) => apiGet<DirectoryPage>(`/api/media-directory?${queryParams}`, signal) });
  const focused = useRef<HTMLLIElement>(null);
  const data = query.data;
  useEffect(() => { focused.current?.scrollIntoView({ block: 'nearest' }) }, [data]);
  const change = (root?: string, relative = '', offset = 0) => {
    const next = new URLSearchParams();
    if (root) next.set('directory_root', root);
    if (relative) next.set('directory_relative', relative);
    if (offset) next.set('directory_offset', String(offset));
    setParams(next);
  };
  const root = data?.roots.find(item => item.id === data.root);
  const parts = data?.relative ? data.relative.split('/') : [];
  const close = closeMediaDirectory;
  const openAsset = (id: number) => { close(); actions?.openItem(id) };
  const selectedMissing = data?.state === 'ready' && data.focus_name && !data.files.some(item => item.name === data.focus_name);
  const groups = data ? Array.from(new Set(data.roots.map(item => item.name))) : [];
  const row = (name: string, kind: 'folder' | 'file', status?: string, interactive = false) => <>
    <span data-media-directory-name="">
      {kind === 'folder' ? <RiFolder3Line aria-hidden className="size-5 shrink-0 text-text-tertiary" /> : <RiFileLine aria-hidden className="size-5 shrink-0 text-text-tertiary" />}
      <span title={name}>{name}</span>
    </span>
    <span data-media-directory-type="">{t(`shell:mediaDirectory.${kind}`)}</span>
    <span data-media-directory-status="">{status || ''}{interactive ? <RiArrowRightSLine aria-hidden className="size-4 shrink-0" /> : null}</span>
  </>;
  return <ModalFrame isOpen onOpenChange={open => { if (!open) close() }} width="collections" label={t('shell:mediaDirectory.title')} surfaceClassName="peach-react"><div data-media-directory-dialog="">
    <div data-media-directory-header="">
      <Heading slot="title" className="text-title-2-medium">{t('shell:mediaDirectory.title')}</Heading>
      <SettingsDialogClose label={t('shell:serverPath.close')} onPress={close} />
    </div>
    <div data-media-directory-toolbar="">
      <Button variant="secondary" size="small" iconOnly leadingIcon={RiArrowUpLine} disabled={!root}
        aria-label={t('shell:mediaDirectory.up')} onClick={() => parts.length ? change(root?.id, parts.slice(0, -1).join('/')) : change()} />
      <Breadcrumb aria-label={t('shell:mediaDirectory.title')}>
        <BreadcrumbItem current={!root} onClick={() => change()}>{t('shell:mediaDirectory.libraries')}</BreadcrumbItem>
        {root ? <BreadcrumbItem current={!parts.length} onClick={() => change(root.id)}>{root.mount.split('/').filter(Boolean).at(-1)}</BreadcrumbItem> : null}
        {parts.map((part, index) => <BreadcrumbItem key={index} current={index === parts.length - 1}
          onClick={() => change(root?.id, parts.slice(0, index + 1).join('/'))}><span className="folder-crumb-name" title={part}>{part}</span></BreadcrumbItem>)}
      </Breadcrumb>
    </div>
    <div data-media-directory-body="" aria-label={t('shell:mediaDirectory.entries')} aria-busy={query.isPending}>
      {query.isPending ? <div aria-label={t('shell:serverPath.reading')} data-skeleton="" className="flex flex-col gap-3 p-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="skeleton-sheen h-9 w-full rounded-lg" />)}</div> : null}
      {query.error ? <div className="p-4"><Note tone="error" action={<Button variant="secondary" onClick={() => void query.refetch()}>{t('shell:mediaDirectory.retry')}</Button>}>{errorMessage(query.error)}</Note></div> : null}
      {data && !['roots', 'ready'].includes(data.state) ? <div className="p-4"><Note tone="warning" action={<Button variant="secondary" onClick={() => void query.refetch()}>{t('shell:mediaDirectory.retry')}</Button>}>{t(`shell:mediaDirectory.${data.state}`)}</Note></div> : null}
      {selectedMissing ? <div className="p-4"><Note tone="warning">{t('shell:mediaDirectory.fileMissing', { name: data.focus_name })}</Note></div> : null}
      {data?.state === 'roots' ? groups.map(group => <section key={group} aria-label={group}>
        <h3 data-media-directory-group="">{group}</h3>
        <ul data-media-directory-list="">
          {data.roots.filter(item => item.name === group).map(item => <li key={item.id}>
            <AriaButton data-media-directory-row="" data-media-directory-root="" onPress={() => change(item.id)}>
              {row(item.mount.split('/').filter(Boolean).at(-1) || item.name, 'folder', undefined, true)}
            </AriaButton>
          </li>)}
        </ul>
      </section>) : null}
      {data?.state === 'ready' && (data.directories.length > 0 || data.files.length > 0) ? <>
        <div aria-hidden data-media-directory-columns=""><span>{t('shell:mediaDirectory.name')}</span><span data-media-directory-type="">{t('shell:mediaDirectory.type')}</span><span>{t('shell:mediaDirectory.status')}</span></div>
        <ul data-media-directory-list="">
          {data.directories.map(item => <li key={`dir:${item.name}`}>
            <AriaButton data-media-directory-row="" onPress={() => change(data.root!, [...parts, item.name].join('/'))}>
              {row(item.name, 'folder', undefined, true)}
            </AriaButton>
          </li>)}
          {data.files.map(item => <li key={`file:${item.name}`} ref={item.name === data.focus_name ? focused : undefined}
            data-directory-focus={item.name === data.focus_name ? '' : undefined}>
            {item.asset_id ? <AriaButton data-media-directory-row="" onPress={() => openAsset(item.asset_id!)}>
              {row(item.name, 'file', t('shell:mediaDirectory.indexed'), true)}
            </AriaButton> : <div data-media-directory-row="">{row(item.name, 'file', t('shell:mediaDirectory.unindexed'))}</div>}
          </li>)}
        </ul>
      </> : null}
      {data?.state === 'ready' && !data.directories.length && !data.files.length ? <div className="p-8"><EmptyState size="compact" icon={RiFolder3Line} title={t('shell:mediaDirectory.empty')}>{null}</EmptyState></div> : null}
      {data?.state === 'roots' && !data.roots.length ? <div className="p-8"><EmptyState size="compact" icon={RiFolder3Line} title={t('shell:serverPath.noRoots')}>{null}</EmptyState></div> : null}
    </div>
    <div data-media-directory-footer="">
      {data?.path || data?.last_path ? <details data-media-directory-location=""><summary>{t('shell:mediaDirectory.pathDetails')}</summary>
        <p className="text-text-tertiary">{t('shell:mediaDirectory.pathHelp')}</p>
        <p className="select-text break-all">{data.last_path || data.path}</p>
      </details> : <span className="text-caption-1-regular text-text-tertiary">{t('shell:mediaDirectory.chooseDirectory')}</span>}
      <div className="flex shrink-0 items-center gap-2">
        {data?.read_only ? <span className="text-caption-1-regular text-text-tertiary" title={t('shell:mediaDirectory.readOnly')}>{t('shell:mediaDirectory.readOnlyShort')}</span> : null}
        {data?.offset ? <Button size="small" variant="secondary" onClick={() => change(data.root!, data.relative, Math.max(0, data.offset! - 500))}>{t('shell:mediaDirectory.previous')}</Button> : null}
        {data?.next_offset != null ? <Button size="small" variant="secondary" onClick={() => change(data.root!, data.relative, data.next_offset!)}>{t('shell:mediaDirectory.next')}</Button> : null}
      </div>
    </div>
  </div></ModalFrame>;
}
