/* 在线标签的多选浮条与标签管理共用规则表单。 */
import { Button } from '@/components/base/buttons/button';
import { useState } from 'react';
import { SelectionDock } from '../components/selection-dock';
import { TagEditor } from './tag-operations';
import type { IndexTag } from './index-data';
import { t } from '../../i18n';

export function OnlineTagDock({ tags, pageTags, visible, onPick, exit }: {
  tags: readonly IndexTag[]; pageTags: readonly IndexTag[]; visible: boolean;
  onPick(keys: string[]): void; exit(): void;
}) {
  const all = pageTags.length > 0 && tags.length === pageTags.length;
  const [editing, setEditing] = useState(false);
  return (
    <><SelectionDock visible={visible} label={t('catalog:tagFilters.selectionActions')}
      count={t('catalog:tagFilters.selectedCount', { count: tags.length })}
      actions={[]}
      leading={<Button size="small" variant="secondary" disabled={!pageTags.length}
        onClick={() => onPick(all ? [] : pageTags.map((tag) => tag.k))}>
        {all ? t('catalog:rosterActions.deselectAll') : t('catalog:rosterActions.selectAll')}</Button>}>
      <Button size="small" variant="secondary" disabled={!tags.length} onClick={() => setEditing(true)}>
        <span data-copy-key="catalog.tagManager.setRule">{t('catalog:tagManager.setRule')}</span>
      </Button>
      <Button size="small" variant="ghost" onClick={exit}>{t('catalog:rosterActions.exit')}</Button>
    </SelectionDock>
    {editing ? <TagEditor operation="rule" scope="online"
      selected={tags.map(tag => ({ ...tag, id: tag.id || tag.k, hidden: !!tag.hidden, aliases: tag.aliases ?? [] }))}
      close={() => setEditing(false)} done={() => onPick([])} /> : null}</>
  );
}
