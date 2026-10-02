/* `/js/home-glow.js` 的类型声明：光晕的参数模型、预设与色板，壳、设置面板与外观应用层
 * （`src/appearance/`）读同一份。只声明 TypeScript 这一侧用得到的那几样。 */
export interface GlowSpot { color: string; alpha: number }
/** 一份光晕设置。 */
export interface HomeGlow {
  on: boolean; preset: string; strength: number; noise: number; speed: number; soften: number; size: number;
  spot1: GlowSpot; spot2: GlowSpot; spot3: GlowSpot;
}
type GlowPalette = Pick<HomeGlow, 'spot1' | 'spot2' | 'spot3'>;

export declare const HOME_GLOW_SPOTS: readonly ('spot1' | 'spot2' | 'spot3')[];
export declare const GLOW_SPOT_LABELS: readonly string[];
/** `[键, 名称, 三枚光晕, 搭配的强调色]`。 */
export declare const HOME_GLOW_PRESETS: readonly (readonly [key: string, label: string, palette: GlowPalette, accent: string])[];
export declare const DEFAULT_HOME_GLOW: HomeGlow;
/** `[色系, 名称]`，第一项是「全部」。 */
export declare const GLOW_SWATCH_FAMILIES: readonly (readonly [key: string, label: string])[];
/** `[色系, 名称, #rrggbb]`。 */
export declare const GLOW_SWATCHES: readonly (readonly [family: string, name: string, hex: string])[];
/** `[键, 名称]`，十二档强调色。 */
export declare const ACCENTS: readonly (readonly [key: string, label: string])[];
export declare const DEFAULT_ACCENT: string;
/** 合法的 `#rrggbb` 转成小写原样返回，否则给 `fallback`。 */
export declare function glowColor(value: unknown, fallback: string): string;
export declare function glowPresetName(key: string): string;
/** 一档预设的三枚光晕（深拷贝）；认不出的键给默认那一档。 */
export declare function glowPalette(key: string): GlowPalette;
/** 一档预设搭配的强调色。 */
export declare function glowAccent(key: string): string;
/** 预设色块那颗球的填充：几枚颜色等分一圈的 conic-gradient。 */
export declare function glowChipFill(colors: readonly string[]): string;
/** 「玻璃原色」那一档：没有三枚光晕，面上漂的是每块玻璃自带的两团反光。 */
export declare function isNativeGlass(key: string): boolean;
/** 读回存量时的规范化；给 null 得到出厂那一套。 */
export declare function normalizeHomeGlow(raw: unknown): HomeGlow;
export declare function normalizeAccent(value: unknown): string;
/** 光晕那一层的变量写到 `el` 上（同值不重写）。 */
export declare function paintHomeGlow(el: HTMLElement | null, glow: HomeGlow): void;
/** 其余玻璃面那两团反光的色相写到 `el`（根元素）上。 */
export declare function paintGlassFaces(el: HTMLElement | null, glow: HomeGlow): void;
