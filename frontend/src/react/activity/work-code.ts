/** Work identity ignores separators in the code and letter case. */
export const workCodeKey = (value?: string | null): string => (value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
export const sameWorkCode = (left?: string | null, right?: string | null): boolean => Boolean(workCodeKey(left)) && workCodeKey(left) === workCodeKey(right);
