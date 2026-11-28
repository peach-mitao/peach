import type { SettingsStore } from '../settings-store';

export const TOP_TOOLBAR_BUTTONS = ['immerseBtn', 'wallBtn', 'selectMode', 'density', 'notificationCenter', 'tutorialBtn'] as const;
export type TopToolbarButton = (typeof TOP_TOOLBAR_BUTTONS)[number];

export interface TopToolbarPreferences {
  order: string[];
  hidden: string[];
}

export function normalizeTopToolbar(value?: unknown): TopToolbarPreferences {
  const saved = value && typeof value === 'object' ? value as Partial<TopToolbarPreferences> : {};
  const known = (keys: unknown) => Array.isArray(keys)
    ? [...new Set(keys.filter((key): key is TopToolbarButton => TOP_TOOLBAR_BUTTONS.includes(key)))] : [];
  return {
    order: [...new Set([...known(saved.order), ...TOP_TOOLBAR_BUTTONS])],
    hidden: known(saved.hidden),
  };
}

export function wireTopToolbar(store: SettingsStore<{ topToolbar: TopToolbarPreferences }>): () => void {
  const slots = TOP_TOOLBAR_BUTTONS.flatMap(id => {
    const button = document.querySelector<HTMLButtonElement>(`header.top > #${id}`);
    if (!button) return [];
    const anchor = document.createComment(id);
    button.after(anchor);
    return [{ button, anchor }];
  });
  const buttons = new Map(slots.map(({ button }) => [button.id, button]));
  const apply = ({ order, hidden }: TopToolbarPreferences) => {
    const ordered = order.flatMap(id => buttons.get(id) ?? []);
    slots.forEach(({ anchor }, index) => {
      const button = ordered[index]!;
      if (anchor.previousSibling !== button) anchor.before(button);
      button.toggleAttribute('data-toolbar-hidden', hidden.includes(button.id));
    });
  };
  apply(store.value.topToolbar);
  const unsubscribe = store.subscribe(() => apply(store.value.topToolbar));
  return () => {
    unsubscribe();
    apply(normalizeTopToolbar());
    slots.forEach(({ anchor }) => anchor.remove());
  };
}
