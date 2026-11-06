/* The sidebar Glow's Detailed settings, following the feralui.dev/gradients workbench panel: a parameter row is "84px label + hand-drawn slider +
 * monospaced readout on the right", and a color row, when opened, pops a palette below itself.
 * Forensics in docs/reference-snapshots/feralui-studio-boardui-accent-measured.md.
 *
 * The preset swatches are the same group of swatches on this screen and on the palette card at the bottom of the sidebar, and the same write (`GlowPresetGrid`); both sides read
 * the shell's store, and clicking one side aligns the other on the spot. The current preset name, the preset swatches, and the five parameters all belong to the "Palette" group.
 *
 * The "Glass original" preset has none of the three Glows: that layer counts as 0 entirely, and what floats on the surface is the two reflections each piece of glass carries by default. Intensity,
 * grain, softness, size, and the three colors therefore control nothing at all; this preset hides them and swaps in a Note that the color comes from the light/dark
 * theme. Drift speed isn't hidden either — the two built-in reflections also drift. "Restore defaults" is likewise not hidden; under any preset you must be able to return to the factory set in one step. */
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

import { closeAnchoredMenu, wireAnchoredMenu } from '@peach/legacy/ui';
import {
  GLOW_SPOT_LABELS, GLOW_SWATCH_FAMILIES, GLOW_SWATCHES, HOME_GLOW_SPOTS, glowColor, glowPresetName, isNativeGlass,
  normalizeHomeGlow, type HomeGlow,
} from '@peach/appearance';

import { GlowPresetGrid } from '../components/glow-preset-grid';
import { useOverlayScrollbar } from '../components/overlay-scrollbar';
import type { SettingsPanelHost } from './settings-panel-api';
import { Icon } from './icon';
import { DialRow } from './legacy-controls';

type Field = 'strength' | 'noise' | 'speed' | 'soften' | 'size';
type Spot = 'spot1' | 'spot2' | 'spot3';

const FIELDS: readonly [Field, string, number][] = [
  ['strength', 'Intensity', 100], ['noise', 'Grain', 60], ['speed', 'Drift speed', 300], ['soften', 'Softness', 100], ['size', 'Size', 100],
];


function StopRow({ host, spot, index, glow }: { host: SettingsPanelHost; spot: Spot; index: number; glow: HomeGlow }) {
  const label = GLOW_SPOT_LABELS[index];
  const row = useRef<HTMLDivElement | null>(null);
  const toggle = useRef<HTMLButtonElement | null>(null);
  const pop = useRef<HTMLDivElement | null>(null);
  const palette = useOverlayScrollbar<HTMLDivElement>();
  const [family, setFamily] = useState('all');
  /* The popover's left and right edges align with this row: if its width does not follow the row, a swatch narrower than the row gives no clue which row it came from.
     This must run before wireAnchoredMenu, which computes the left edge from the current width. */
  useLayoutEffect(() => {
    const [mount, button, menu] = [row.current, toggle.current, pop.current];
    if (!mount || !button || !menu) return;
    button.addEventListener('click', () => { menu.style.width = `${button.offsetWidth}px` });
    wireAnchoredMenu(mount, button, menu);
  }, []);
  const color = glow[spot].color;
  const pick = (hex: string) => {
    const current = host.store.value.homeGlow;
    current[spot].color = glowColor(hex, current[spot].color);
    current.preset = 'custom';
    host.store.save();
    host.changed('glow');
    closeAnchoredMenu();
    toggle.current?.focus();
  };
  return (
    <div data-glow-stop={spot} ref={row}>
      <button type="button" data-glow-stop-toggle="" aria-haspopup="dialog" aria-expanded="false" ref={toggle}>
        <span aria-hidden="true" data-glow-stop-dot="" style={{ '--glow-swatch': color } as CSSProperties} />
        <span data-glow-stop-text=""><b>{label}</b><small className="mono" data-glow-stop-hex="">{color}</small></span>
        <Icon name="chevron-down" />
      </button>
      <div className="popmenu" data-glow-stop-pop="" popover="manual" hidden ref={pop}>
        <div data-glow-pills="" role="group" aria-label="Colors">
          {GLOW_SWATCH_FAMILIES.map(([key, name]) => (
            <button type="button" key={key} data-glow-pill={key} aria-pressed={key === family}
              onClick={() => setFamily(key)}>{name}</button>
          ))}
        </div>
        <div data-glow-palette-frame="">
        <div ref={palette} data-glow-palette="" role="radiogroup" aria-label={`${label} color`}>
          {GLOW_SWATCHES.map(([swatchFamily, name, hex]) => (
            <button type="button" key={hex} role="radio" aria-checked={hex === color} data-glow-swatch={hex}
              data-glow-family={swatchFamily} style={{ '--glow-swatch': hex } as CSSProperties}
              title={name} aria-label={name} hidden={family !== 'all' && swatchFamily !== family}
              onClick={() => pick(hex)} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export function GlowSettings({ host }: { host: SettingsPanelHost }) {
  const glow = host.store.value.homeGlow;
  const native = isNativeGlass(glow.preset);
  return (
    <section data-glow-setting="" id="homeGlowControls" aria-label="Sidebar glow parameters" hidden={!glow.on}>
      <section data-glow-group=""><h4 data-settings-subheading="">Glow palette</h4>
        <div data-setting-card="" data-glow-card="">
        <p data-glow-current="">Current palette<b data-glow-preset-name="">{glowPresetName(glow.preset)}</b></p>
        <GlowPresetGrid store={host.store} label="Glow palette" />
        <p data-glow-native-note="" hidden={!native}>This tier uses each pane's own reflections, and colors follow the light or dark theme.</p>
        <div data-glow-fields="">
          {/* While dragging, only parameters change and a single repaint is scheduled; persisting waits for release. The other glass surfaces follow only the velocity,
              and its two variables can only be written on the root, so during the drag only the sidebar layer changes and the full page follows on release. */}
          {FIELDS.map(([field, label, max]) => (
            <DialRow key={field} field={field} label={label} max={max} value={glow[field]} hidden={native && field !== 'speed'}
              onStep={(value) => { host.store.value.homeGlow[field] = value; host.changed('glowFrame') }}
              onSettle={() => { host.store.save(); if (field === 'speed') host.changed('glow') }} />
          ))}
        </div>
        <div data-glow-actions="">
          <button type="button" className="geist-button" data-glow-reset=""
            onClick={() => { host.store.value.homeGlow = normalizeHomeGlow(null); host.store.save(); host.changed('glow') }}>Restore defaults</button>
        </div>
        </div>
      </section>
      <section data-glow-group="" data-glow-colours="" hidden={native}><h4 data-settings-subheading="">Custom color</h4>
        <div data-setting-card="" data-glow-colour-card=""><div data-glow-stops="">
          {HOME_GLOW_SPOTS.map((spot, index) => <StopRow key={spot} host={host} spot={spot as Spot} index={index} glow={glow} />)}
        </div></div>
      </section>
    </section>
  );
}
