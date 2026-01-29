// src/services/graphql.ts
const GRAPHQL_ENDPOINT = 'https://graphql-server-hotfix-x3nt7antfq-de.a.run.app/';

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
 * Queries the GraphQL API for store items
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
 * Gets items for a specific category
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
 * Searches for items by name
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
 * Gets stock status for display
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
 * Formats price for display
 */
export function formatPrice(price: number): string {
  return `₱${price.toFixed(2)}`;
}

/**
 * Calculates discount percentage
 */
export function getDiscountPercentage(originalPrice: number, price: number): number {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}