// src/hooks/useStoreItems.ts
import { useQuery } from '@tanstack/react-query';
import { getStoreItems, type StoreItem, type QueryParams } from '@/services/inventory';
import { isCustomerVisibleItem } from '@/data/products';
import { queryKeys } from './query-keys';

export interface UseStoreItemsResult {
  items: StoreItem[];
  /** Live open/closed state from the availability feed; null when unknown. */
  storeOpen: boolean | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useStoreItems(params: QueryParams): UseStoreItemsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.storeItems(params.storeName, {
      category: params.category,
      itemName: params.itemName,
      pageNumber: params.pageNumber,
      pageSize: params.pageSize,
    }),
    queryFn: async () => {
      const { items, storeOpen } = await getStoreItems(params);
      return {
        items: items.filter(item => isCustomerVisibleItem(params.storeName, item)),
        storeOpen,
      };
    },
  });

  return {
    items: data?.items ?? [],
    storeOpen: data?.storeOpen ?? null,
    loading: isLoading,
    error: error,
    refetch: () => refetch(),
  };
}
