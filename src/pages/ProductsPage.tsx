import { PRODUCT_DATA } from "@/data/products";
import type { ProductCategory, ProductItem } from "@/data/products";
import { useState, useEffect } from "react";
import { IMAGE_MAP } from "@/lib/images";

export const ProductCard = ({ item }: { item: ProductItem }) => {
  const imageData = item.image ? IMAGE_MAP[item.image] : undefined;
  if (!imageData) return null;

  return (
    <article className="card-elevated overflow-hidden group">
      <div className="relative overflow-hidden h-64 lg:h-80">
        <img
          src={imageData.default}
          srcSet={imageData.srcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary-2 mb-2">{item.name}</h3>
        {item.price && (
          <p className="text-2xl font-bold text-secondary-1" aria-label={`Price: ${item.price} pesos`}>
            ₱{item.price}
          </p>
        )}
      </div>
    </article>
  );
};

const CategorySection = ({ category }: { category: ProductCategory }) => {
  const hero = category.heroImage ? IMAGE_MAP[category.heroImage] : undefined;
  const highlight = category.items[0]?.image ? IMAGE_MAP[category.items[0].image] : undefined;

  return (
    <section className="section-padding animate-in fade-in duration-500" id={category.id}>
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="heading-primary">{category.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.subtitle}</p>

          {hero && (
            <div className="mt-8 flex justify-center">
              <img
                src={hero.default}
                srcSet={hero.srcSet}
                sizes="(max-width: 768px) 100vw, 600px"
                alt={`${category.title} featured image`}
                loading="lazy"
                className="rounded-2xl shadow-2xl max-w-md lg:max-w-lg w-full h-auto"
              />
            </div>
          )}
        </div>

        {/* GRID LAYOUT */}
        {category.layout === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {category.items.map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
        )}

        {/* HIGHLIGHT LAYOUT */}
        {category.layout === 'highlight' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="card-elevated overflow-hidden">
              <h3 className="text-2xl font-bold text-primary-2 p-6 pb-4">{category.items[0].name}</h3>
              {category.items[0].price && (
                <p className="text-2xl font-bold text-secondary-1 px-6 pb-4">₱{category.items[0].price}</p>
              )}
              {highlight && (
                <img
                  src={highlight.default}
                  srcSet={highlight.srcSet}
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  alt={category.items[0].name}
                  loading="lazy"
                  className="w-full h-auto"
                />
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary-2 mb-6">Other Baked Goods</h3>
              <div className="space-y-4">
                {category.items.slice(1).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0">
                    <span className="font-bold text-primary-2">{item.name}</span>
                    {item.price && <span className="text-lg font-bold text-secondary-1">₱{item.price}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIST LAYOUT */}
        {category.layout === 'list' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-primary-2">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    {item.price && (
                      <span className="text-lg font-bold text-secondary-1 ml-4">₱{item.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<string>('specialty');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && PRODUCT_DATA.some(cat => cat.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const activeData = PRODUCT_DATA.find(cat => cat.id === activeTab);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-br from-primary-2 to-primary-3 text-white py-12 lg:py-16">
        <div className="container-width text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl lg:text-2xl">Discover our delicious selection of Filipino treats</p>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-md" aria-label="Product categories">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-6 py-8">
            {PRODUCT_DATA.map(cat => {
              const navImage = IMAGE_MAP[cat.id];
              const isActive = activeTab === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-primary-1
                    ${isActive ? 'bg-primary-3/20 ring-2 ring-primary-2' : 'hover:bg-gray-100'}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`View ${cat.title}`}
                >
                  <h2 className={`text-lg font-bold ${isActive ? 'text-primary-2' : 'text-gray-700'}`}>
                    {cat.title}
                  </h2>
                  {navImage && (
                    <div className="relative overflow-hidden rounded-full ring-4 ring-white shadow-lg">
                      <img
                        src={navImage.default}
                        srcSet={navImage.srcSet}
                        sizes="(max-width: 640px) 80px, 120px"
                        alt=""
                        role="presentation"
                        loading="lazy"
                        className={`w-20 h-20 lg:w-32 lg:h-32 object-cover transition-transform duration-300
                          ${isActive ? 'scale-110' : 'hover:scale-105'}`}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Active Category Content */}
      <main id="main-content">
        {activeData && <CategorySection category={activeData} />}
      </main>
    </div>
  );
}