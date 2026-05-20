// src/components/products/ProductCardWithStock.tsx
import { useEffect } from 'react';
import { formatPrice, getDiscountPercentage, type StoreItem } from '@/services/graphql';
import StockBadge from '@/components/ui/StockBadge';
import { getInventoryImageFromName } from '@/data/products';
import { useGoogleAnalytics } from '@/components/seo';
import { ImageIcon } from 'lucide-react';

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

  // Check if this is a signature product (Buko Pie)
  const isSignature = item.name.toLowerCase().includes('buko pie');

  // Resolve image based on item.name (ignores imagePath)
  const imageData = getInventoryImageFromName(item.name);

  return (
    <article className="flex overflow-hidden flex-col h-full card-elevated group hover:border-brand-muted">
      {/* IMAGE CONTAINER */}
      <div className="overflow-hidden relative bg-surface-subtle aspect-square">
        {imageData?.default ? (
          <img
            src={imageData.default}
            srcSet={imageData.srcSet}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            alt={item.name}
            loading="lazy"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full bg-surface-muted text-fg-subtle">
            <ImageIcon size={48} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && discountPercentage > 0 && (
          <div className="absolute top-4 left-4">
            <span className="product-badge product-badge-error">
              {discountPercentage}% OFF
            </span>
          </div>
        )}

        {/* Signature Badge (for Buko Pie) */}
        {isSignature && !hasDiscount && (
          <div className="absolute top-4 left-4">
            <span className="product-badge product-badge-accent">
              Signature
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
        <p className="mb-1 text-xs font-bold tracking-wider text-fg-subtle uppercase">
          {item.category}
        </p>

        <h3 className="mb-2 text-xl font-bold text-brand line-clamp-1">
          {item.name}
        </h3>

        {item.description && (
          <p className="flex-1 mb-4 text-sm text-fg-muted line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="flex gap-2 items-baseline mb-4">
          {item.price && (
            <span className="text-2xl font-bold text-brand">
              {formatPrice(item.price)}
            </span>
          )}
          {hasDiscount && item.originalPrice && (
            <span className="text-sm text-fg-subtle line-through">
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
