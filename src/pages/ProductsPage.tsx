// src/pages/MultiStoreInventoryPage.tsx
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import ProductCardWithStock from '@/components/products/ProductCardWithStock';
import SearchInput from '@/components/ui/SearchInput';
import { Loader2, AlertCircle, Package, Store } from 'lucide-react';
import { getInventoryLocations, getLocationByStoreId, formatHours } from '@/data/locations';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';

export default function ProductsPage() {
  const STORES = getInventoryLocations(); // Only get stores with inventory API
  
  const [selectedStore, setSelectedStore] = useState<string>(STORES[0]?.storeId || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { items, loading, error, refetch } = useStoreItems({
    storeName: selectedStore,
    pageNumber: 1,
    pageSize: 50,
    category: selectedCategory,
    itemName: searchTerm,
  });

  // Get unique categories from items
  const categories = Array.from(new Set(items.map(item => item.category))).sort();

  // Get current store info
  const currentStore = getLocationByStoreId(selectedStore);

  return (
    <div className="w-full min-h-screen bg-gray-50 [scrollbar-gutter:stable]">
      {/* Header */}
      <PageHeroNarrow
        title="Store Inventory"
        subtitle="Browse our current stock across all locations"
        icon={<Package size={32} aria-hidden="true" />}
      />

      {/* Store Selection Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="container-width">
          <div className="flex flex-col gap-4 py-6">
            {/* Store Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {STORES.map((store) => (
                <button
                  key={store.storeId}
                  onClick={() => {
                    setSelectedStore(store.storeId);
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-base
                    transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-1
                    ${selectedStore === store.storeId
                      ? 'bg-primary-2 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  aria-pressed={selectedStore === store.storeId}
                  aria-label={`View ${store.name} inventory`}
                >
                  <span className="text-2xl" aria-hidden="true">{store.icon}</span>
                  <span>{store.name}</span>
                </button>
              ))}
            </div>

            {/* Store Info Banner */}
            {currentStore && (
              <div className="flex gap-4 items-start p-4 rounded-lg bg-primary-3/10">
                <Store className="mt-1 text-primary-2 shrink-0" size={24} />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-primary-2">{currentStore.displayName}</h2>
                  <p className="text-sm text-gray-700">
                    {currentStore.address[0]} {currentStore.address[1]}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex gap-1 items-center">
                      <span className="font-medium">Hours:</span> 
                      {formatHours(currentStore.hours)}
                    </span>
                    <a
                      href={currentStore.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline text-primary-2 hover:text-primary-1"
                    >
                      Get Directions →
                    </a>
                  </div>
                  {currentStore.specialNotes && currentStore.specialNotes.length > 0 && (
                    <div className="p-2 mt-2 bg-amber-50 rounded border border-amber-200">
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Note:</span> {currentStore.specialNotes.join('; ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search */}
              <div className="flex-1">
                <SearchInput
                  placeholder="Search products..."
                  onSearch={setSearchTerm}
                  size="lg"
                  clearable
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 w-full h-14 text-base bg-white rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={refetch}
                disabled={loading}
                className="flex gap-2 justify-center items-center px-6 py-3 text-base btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Refresh inventory"
              >
                <Package size={20} aria-hidden="true" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main id="main-content">
        <section className="section-padding">
          <div className="container-width">
            {/* Loading State */}
            {loading && (
              <div className="flex flex-col justify-center items-center py-20">
                <Loader2 className="mb-4 w-12 h-12 animate-spin text-primary-2" />
                <p className="text-lg text-gray-600">Loading inventory for {currentStore?.name}...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mx-auto max-w-2xl">
                <div className="p-8 text-center bg-red-50 rounded-lg border-2 border-red-200">
                  <AlertCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
                  <h2 className="mb-2 text-xl font-bold text-red-800">
                    Failed to Load Inventory
                  </h2>
                  <p className="mb-4 text-red-700">{error.message}</p>
                  <button
                    onClick={refetch}
                    className="btn-primary"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && items.length > 0 && (
              <>
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary-2">
                    {items.length} {items.length === 1 ? 'Product' : 'Products'} Available
                    {selectedCategory && ` in ${selectedCategory}`}
                  </h2>
                  {(selectedCategory || searchTerm) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setSearchTerm('');
                      }}
                      className="underline transition text-primary-2 hover:text-primary-1"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <ProductCardWithStock key={item.itemId} item={item} />
                  ))}
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && !error && items.length === 0 && (
              <div className="py-20 mx-auto max-w-2xl text-center">
                <Package className="mx-auto mb-4 w-16 h-16 text-gray-400" />
                <h2 className="mb-2 text-2xl font-bold text-gray-700">
                  No Products Found
                </h2>
                <p className="mb-6 text-gray-600">
                  {searchTerm || selectedCategory
                    ? 'Try adjusting your filters or search terms.'
                    : `No products available at ${currentStore?.name} at the moment.`}
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                    }}
                    className="btn-secondary"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}