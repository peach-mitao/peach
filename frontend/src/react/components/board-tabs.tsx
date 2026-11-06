/* Page section tabs: neutral-filled selected state, with arrow key support and horizontal scrolling on narrow screens. */
import { useLayoutEffect, useRef, type KeyboardEvent } from 'react';
import { PillTabList } from './pill-tabs';

import { spriteGlyph } from './sprite-glyph';
import { useHorizontalScroller } from './use-horizontal-scroller';

export interface BoardTab<V extends string> {
  value: V;
  label: string;
  /** A glyph name from the legacy sprite sheet, given only when it points at an object (label, agency, local, subscription feed). */
  symbol?: string;
}

/** The count badge hanging after tab and group titles (the legacy layer's `.ui-board-tab-count` twin): 12/16 semi-bold, primary text at 10%
 *  backing, the whole block at fifty percent; a footnote, not a reading. The criteria come from the caller; the badge does not count by itself. */
export function TabCount({ value }: { value: number }) {
  return (
    <span data-tab-count=""
      className="ml-1.5 inline-block rounded-sm bg-text-primary/10 px-1 py-px text-caption-1-medium text-text-primary opacity-50">
      {value.toLocaleString()}
    </span>
  );
}

const TAB = 'relative flex flex-none cursor-pointer items-center whitespace-nowrap rounded-md'
  + ' px-3 py-2 text-body-regular text-text-secondary outline-none'
  + ' focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-border-focus-ring'
  + ' hover:text-text-primary aria-selected:bg-background-tertiary-default aria-selected:text-text-primary'
  + ' max-board-narrow:px-2.25 max-board-narrow:text-body-2-regular';

export function BoardTabs<V extends string>(
  { tabs, value, label, onChange, className = 'mb-5.5' }:
  { tabs: readonly BoardTab<V>[]; value: V; label: string; onChange(value: V): void; className?: string },
) {
  const list = useRef<HTMLDivElement>(null);
  const scrollRef = useHorizontalScroller(list);

  useLayoutEffect(() => {
    const host = list.current;
    if (!host) return;
    const measure = () => {
      const selected = host.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      if (!selected || !selected.offsetWidth) return;
      /* On narrow screens this row scrolls horizontally: when the selected chip falls outside the visible area the row shifts to reveal it fully, moving only the row, never the page. */
      const left = selected.offsetLeft, right = left + selected.offsetWidth;
      if (left < host.scrollLeft) host.scrollLeft = left;
      else if (right > host.scrollLeft + host.clientWidth) host.scrollLeft = right - host.clientWidth;
    };
    measure();
  }, [value]);

  /* Left and right arrows move within the row, Home/End jump to the ends, and landing on a key selects it: every key in this row is a URL,
     and where focus rests is where the page goes, the same rule as sidebar navigation. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const at = tabs.findIndex((tab) => tab.value === value);
    const next = event.key === 'ArrowRight' ? at + 1 : event.key === 'ArrowLeft' ? at - 1
      : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : -2;
    if (next === -2) return;
    event.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    list.current?.querySelector<HTMLElement>(`[data-tab="${target.value}"]`)?.focus();
    if (target.value !== value) onChange(target.value);
  };

  return (
    <PillTabList ref={scrollRef} role="tablist" aria-label={label} data-board-tab-list="" data-pill-nav="" onKeyDown={onKeyDown}
      className={`relative flex flex-none gap-1 overflow-x-auto max-board-narrow:gap-0 ${className}`}>
      {tabs.map((tab) => {
        const Glyph = tab.symbol ? spriteGlyph(tab.symbol) : null;
        const selected = tab.value === value;
        return (
          <button key={tab.value} type="button" role="tab" data-tab={tab.value} aria-selected={selected}
            data-pill-selected={selected ? '' : undefined} data-pill-variant="gray"
            tabIndex={selected ? 0 : -1} className={TAB}
            onClick={() => { if (!selected) onChange(tab.value) }}>
            {Glyph ? <Glyph className="mr-1.5 size-(--icon-inline)" /> : null}
            {tab.label}
          </button>
        );
      })}
    </PillTabList>
  );
}
