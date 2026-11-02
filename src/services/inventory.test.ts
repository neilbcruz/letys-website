import { describe, it, expect, vi, afterEach } from 'vitest';
import { getStoreItems, getStockStatus, getDiscountPercentage } from './inventory';

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

const FEED = {
  stores: [
    {
      id: 'main',
      kaheroStoreId: "Lety's Buko Pie - Main",
      name: 'Main',
      products: [
        { name: 'Buko Pie', category: 'Pies', qty: 12, unitPrice: 280 },
        { name: 'Brownies', category: 'Baked Goods', qty: 0, unitPrice: 185 },
      ],
    },
    { id: 'shell', kaheroStoreId: 'shell-store-id', name: 'Shell', products: [] },
  ],
};

describe('getStoreItems', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('matches the store by its letys-ops id, not the legacy kaheroStoreId', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(FEED),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { items } = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50 });

    const [url] = fetchMock.mock.calls[0] as [string];
    expect(url).toContain('/api/inventory/availability');
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({
      name: 'Buko Pie',
      price: 280,
      originalPrice: 280,
      discount: 0,
      stockDetails: { qty: 12, min: 5 },
    });
  });

  it('filters by category and item name case-insensitively', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(FEED),
    }));

    const pies = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50, category: 'pies' });
    const search = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50, itemName: 'BROWNIE' });

    expect(pies.items.map(i => i.name)).toEqual(['Buko Pie']);
    expect(search.items.map(i => i.name)).toEqual(['Brownies']);
  });

  it('returns [] for an unknown store id (legacy slug no longer matches)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(FEED),
    }));

    const { items, storeOpen } = await getStoreItems({ storeName: 'letysbukopie-main', pageNumber: 1, pageSize: 50 });
    expect(items).toEqual([]);
    expect(storeOpen).toBeNull();
  });

  it('throws on HTTP error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    await expect(
      getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50 })
    ).rejects.toThrow('500');
  });
});

describe('getStoreItems storeOpen (live isOpen field)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reports storeOpen true when the feed says isOpen: true', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ stores: [{ ...FEED.stores[0], isOpen: true }, FEED.stores[1]] }),
    }));

    const { storeOpen } = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50 });

    expect(storeOpen).toBe(true);
  });

  it('reports storeOpen false when the feed says isOpen: false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ stores: [{ ...FEED.stores[0], isOpen: false }, FEED.stores[1]] }),
    }));

    const { storeOpen } = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50 });

    expect(storeOpen).toBe(false);
  });

  it('reports storeOpen null when the feed omits isOpen (backend not yet deployed)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(FEED),
    }));

    const { storeOpen } = await getStoreItems({ storeName: 'main', pageNumber: 1, pageSize: 50 });

    expect(storeOpen).toBeNull();
  });

  it('reports empty items and storeOpen null for an unknown store', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ stores: [{ ...FEED.stores[0], isOpen: true }] }),
    }));

    const { items, storeOpen } = await getStoreItems({ storeName: 'does-not-exist', pageNumber: 1, pageSize: 50 });

    expect(items).toEqual([]);
    expect(storeOpen).toBeNull();
  });
});
