// src/services/inventory.ts
// Fetches live inventory from the letys-ops public availability feed.

/** Low-stock threshold. letys-ops does not track one, so we apply a fixed minimum. */
const DEFAULT_MIN_STOCK = 5;

/** Base URL of the letys-ops inventory API, e.g. https://letys-ops.YOUR-SUBNET.workers.dev */
const INVENTORY_API_URL = (import.meta.env.VITE_LETYS_OPS_API_URL as string | undefined)
  || 'https://letys-ops.letys.workers.dev';

/** Shape of the letys-ops public availability response (one fetch returns all stores). */
interface PublicAvailabilityResponse {
  stores: Array<{
    id: string;
    kaheroStoreId: string;
    name: string;
    products: Array<{
      name: string;
      category: string;
      qty: number;
      unitPrice: number;
    }>;
  }>;
}

export interface StockDetails {
  qty: number;
  min: number;
}

export interface StoreItem {
  name: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  minPrice: number;
  maxPrice: number;
  discount: number;
  isParentItem: boolean;
  itemId: string;
  discountUnit: string;
  discountName: string;
  imagePath: string;
  color: string | null;
  options: string[];
  modifiers: string[];
  symbol: string;
  allowNegativeStock: boolean;
  stockDetails: StockDetails;
  description: string | null;
}

export interface QueryParams {
  storeName: string;
  pageNumber: number;
  pageSize: number;
  category?: string;
  itemName?: string;
}

/**
 * Fetches store items from the letys-ops public availability feed.
 *
 * A single GET request returns every store and its products; the requested
 * store is matched client-side via its Kahero slug. letys-ops carries no
 * discount data, so `originalPrice` mirrors `price` and `discount` is 0.
 *
 * @param params - Query parameters for fetching store items
 * @param params.storeName - letys-ops store id (e.g., 'main')
 * @param params.category - Optional category filter (matched by inclusion)
 * @param params.itemName - Optional case-insensitive name search
 * @returns Promise resolving to array of store items (empty if the store is unknown)
 * @throws Error if `VITE_LETYS_OPS_API_URL` is unset or the request fails
 *
 * @example
 * ```typescript
 * const items = await getStoreItems({
 *   storeName: 'main',
 *   pageNumber: 1,
 *   pageSize: 50,
 *   category: 'Specialties'
 * });
 * ```
 */
