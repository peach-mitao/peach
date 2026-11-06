/* The glyph's aspect ratio belongs to the icon itself; navigation, skeleton, and body share it, while controls each still decide the icon height. */
const WIDE: Readonly<Record<string, number>> = { 'text-aa': 1.435, 'mark-javdb': 326 / 111 };

export function iconGeometry(name: string) {
  const ratio = WIDE[name];
  return { wide: Boolean(ratio), viewBox: ratio ? `0 0 ${(24 * ratio).toFixed(2)} 24` : '0 0 24 24' };
}
