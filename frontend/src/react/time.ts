/* The database always stores UTC (ISO with Z); the UI must display in the viewer's timezone. If a second page needs it, move it in
 * here, not a copy each: with each place explaining "which side a timestamp without a timezone marker counts on", the same time would show an eight-hour gap between the two pages. */

/** Local time. Ones without a timezone marker are interpreted as UTC — they were stored as UTC. */
export function localTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const text = /[Zz]|[+-]\d\d:?\d\d$/.test(iso) ? iso : `${iso}Z`;
  const when = new Date(text);
  if (Number.isNaN(when.getTime())) return String(iso).replace('T', ' ').slice(0, 16);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())} `
    + `${pad(when.getHours())}:${pad(when.getMinutes())}`;
}
