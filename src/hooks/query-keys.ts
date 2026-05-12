// src/hooks/query-keys.ts
export const queryKeys = {
  storeItems: (storeName: string, params?: { category?: string; itemName?: string; pageNumber?: number; pageSize?: number }) =>
    ['storeItems', storeName, params] as const,
} as const
