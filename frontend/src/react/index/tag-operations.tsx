/* 编辑与确认沿用 formModal / confirmModal，表单字段复用 BoardUI。 */
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UNSAFE_PortalProvider, VisuallyHidden } from 'react-aria';
import { formModal } from '@peach/legacy/ui';
import { overlayHost } from '../components/overlay-host';
import { Input } from '@/components/base/input/input';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { CheckboxCard } from '@/components/base/checkbox/checkbox-card';
import { Select, SelectItem } from '../components/select';
import { useQuery } from '@tanstack/react-query';
import { apiGet, apiSend } from '../../api';
import { queryClient } from '../query';
import { showToast } from '../toaster';
import { runBulkAction, type BulkAction, type BulkHost, type BulkReversal } from '../components/bulk-action';
import { joinList, quoted, t } from '../../i18n';
import { TagNameInput } from './tag-name-input';

export type TagId = number | string;
export type TagScope = 'local' | 'online';
const BLOCK_SCOPES = ['follow', 'jav_releases'] as const;
type BlockScope = typeof BLOCK_SCOPES[number];
const BLOCK_LABELS = { follow: 'catalog:tagOperations.scopeFollow', jav_releases: 'catalog:tagOperations.scopeReleases' } as const;
export interface ManagedTag { entity_id?: number; id?: string; k: string; n: number; hidden: boolean; blocked?: boolean; block_scopes?: BlockScope[];
  named?: boolean; aliases: string[]; cat?: string; favorite?: boolean }
const previousScopes = (tag: ManagedTag): BlockScope[] => tag.block_scopes ?? (tag.blocked ? ['follow'] : []);
const scopeLabel = (scopes: readonly BlockScope[]) => joinList(scopes.map(scope => t(BLOCK_LABELS[scope])));
export const tagBlockScopeLabel = (tag: ManagedTag) => scopeLabel(previousScopes(tag));
export const managedTagId = (tag: ManagedTag): TagId => tag.id ?? tag.entity_id!;
export type Operation = 'rename' | 'merge' | 'hide' | 'restore' | 'repair' | 'block' | 'unblock' | 'delete';
export interface Command { operation: Operation; ids: TagId[]; name?: string; target_id?: TagId; scope?: TagScope;
  block_scopes?: BlockScope[]; replace_block_scopes?: boolean; tag_hidden?: boolean }
interface Plan { token: string; ids?: TagId[]; name?: string; assets: number; overlap: number; tags: ManagedTag[] }
export const TAG_ACTION_LABELS: Record<Operation, string> = {
  rename: t('catalog:tagOperations.renameTag'), merge: t('catalog:tagOperations.mergeTags'), hide: t('catalog:tagOperations.hideTags'), restore: t('catalog:tagOperations.unhideTags'), repair: t('catalog:tagManager.mergeDuplicates'),
  block: t('catalog:tagManager.blockContent'), unblock: t('catalog:tagManager.unblockContent'), delete: t('catalog:tagManager.deleteTag'),
};
/** 操作做完后的提示，每种操作一句完成态。 */
const TAG_ACTION_DONE: Record<Operation, string> = {
  rename: t('catalog:tagOperations.doneRename'), merge: t('catalog:tagOperations.doneMerge'), hide: t('catalog:tagOperations.doneHide'), restore: t('catalog:tagOperations.doneUnhide'),
  repair: t('catalog:tagOperations.doneRepair'), block: t('catalog:tagOperations.doneBlock'), unblock: t('catalog:tagOperations.doneUnblock'),
  delete: t('catalog:tagOperations.doneDelete'),
};

/** 已隐藏、已屏蔽内容各有几个：标签页平时那排状态药丸与标签管理共用。写入后 `invalidateQueries()` 一并刷新。 */
export function useTagStatusCounts(scope: TagScope, enabled = true) {
  const count = (state: 'hidden' | 'blocked') => ({
    queryKey: ['tag-management', scope, 'count', state],
    queryFn: ({ signal }: { signal: AbortSignal }) => apiGet<{ total: number }>(
      `/api/tag-management?${new URLSearchParams({ scope, state, limit: '1' })}`, signal).then((page) => page.total),
  });
  const hidden = useQuery({ ...count('hidden'), enabled });
  const blocked = useQuery({ ...count('blocked'), enabled: enabled && scope === 'online' });
  // 还在取是 `null`（药丸上摆骨架），本地范围没有屏蔽这一档是 `undefined`。
  return { hiddenCount: hidden.data ?? (enabled ? null : undefined),
    blockedCount: scope === 'online' ? blocked.data ?? (enabled ? null : undefined) : undefined };
}

export const previewTagOperation = (command: Command, signal?: AbortSignal) =>
  apiSend<Plan>('/api/tag-management/preview', command, 'POST', signal);

