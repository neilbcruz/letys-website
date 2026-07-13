import { describe, it, expect } from 'vitest';
import { getStockStatus, getDiscountPercentage } from './inventory';

describe('getStockStatus', () => {
  it('returns out-of-stock when qty is 0', () => {
    const result = getStockStatus({ qty: 0, min: 5 });
    expect(result).toEqual({
      status: 'out-of-stock',
      label: 'Out of Stock',
      color: 'text-status-error-fg bg-status-error-bg-muted',
    });
  });

  it('returns low-stock when qty equals min threshold', () => {
    const result = getStockStatus({ qty: 5, min: 5 });
    expect(result.status).toBe('low-stock');
    expect(result.label).toBe('Low Stock (5 left)');
  });

  it('returns low-stock when qty is below min threshold', () => {
    const result = getStockStatus({ qty: 1, min: 5 });
    expect(result.status).toBe('low-stock');
    expect(result.label).toBe('Low Stock (1 left)');
  });

  it('returns in-stock when qty is above min threshold', () => {
    const result = getStockStatus({ qty: 15, min: 5 });
    expect(result.status).toBe('in-stock');
    expect(result.label).toBe('In Stock (15)');
  });

  it('returns in-stock when min is 0 and qty is positive', () => {
    const result = getStockStatus({ qty: 1, min: 0 });
    expect(result.status).toBe('in-stock');
  });

  it('returns correct color classes for each status', () => {
    expect(getStockStatus({ qty: 0, min: 5 }).color).toBe('text-status-error-fg bg-status-error-bg-muted');
    expect(getStockStatus({ qty: 3, min: 5 }).color).toBe('text-status-warning-fg bg-status-warning-bg-muted');
    expect(getStockStatus({ qty: 10, min: 5 }).color).toBe('text-status-success-fg bg-status-success-bg');
  });
});

describe('getDiscountPercentage', () => {
  it('calculates standard discount percentage', () => {
    expect(getDiscountPercentage(500, 350)).toBe(30);
  });

  it('returns 0 when prices are equal', () => {
    expect(getDiscountPercentage(200, 200)).toBe(0);
  });

  it('returns 0 when original price is 0 (guard clause)', () => {
    expect(getDiscountPercentage(0, 100)).toBe(0);
  });

  it('rounds to nearest whole number', () => {
    expect(getDiscountPercentage(100, 67)).toBe(33);
    expect(getDiscountPercentage(99, 50)).toBe(49);
  });

  it('returns 100 for free item with positive original price', () => {
    expect(getDiscountPercentage(100, 0)).toBe(100);
  });
});
