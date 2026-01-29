// src/examples/QuickStartInventory.tsx
// QUICK START EXAMPLE - Minimal inventory display component

import { useStoreItems } from '@/hooks/useStoreItems';
import StockBadge from '@/components/ui/StockBadge';
import { formatPrice } from '@/services/graphql';

export default function QuickStartInventory() {
  // Fetch items from the main store
  const { items, loading, error } = useStoreItems({
    storeName: 'letysbukopie-main',
    pageNumber: 1,
    pageSize: 20,
  });

  // Loading state
  if (loading) {
    return (
      <div className="py-16 container-width">
        <div className="text-center">
          <div className="inline-block w-12 h-12 rounded-full border-4 border-gray-300 animate-spin border-t-primary-2"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-16 container-width">
        <div className="p-6 mx-auto max-w-2xl bg-red-50 rounded-lg border-2 border-red-200">
          <h2 className="mb-2 text-xl font-bold text-red-800">Error Loading Inventory</h2>
          <p className="text-red-700">{error.message}</p>
        </div>
      </div>
    );
  }

  // Success state - display products
  return (
    <div className="py-16 container-width">
      <h2 className="mb-12 text-center heading-primary">Available Products</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.itemId} className="overflow-hidden bg-white rounded-lg shadow-lg">
            {/* Product Name */}
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold text-primary-2">
                {item.name}
              </h3>
              
              {/* Category */}
              <p className="mb-3 text-sm text-gray-500">
                {item.category}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="text-2xl font-bold text-secondary-1">
                  {formatPrice(item.price)}
                </span>
                {item.price < item.originalPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Badge */}
              <StockBadge stockDetails={item.stockDetails} className="justify-center w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* No items */}
      {items.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-xl text-gray-600">No products available</p>
        </div>
      )}
    </div>
  );
}

// USAGE EXAMPLE:
// Import this component in any page:
// 
// import QuickStartInventory from '@/examples/QuickStartInventory';
// 
// function MyPage() {
//   return (
//     <div>
//       <h1>My Store</h1>
//       <QuickStartInventory />
//     </div>
//   );
// }