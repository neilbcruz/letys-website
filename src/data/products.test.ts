import { describe, it, expect } from 'vitest';
import { isCustomerVisibleItem, HIDDEN_CATEGORIES } from './products';

describe('isCustomerVisibleItem', () => {
  it('hides items in hidden categories regardless of name or store', () => {
    for (const name of ['EcoBag', 'Katsa/Katya', 'Orocan', 'Plastic Knife']) {
      expect(isCustomerVisibleItem('main', { name, category: 'Miscellaneous' })).toBe(false);
      expect(isCustomerVisibleItem('pansol', { name, category: 'miscellaneous' })).toBe(false);
    }
  });

  it('shows a normal item', () => {
    expect(isCustomerVisibleItem('main', { name: 'Buko Pie', category: 'Main Products' })).toBe(true);
  });

  it('hides globally hidden products in visible categories', () => {
    expect(isCustomerVisibleItem('main', { name: 'Revel Bars', category: 'Baked Goods' })).toBe(false);
  });

  it('hides per-store exclusions only at that store', () => {
    const item = { name: 'Frozen Buko Pie', category: 'Main Products' };
    expect(isCustomerVisibleItem('pansol', item)).toBe(false);
    expect(isCustomerVisibleItem('main', item)).toBe(true);
  });

  it('keeps HIDDEN_CATEGORIES as the canonical supply-category list', () => {
    expect(HIDDEN_CATEGORIES).toEqual(['Miscellaneous']);
  });
});