const applyTagOperation = (command: Command, plan: Plan, signal?: AbortSignal) =>
  apiSend('/api/tag-management', { ...command, token: plan.token }, 'POST', signal);

const INVERSE: Partial<Record<Operation, Operation>> = { hide: 'restore', restore: 'hide' };
export const TAG_REVERSAL: Record<Operation, BulkReversal> = {
  rename: 'irreversible', merge: 'irreversible', repair: 'irreversible', delete: 'irreversible',
  hide: 'undo', restore: 'undo', block: 'undo', unblock: 'undo',
};

function consequence(command: Command, plan: Plan): string {
  const names = joinList(plan.tags.map(tag => quoted(tag.k)));
  if (command.operation === 'block' && command.block_scopes) {
    const key = command.tag_hidden ? 'catalog:tagOperations.hideAndBlockConfirm'
      : command.replace_block_scopes ? 'catalog:tagOperations.replaceBlockScopesConfirm' : 'catalog:tagOperations.blockScopesConfirm';
    return t(key,
      { names, scopes: scopeLabel(command.block_scopes) });
  }
  if (command.scope === 'online' && command.operation === 'hide') {
    return t('catalog:tagOperations.hideOnlineConfirm', { names });
  }
  if (command.operation === 'unblock') {
    const scopes = BLOCK_SCOPES.filter(scope => plan.tags.some(tag => previousScopes(tag).includes(scope)));
    return t('catalog:tagOperations.unblockScopesConfirm', { names, scopes: scopeLabel(scopes) });
  }
  return command.operation === 'merge' || command.operation === 'repair'
    ? t('catalog:tagOperations.mergeConfirm', { count: plan.tags.length, assets: plan.assets, overlap: plan.overlap })
    : command.operation === 'rename' ? t('catalog:tagOperations.renameConfirm', { names, newName: quoted(plan.name || command.name || ''), count: plan.assets })
      : command.operation === 'delete' ? t('catalog:tagOperations.deleteConfirm', { count: plan.tags.length, assets: plan.assets })
      : command.operation === 'block' && command.name ? t('catalog:tagOperations.blockNameConfirm', { names, count: plan.assets })
      : command.operation === 'block' ? t('catalog:tagOperations.blockConfirm', { names, count: plan.assets })
        : command.operation === 'hide' ? t('catalog:tagOperations.hideConfirm', { count: plan.tags.length, assets: plan.assets })
            : t('catalog:tagOperations.unhideConfirm', { count: plan.tags.length, assets: plan.assets });
}

/** 恢复原有的屏蔽范围，以及与屏蔽一起修改的隐藏状态。 */
async function restoreBlockScopes(tags: readonly ManagedTag[], cleared: boolean, restoreHidden: boolean) {
  const commands = new Map<string, Command>();
  for (const tag of tags) {
    const scopes = previousScopes(tag);
    const name = cleared && tag.named && !tag.n && !tag.hidden ? tag.k : undefined;
    const hidden = restoreHidden ? tag.hidden : undefined;
    const key = JSON.stringify([scopes, name, hidden]);
    const command: Command = commands.get(key) ?? { scope: 'online', operation: scopes.length ? 'block' : 'unblock', ids: [],
      ...(scopes.length ? { block_scopes: scopes, replace_block_scopes: true } : {}), ...(name ? { name } : {}),
      ...(hidden !== undefined ? { tag_hidden: hidden } : {}) };
    if (!name) command.ids.push(managedTagId(tag));
    commands.set(key, command);
  }
  try {
    for (const command of commands.values()) await applyTagOperation(command, await previewTagOperation(command));
  } finally {
    await queryClient.invalidateQueries();
  }
}

/** 标签与名册批量动作的回执走全站 Toast；带撤销时撤销结果写回同一条。 */
export const toastHost: BulkHost = {
  receipt: (message, options) => {
    const id = `bulk-action-${Date.now()}`;
    const undo = options?.undo;
    showToast(id, { html: message, alert: false, timeout: undo ? 8000 : 6000, action: undo ? { label: t('shell:shared.undo'), run: () => {
      void undo().then(() => showToast(id, { html: t('shell:receipt.undone'), alert: false, timeout: 6000, action: null }),
        (error: unknown) => showToast(id, { html: t('shell:receipt.undoFailed', { message: error instanceof Error ? error.message : String(error) }),
          alert: true, timeout: 6000, action: null }));
    } } : null });
  },
};

