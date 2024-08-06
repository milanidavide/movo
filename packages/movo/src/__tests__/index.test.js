import { expect, test } from 'vitest';
import { parseOffset } from '../index.js';

test('returns 0 for "top"', () => {
    expect(parseOffset(200, 'top')).toBe(0);
});

test('returns 100 for "center"', () => {
    expect(parseOffset(200, 'center')).toBe(100);
});

test('returns 200 for "bottom"', () => {
    expect(parseOffset(200, 'bottom')).toBe(200);
});

test('returns 30 for "top + 30px"', () => {
    expect(parseOffset(200, 'top + 30px')).toBe(30);
});

test('returns 65 for "10% + 30px"', () => {
    expect(parseOffset(353, '10% + 30px')).toBe(65);
});

test('returns 50 for "10% + 30px"', () => {
    expect(parseOffset(200, '10% + 30px')).toBe(50);
});

test('returns 50 for "10%+30px"', () => {
    expect(parseOffset(200, '10%+30px')).toBe(50);
});

test('returns 0 for "20%-40px"', () => {
    expect(parseOffset(200, '20%-40px')).toBe(0);
});

test('returns 50 for "50px"', () => {
    expect(parseOffset(200, '50px')).toBe(50);
});

test('returns 180 for "90%"', () => {
    expect(parseOffset(200, '90%')).toBe(180);
});

test('returns null for unsupported format', () => {
    expect(parseOffset(200, 'unsupported')).toBeNull();
});
