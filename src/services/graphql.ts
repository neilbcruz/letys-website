// src/services/graphql.ts
const GRAPHQL_ENDPOINT = 'https://graphql.kahero.co/';

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

export interface GetStoreItemsResponse {
  data: {
    getStoreItems: {
      items: StoreItem[];
    };
  };
}

export interface QueryParams {
  storeName: string;
  pageNumber: number;
  pageSize: number;
  category?: string;
  itemName?: string;
}

/**
 * Queries the GraphQL API for store items with optional filtering
 *
 * @param params - Query parameters for fetching store items
 * @param params.storeName - Store identifier (e.g., 'letysbukopie-main')
 * @param params.pageNumber - Page number for pagination (starts at 1)
 * @param params.pageSize - Number of items per page (max 100 recommended)
 * @param params.category - Optional category filter
 * @param params.itemName - Optional search term for product name
 * @returns Promise resolving to array of store items
 * @throws Error if the API request fails
 *
 * @example
 * ```typescript
 * const items = await getStoreItems({
 *   storeName: 'letysbukopie-main',
 *   pageNumber: 1,
 *   pageSize: 50,
 *   category: 'Specialties'
 * });
 * ```
 */
export async function getStoreItems(params: QueryParams): Promise<StoreItem[]> {
  const { storeName, pageNumber, pageSize, category = '', itemName = '' } = params;

  const query = `{
  getStoreItems(
    storeName: "${storeName}"
    pageNumber: ${pageNumber}
    pageSize: ${pageSize}
    category: "${category}"
    itemName: "${itemName}"
  )
}`;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/graphql-response+json, application/json',
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GetStoreItemsResponse = await response.json();
    return result.data.getStoreItems.items;
  } catch (error) {
    console.error('Error fetching store items:', error);
    throw error;
  }
}

/**
 * Gets items for a specific category from a store
 *
 * Convenience function that wraps getStoreItems with category filtering
 *
 * @param storeName - Store identifier (e.g., 'letysbukopie-main')
 * @param category - Category name to filter by (e.g., 'Specialties')
 * @param pageSize - Number of items to fetch (default: 50)
 * @returns Promise resolving to array of filtered store items
 *
 * @example
 * ```typescript
 * const specialtyItems = await getItemsByCategory(
 *   'letysbukopie-main',
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
 * @param storeName - Store identifier (e.g., 'letysbukopie-main')
 * @param itemName - Product name or partial name to search for
 * @param pageSize - Number of results to return (default: 50)
 * @returns Promise resolving to array of matching store items
 *
 * @example
 * ```typescript
 * const results = await searchItems(
 *   'letysbukopie-main',
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
 * // Returns: { status: 'in-stock', label: 'In Stock (15)', color: 'text-green-700 bg-green-100' }
 *
 * const lowStock = getStockStatus({ qty: 3, min: 5 });
 * // Returns: { status: 'low-stock', label: 'Low Stock (3 left)', color: 'text-yellow-700 bg-yellow-100' }
 *
 * const outOfStock = getStockStatus({ qty: 0, min: 5 });
 * // Returns: { status: 'out-of-stock', label: 'Out of Stock', color: 'text-red-600 bg-red-100' }
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
      color: 'text-red-600 bg-red-100',
    };
  }

  if (qty <= min) {
    return {
      status: 'low-stock',
      label: `Low Stock (${qty} left)`,
      color: 'text-yellow-700 bg-yellow-100',
    };
  }

  return {
    status: 'in-stock',
    label: `In Stock (${qty})`,
    color: 'text-green-700 bg-green-100',
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