/** 一次标签操作：先预览拿到影响范围与令牌再弹窗，确认后按令牌写入。`plan` 已经预览过时直接用。 */
export function tagOperation(command: Omit<Command, 'ids'>, label = TAG_ACTION_LABELS[command.operation], prepared?: Plan): BulkAction<TagId> {
  let plan: Plan | null = prepared ?? null;
  const op = command.operation;
  const combined = op === 'block' && command.tag_hidden === true;
  const named = (op === 'block' || op === 'hide') && !!command.name;
  const body = (ids: readonly TagId[]): Command => ({ ...command, ids: named ? [] : [...ids] });
  return {
    key: op, label, reversal: TAG_REVERSAL[op], holdToConfirm: op === 'delete',
    confirm: async (ids) => {
      plan ??= await previewTagOperation(body(ids));
      return { title: combined ? t('catalog:tagOperations.hideAndBlock') : TAG_ACTION_LABELS[op], body: consequence(body(ids), plan) };
    },
    run: async (ids) => {
      await applyTagOperation(body(ids), plan!);
      await queryClient.invalidateQueries();
      if (op === 'block' || op === 'unblock') {
        const tags = plan!.tags;
        return () => restoreBlockScopes(tags, op === 'unblock', command.tag_hidden !== undefined);
      }
      const inverse = INVERSE[op];
      if (!inverse) return;
      const done = command.scope === 'online' ? plan!.tags.filter(tag => tag.hidden !== (op === 'hide')) : [];
      return async () => {
        const { name: _name, ...rest } = command;
        const recreate = op === 'restore' ? done.filter(tag => tag.named && !tag.n && !previousScopes(tag).length) : [];
        const affected = command.scope === 'online' ? done.filter(tag => !recreate.includes(tag)).map(managedTagId) : [...ids];
        const commands: Command[] = recreate.map(tag => ({ ...rest, operation: inverse, ids: [], name: tag.k }));
        if (affected.length) commands.push({ ...rest, operation: inverse, ids: affected });
        try {
          for (const back of commands) await applyTagOperation(back, await previewTagOperation(back));
        } finally {
          await queryClient.invalidateQueries();
        }
      };
    },
    receipt: () => combined ? t('catalog:tagOperations.doneHideAndBlock') : TAG_ACTION_DONE[op],
  };
}

export async function confirmTagOperation(command: Command, plan: Plan, signal?: AbortSignal) {
  if (signal?.aborted) return false;
  const { ids, ...rest } = command;
  return runBulkAction(tagOperation(rest, undefined, plan), ids.length ? ids : plan.ids ?? [], toastHost);
}

type FormDialog = ReturnType<typeof formModal>;
export type EditorOperation = 'rename' | 'merge' | 'rule' | 'editBlock';
type TagDraft = { name: string; target_id: TagId; scopes: BlockScope[]; hide: boolean; block: boolean };
export function TagEditor({ operation, selected, close, done, scope = 'local' }: {
  operation: EditorOperation; selected: ManagedTag[]; close(): void; done(): void; scope?: TagScope;
}) {
  const initial = useRef({ operation, selected, close, done, scope });
  const draft = useRef<TagDraft>({ name: selected[0]?.k || '', target_id: selected[0] ? managedTagId(selected[0]) : 0,
    scopes: operation === 'editBlock' && selected[0] ? previousScopes(selected[0]) : ['follow'], hide: false, block: operation === 'editBlock' });
  const [view, setView] = useState<{ host: Element; dialog: FormDialog } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    const given = initial.current;
    const named = given.operation === 'rule' && !given.selected.length;
    const title = given.operation === 'rule' ? t(named ? 'catalog:tagManager.addRule' : 'catalog:tagManager.setRule')
      : given.operation === 'editBlock' ? t('catalog:tagManager.editBlockScopes') : TAG_ACTION_LABELS[given.operation];
    const dialog = formModal({ title,
      confirmLabel: t('catalog:tagOperations.previewImpact'), confirmDisabled: true,
      body: '<div class="peach-react" data-tag-editor-fields></div>',
      onConfirm: async () => {
        const { name, target_id, scopes, hide, block } = draft.current;
        const operation = given.operation === 'rule' || given.operation === 'editBlock' ? (block ? 'block' : 'hide') : given.operation;
        const command: Command = { operation, ids: given.selected.map(managedTagId),
          ...(given.scope === 'online' ? { scope: given.scope } : {}),
          ...(given.operation === 'merge' ? { target_id } : {}),
          ...(given.operation === 'rename' || named ? { name: name.trim() } : {}),
          ...(operation === 'block' ? { block_scopes: scopes, replace_block_scopes: given.operation === 'editBlock' } : {}),
          ...(hide && block ? { tag_hidden: true } : {}) };
        const plan = await previewTagOperation(command, controller.signal);
        if (operation === 'hide' && plan.tags.every(tag => tag.hidden)) {
          throw new Error(t('catalog:tagOperations.alreadyHidden'));
        }
        return { command, plan };
      } });
    setView({ host: dialog.dialog.querySelector('[data-tag-editor-fields]')!, dialog });
    void dialog.done.then(async result => {
      if (controller.signal.aborted) return;
      if (result.confirmed) {
        const prepared = result.result as { command: Command; plan: Plan };
        if (await confirmTagOperation(prepared.command, prepared.plan, controller.signal)) given.done();
      }
      if (!controller.signal.aborted) given.close();
    });
    return () => { controller.abort(); dialog.close() };
  }, []);
  /* 「保留哪一个」的下拉挂进这个弹层自己的 dialog：落在 body 或详情舞台上会被后开的模态框盖住，看起来是空下拉。 */
  return view ? createPortal(<UNSAFE_PortalProvider getContainer={() => overlayHost(view.dialog.dialog)}>
    <TagFields operation={initial.current.operation} selected={initial.current.selected} dialog={view.dialog}
      initialDraft={draft.current}
      update={value => { draft.current = value }} />
  </UNSAFE_PortalProvider>, view.host) : null;
}