export async function getStoreItems(params: QueryParams): Promise<StoreItem[]> {
  const { storeName, category = '', itemName = '' } = params;

  if (!INVENTORY_API_URL) {
    throw new Error(
      'VITE_LETYS_OPS_API_URL is not set. Configure the letys-ops inventory API base URL.'
    );
  }

  const base = INVENTORY_API_URL.replace(/\/+$/, '');
  const response = await fetch(`${base}/api/inventory/availability`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: PublicAvailabilityResponse = await response.json();

  const store = result.stores.find(s => s.id === storeName);
  if (!store) {
    return [];
  }

  const categoryLower = category.toLowerCase();
  const itemNameLower = itemName.toLowerCase();
  const matched = store.products.filter(product => {
    const matchesCategory =
      !category || product.category.toLowerCase().includes(categoryLower);
    const matchesName =
      !itemName || product.name.toLowerCase().includes(itemNameLower);
    return matchesCategory && matchesName;
  });

  return matched.map(product => ({
    name: product.name,
    category: product.category,
    price: product.unitPrice,
    originalPrice: product.unitPrice,
    discount: 0,
    stockDetails: { qty: product.qty, min: DEFAULT_MIN_STOCK },
    categoryId: '',
    minPrice: 0,
    maxPrice: 0,
    isParentItem: false,
    itemId: '',
    discountUnit: '',
    discountName: '',
    imagePath: '',
    color: null,
    options: [],
    modifiers: [],
    symbol: '',
    allowNegativeStock: false,
    description: null,
  }));
}

/**
 * Gets items for a specific category from a store
 *
 * Convenience function that wraps getStoreItems with category filtering
 *
 * @param storeName - Store identifier (e.g., 'main')
 * @param category - Category name to filter by (e.g., 'Specialties')
 * @param pageSize - Number of items to fetch (default: 50)
 * @returns Promise resolving to array of filtered store items
 *
 * @example
 * ```typescript
 * const specialtyItems = await getItemsByCategory(
 *   'main',
 *   'Specialties',
 *   50
 * );
 * ```
 */
export async function getItemsByCategory(
  storeName: string,
  category: string,
  pageSize: number = 50
): Promise<StoreItem[]> {
  return getStoreItems({
    storeName,
    pageNumber: 1,
    pageSize,
    category,
  });
}

/**
 * Searches for items by product name
 *
 * Performs a text search across store inventory
 *
 * @param storeName - Store identifier (e.g., 'main')
 * @param itemName - Product name or partial name to search for
 * @param pageSize - Number of results to return (default: 50)
 * @returns Promise resolving to array of matching store items
 *
 * @example
 * ```typescript
 * const results = await searchItems(
 *   'main',
 *   'Buko Pie',
 *   20
 * );
 * ```
 */
export async function searchItems(
  storeName: string,
  itemName: string,
  pageSize: number = 50
): Promise<StoreItem[]> {
  return getStoreItems({
    storeName,
    pageNumber: 1,
    pageSize,
    itemName,
  });
}

/**
 * Determines stock status for display purposes
 *
 * Calculates stock status based on quantity and minimum threshold.
 * Returns appropriate styling and label for UI display.
 *
 * @param stockDetails - Object containing quantity and minimum threshold
 * @param stockDetails.qty - Current quantity in stock
 * @param stockDetails.min - Minimum quantity threshold for low stock warning
 * @returns Object containing status type, display label, and Tailwind color classes
 *
 * @example
 * ```typescript
 * const status = getStockStatus({ qty: 15, min: 5 });
 * // Returns: { status: 'in-stock', label: 'In Stock (15)', color: 'text-status-success-fg bg-status-success-bg' }
 *
 * const lowStock = getStockStatus({ qty: 3, min: 5 });
 * // Returns: { status: 'low-stock', label: 'Low Stock (3 left)', color: 'text-status-warning-fg bg-status-warning-bg-muted' }
 *
 * const outOfStock = getStockStatus({ qty: 0, min: 5 });
 * // Returns: { status: 'out-of-stock', label: 'Out of Stock', color: 'text-status-error-fg bg-status-error-bg-muted' }
 * ```
 */
export function getStockStatus(stockDetails: StockDetails): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  label: string;
  color: string;
} {
  const { qty, min } = stockDetails;

  if (qty === 0) {
    return {
      status: 'out-of-stock',
      label: 'Out of Stock',
      color: 'text-status-error-fg bg-status-error-bg-muted',
    };
  }

  if (qty <= min) {
    return {
      status: 'low-stock',
      label: `Low Stock (${qty} left)`,
      color: 'text-status-warning-fg bg-status-warning-bg-muted',
    };
  }

  return {
    status: 'in-stock',
    label: `In Stock (${qty})`,
    color: 'text-status-success-fg bg-status-success-bg',
  };
}

/**
 * Formats a price value in Philippine Pesos for display
 *
 * @param price - The numeric price value to format
 * @returns Formatted price string with peso symbol and 2 decimal places
 *
 * @example
 * ```typescript
 * formatPrice(350);      // Returns: "₱350.00"
 * formatPrice(99.5);     // Returns: "₱99.50"
 * formatPrice(1000);     // Returns: "₱1000.00"
 * ```
 */
export function formatPrice(price: number): string {
  return `₱${price.toFixed(2)}`;
}

/**
 * Calculates discount percentage from original and current price
 *
 * @param originalPrice - Original price before discount
 * @param price - Current price after discount
 * @returns Discount percentage rounded to nearest whole number
 *
 * @example
 * ```typescript
 * getDiscountPercentage(500, 350);  // Returns: 30 (30% off)
 * getDiscountPercentage(100, 80);   // Returns: 20 (20% off)
 * getDiscountPercentage(200, 200);  // Returns: 0 (no discount)
 * ```
 */
export function getDiscountPercentage(originalPrice: number, price: number): number {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
