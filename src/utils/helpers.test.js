import { describe, it, expect } from 'vitest';
import { formatScore, sanitizeText, calcPercentage } from './helpers';

describe('helpers', () => {
  // formatScore
  it('formatScore returns correct percentage', () => {
    expect(formatScore(8, 10)).toBe('80%');
    expect(formatScore(10, 10)).toBe('100%');
    expect(formatScore(0, 10)).toBe('0%');
  });
  it('formatScore handles zero total', () => {
    expect(formatScore(0, 0)).toBe('0%');
  });
  it('formatScore rounds correctly', () => {
    expect(formatScore(1, 3)).toBe('33%');
    expect(formatScore(2, 3)).toBe('67%');
  });

  // sanitizeText
  it('sanitizeText removes HTML tags', () => {
    expect(sanitizeText('<script>alert(1)</script>')).not.toContain('<script>');
  });
  it('sanitizeText limits length', () => {
    expect(sanitizeText('a'.repeat(300))).toHaveLength(200);
  });
  it('sanitizeText returns empty string for non-string input', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(123)).toBe('');
  });
  it('sanitizeText trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
  });
  it('sanitizeText escapes angle brackets', () => {
    const result = sanitizeText('<b>bold</b>');
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
  });

  // calcPercentage
  it('calcPercentage returns correct value', () => {
    expect(calcPercentage(8, 10)).toBe(80);
    expect(calcPercentage(0, 10)).toBe(0);
    expect(calcPercentage(10, 10)).toBe(100);
  });
  it('calcPercentage handles zero total', () => {
    expect(calcPercentage(0, 0)).toBe(0);
  });
  it('calcPercentage rounds correctly', () => {
    expect(calcPercentage(1, 3)).toBe(33);
    expect(calcPercentage(2, 3)).toBe(67);
  });
});
