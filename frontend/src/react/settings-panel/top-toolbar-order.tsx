import { Button } from '@/components/base/buttons/button';
import { normalizeTopToolbar, TOP_TOOLBAR_BUTTONS, type TopToolbarPreferences } from '../../appearance/top-toolbar';
import { t } from '../../i18n';
import { OrderedPreferenceList } from '../components/ordered-preference-list';
import { Icon } from './icon';
import type { SettingsEditorHost } from './settings-panel-api';

const DETAILS = {
  immerseBtn: { glyph: 'play', label: 'immersive' },
  wallBtn: { glyph: 'gallery-thumbnails', label: 'videoWall' },
  selectMode: { glyph: 'square-check-big', label: 'selectMode' },
  density: { glyph: 'layout-grid', label: 'density' },
  notificationCenter: { glyph: 'bell', label: 'notifications' },
  tutorialBtn: { glyph: 'compass', label: 'tutorial' },
} as const;

export function TopToolbarOrder({ host }: { host: SettingsEditorHost }) {
  const { order, hidden } = host.store.value.topToolbar;
  const defaults = normalizeTopToolbar();
  const save = (preferences: TopToolbarPreferences) => {
    host.store.value.topToolbar = preferences;
    host.saveLocal();
  };
  const items = TOP_TOOLBAR_BUTTONS.map(key => {
    const { glyph, label } = DETAILS[key];
    return { key, label: t(`settings:topToolbar.${label}`), icon: <Icon name={glyph} />, copyKey: `settings.topToolbar.${label}` };
  });
  return <OrderedPreferenceList id="topToolbarOrderSetting" items={items} order={order}
    onChange={next => save({ order: next, hidden })}
    visibility={{ hidden, onToggle: (key, shown) => save({
      order, hidden: shown ? hidden.filter(item => item !== key) : [...hidden, key],
    }) }}
    footer={<div className="peach-react"><Button variant="secondary" size="small"
      disabled={!hidden.length && order.every((key, index) => key === defaults.order[index])}
      onClick={() => save(defaults)}><span data-copy-key="settings.shared.reset">
        {t('settings:shared.reset')}
      </span></Button></div>} />;
}
