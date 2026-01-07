import { PRODUCT_DATA } from "../data/products";
import type { ProductCategory, ProductItem } from "../data/products";
import { useState, useEffect } from "react";
import { IMAGE_MAP } from "../data/images";

// --- SUB-COMPONENTS ---
const ProductCard = ({ item }: { item: ProductItem }) => {
  const imageUrl = item.image ? IMAGE_MAP[item.image.replace(/\.(jpg|png)$/, '')] : undefined;

  return (
    <div className="w-full tablet:w-[48%] desktop:w-[23%] flex flex-col pt-4 group">
      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
      {item.price && <span className="text-secondary-1 font-bold text-sm mb-1">₱{item.price}</span>}
      {imageUrl && (
        <img
            srcSet={IMAGE_MAP[item.image?.replace(/\.(jpg|png)$/, '') || '']}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 100vw"
            alt={item.name}
            loading="lazy"
            className="w-full h-auto pb-2 object-cover tablet:h-72 desktop:h-80 rounded-sm shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
      )}
    </div>
  );
};

const CategorySection = ({ category }: { category: ProductCategory }) => {
  const heroUrl = category.heroImage ? IMAGE_MAP[category.heroImage.replace(/\.(jpg|png)$/, '')] : undefined;
  const highlightUrl = category.layout === 'highlight' && category.items[0]?.image
    ? IMAGE_MAP[category.items[0].image.replace(/\.(jpg|png)$/, '')]
    : undefined;

  return (
    <div className="w-full mb-12 animate-in fade-in duration-500">
      {/* Title & Subtitle */}
      <div className="mb-4">
        <h1 className="font-bold text-2xl mb-2">{category.title}</h1>
        <p>{category.subtitle}</p>

        {heroUrl && (
          <img
            src={heroUrl}
            alt={category.title}
            loading="lazy"
            className="w-full h-auto mt-4 object-cover tablet:h-72 desktop:h-80 tablet:w-72 desktop:w-80 mx-auto"
          />
        )}
      </div>

      {/* Layout */}
      <div className={`
        ${category.layout === 'grid' ? 'tablet:flex tablet:flex-wrap tablet:justify-between tablet:gap-4' : ''}
        ${category.layout === 'highlight' ? 'tablet:flex tablet:justify-center tablet:gap-4' : ''}
        ${category.layout === 'list' ? 'mt-8 pt-4 border-t border-primary-2' : ''}
      `}>
        {/* GRID */}
        {category.layout === 'grid' && category.items.map((item, idx) => (
          <ProductCard key={idx} item={item} />
        ))}

        {/* HIGHLIGHT */}
        {category.layout === 'highlight' && (
          <>
            <div className="pt-4 w-full tablet:w-72 desktop:w-80 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-1">{category.items[0].name}</h3>
              {category.items[0].price && <p className="text-secondary-1 font-bold">₱{category.items[0].price}</p>}
              {highlightUrl && (
                <img
                  src={highlightUrl}
                  alt={category.items[0].name}
                  loading="lazy"
                  className="w-full h-auto pb-2 object-cover tablet:h-72 desktop:h-80"
                />
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-primary-2 w-full tablet:w-auto tablet:border-none tablet:mt-0 tablet:pt-4 tablet:flex tablet:flex-col tablet:justify-center">
              <h2 className="font-bold text-xl mb-4 tablet:hidden">Other Baked Goods</h2>
              <div className="flex flex-col gap-2 font-bold text-primary-2 text-left tablet:pl-8">
                {category.items.slice(1).map((item, idx) => (
                  <div key={idx} className="flex justify-between w-full max-w-xs border-b border-gray-100 py-1">
                    <span>{item.name}</span>
                    {item.price && <span>₱{item.price}</span>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* LIST */}
        {category.layout === 'list' && (
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 font-bold text-primary-2 text-left">
            {category.items.map((item, idx) => (
              <div key={idx} className="flex justify-center gap-6">
                <span>{item.name} <span className="font-normal text-sm text-gray-500">{item.description}</span></span>
                {item.price && <span className="text-secondary-1">₱{item.price}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('specialty');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && PRODUCT_DATA.some(cat => cat.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const NAV_IMAGES: Record<string, string> = {
    specialty: IMAGE_MAP['buko_pie-12'],
    bakedgoods: IMAGE_MAP['cassava-10'],
    pasalubong: IMAGE_MAP['pasalubong-2'],
  };

  const activeData = PRODUCT_DATA.find(cat => cat.id === activeTab);

  return (
    <div className="text-center w-full min-h-screen">
      {/* Banner */}
      <div className="bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40 text-center">
        <h1 className="text-primary-2 font-bold text-2xl mb-2">Products</h1>
        <h3 className="text-sm tablet:text-base text-primary-2">
          Enjoy Lety's Buko Pie's selection of products.
        </h3>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-6 p-4 tablet:px-8 desktop:px-40 mb-8">
        {PRODUCT_DATA.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
          	  className={`
              flex flex-col items-center p-4 rounded-xl transition-all duration-300
              ${activeTab === cat.id 
                ? 'bg-primary-3 scale-105 shadow-md ring-2 ring-primary-2' 
                : 'hover:bg-gray-50 hover:opacity-80 opacity-60'}
            `}
          >
            <h2 className={`font-bold text-lg mb-2 ${activeTab === cat.id ? 'text-primary-2' : 'text-gray-500'}`}>
              {cat.title}
            </h2>
            {NAV_IMAGES[cat.id] && (
              <img
                src={NAV_IMAGES[cat.id]}   // normal src for nav
                alt={cat.title}
                loading="lazy"
                className="w-20 h-20 object-cover rounded-full shadow-sm tablet:w-32 tablet:h-32 desktop:w-40 desktop:h-40"
              />
            )}
          </button>
        ))}
      </div>

      {/* Active Content */}
      <div className="px-4 tablet:px-8 desktop:px-40 pb-12">
        {activeData && <CategorySection category={activeData} />}
      </div>
    </div>
  );
}