function TagFields({ operation, selected, dialog, initialDraft, update }: {
  operation: EditorOperation; selected: ManagedTag[]; dialog: FormDialog; initialDraft: TagDraft;
  update(value: TagDraft): void;
}) {
  const [name, setName] = useState(initialDraft.name);
  const [target, setTarget] = useState(initialDraft.target_id);
  const [scopes, setScopes] = useState(initialDraft.scopes);
  const [hide, setHide] = useState(initialDraft.hide);
  const [block, setBlock] = useState(initialDraft.block);
  const rules = operation === 'rule' || operation === 'editBlock';
  const named = operation === 'rule' && !selected.length;
  useEffect(() => {
    update({ name, target_id: target, scopes, hide, block });
    dialog.confirmButton.disabled = rules ? (!hide && !block) || (block && !scopes.length) || (named && !name.trim())
      : operation === 'rename' && (!name.trim() || name.trim() === selected[0]?.k);
  }, [name, target, scopes, hide, block, rules, named, dialog, operation, selected, update]);
  return rules ? <div className="flex flex-col gap-4">
    {named ? <TagNameInput value={name} onChange={setName} /> : <p className="text-body-2-regular text-text-secondary">
      {joinList(selected.map(tag => quoted(tag.k)))}</p>}
    {operation === 'rule' ? <fieldset className="flex min-w-0 flex-col gap-2">
      <VisuallyHidden elementType="legend">{t('catalog:tagOperations.ruleType')}</VisuallyHidden>
      <CheckboxCard isSelected={hide} onChange={setHide} aria-label={t('catalog:tagOperations.hideTags')}
        title={<span data-copy-key="catalog.tagOperations.hideTags">{t('catalog:tagOperations.hideTags')}</span>}
        description={<span data-copy-key="catalog.tagOperations.hideOnlineHint">{t('catalog:tagOperations.hideOnlineHint')}</span>} />
      <CheckboxCard isSelected={block} onChange={setBlock} aria-label={t('catalog:tagOperations.blockTaggedContent')}
        title={<span data-copy-key="catalog.tagOperations.blockTaggedContent">{t('catalog:tagOperations.blockTaggedContent')}</span>}
        description={<span data-copy-key="catalog.tagOperations.blockContentHint">{t('catalog:tagOperations.blockContentHint')}</span>} />
    </fieldset> : null}
    {block ? <><fieldset className="flex flex-wrap gap-3">
      <legend className="mb-2 text-body-2-medium text-text-primary" data-copy-key="catalog.tagOperations.blockScopeLabel">{t('catalog:tagOperations.blockScopeLabel')}</legend>
      {BLOCK_SCOPES.map(scope => <Checkbox key={scope} isSelected={scopes.includes(scope)}
        onChange={on => setScopes(current => on ? [...current, scope] : current.filter(value => value !== scope))}>
        <span data-copy-key={BLOCK_LABELS[scope].replace(':', '.')}>{t(BLOCK_LABELS[scope])}</span>
      </Checkbox>)}
    </fieldset>
    <p className="text-caption-1-regular text-text-secondary" data-copy-key="catalog.tagOperations.blockScopeHint">
      {t('catalog:tagOperations.blockScopeHint')}</p></> : null}
  </div>
    : operation !== 'merge' ? <Input autoFocus aria-label={t('catalog:tagOperations.tagName')} value={name} onChange={setName} maxLength={80} />
    : <Select aria-label={t('catalog:tagOperations.tagToKeep')} prefix={t('catalog:tagOperations.keep')} selectedKey={String(target)} onSelectionChange={key => {
      const row = selected.find(tag => String(managedTagId(tag)) === String(key)); if (row) setTarget(managedTagId(row));
    }}>
      {selected.map(row => <SelectItem key={managedTagId(row)} id={String(managedTagId(row))}>{row.k}</SelectItem>)}
    </Select>;
}
