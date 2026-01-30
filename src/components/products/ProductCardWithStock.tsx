// src/components/products/ProductCardWithStock.tsx
import { useEffect } from 'react';
import { formatPrice, getDiscountPercentage, type StoreItem } from '@/services/graphql';
import StockBadge from '@/components/ui/StockBadge';
import { getInventoryImageFromName } from '@/data/products';
import { useGoogleAnalytics } from '@/components/seo';

interface ProductCardWithStockProps {
  item: StoreItem;
}

export default function ProductCardWithStock({ item }: ProductCardWithStockProps) {
  const { trackProductView } = useGoogleAnalytics();

  // Track product view when component mounts
  useEffect(() => {
    if (item.name) {
      trackProductView(item.name, item.category);
    }
  }, [item.name, item.category, trackProductView]);
  const hasDiscount = item.discount > 0 || (item.price && item.originalPrice && item.price < item.originalPrice);
  const discountPercentage = item.originalPrice && item.price
    ? getDiscountPercentage(item.originalPrice, item.price)
    : 0;

  // Resolve image based on item.name (ignores imagePath)
  const imageData = getInventoryImageFromName(item.name);

  return (
    <article className="flex overflow-hidden flex-col h-full card-elevated group">
      {/* IMAGE CONTAINER */}
      <div className="overflow-hidden relative bg-gray-100 aspect-square">
        {imageData ? (
          <img
            src={imageData.default}
            srcSet={imageData.srcSet}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            alt={item.name}
            loading="lazy"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full bg-gray-200">
            <img
              src="/assets/images/fallback.png"
              alt="Product placeholder"
              className="w-1/2 opacity-20"
            />
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercentage > 0 && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Stock Status (Top Right) */}
        <div className="absolute top-4 right-4">
          <StockBadge stockDetails={item.stockDetails} showQuantity={false} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6">
        <p className="mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
          {item.category}
        </p>

        <h3 className="mb-2 text-xl font-bold text-primary-2 line-clamp-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="flex-1 mb-4 text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex gap-2 items-baseline mb-4">
          {item.price && (
            <span className="text-2xl font-bold text-secondary-1">
              {formatPrice(item.price)}
            </span>
          )}
          {hasDiscount && item.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(item.originalPrice)}
            </span>
          )}
        </div>

        {/* Full Stock Badge at Bottom */}
        <StockBadge stockDetails={item.stockDetails} className="w-full" />
      </div>
    </article>
  );
}
