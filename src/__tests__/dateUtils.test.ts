import { describe, it, expect } from 'vitest';
import { nowIso, formatDate } from '@/lib/dateUtils';

describe('dateUtils', () => {
  it('nowIso returns ISO string', () => {
    const v = nowIso();
    expect(typeof v).toBe('string');
    expect(v).toMatch(/T/);
  });

  it('formatDate returns dash on invalid input', () => {
    expect(formatDate('not-a-date')).toBe('-');
  });
});
