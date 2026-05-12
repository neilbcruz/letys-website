// src/hooks/useStoreItems.ts
import { useQuery } from '@tanstack/react-query';
import { getStoreItems, type StoreItem, type QueryParams } from '@/services/graphql';
import { isAvailableInStore } from '@/data/products';
import { queryKeys } from './query-keys';

export interface UseStoreItemsResult {
  items: StoreItem[];
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
      const items = await getStoreItems(params);
      return items.filter(item => isAvailableInStore(params.storeName, item.name));
    },
  });

  return {
    items: data ?? [],
    loading: isLoading,
    error: error,
    refetch: () => refetch(),
  };
}
