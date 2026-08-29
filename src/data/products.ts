import { getResponsiveImage } from '@/lib/images';

// Central rules for per-store product availability
export const UNAVAILABLE_BY_STORE: Record<string, string[]> = {
  pansol: ['Frozen Buko Pie'],
};

// Products hidden across all stores (temporary). Remove names to show again.
export const HIDDEN_PRODUCTS: string[] = ['Oatmeal Cookies', 'Revel Bars'];

export function isAvailableInStore(
  storeId: string,
  productName: string
): boolean {
  if (HIDDEN_PRODUCTS.includes(productName)) return false;

  const normalizedStore = storeId.toLowerCase();

  return !UNAVAILABLE_BY_STORE[normalizedStore]?.includes(productName);
}

// Categories that are store supplies, not customer products.
export const HIDDEN_CATEGORIES: string[] = ['Miscellaneous'];

/**
 * Whether an inventory-feed item should be shown to customers — excludes
 * hidden categories, globally hidden products, and per-store exclusions.
 */
export function isCustomerVisibleItem(
  storeId: string,
  item: { name: string; category: string }
): boolean {
  const category = item.category.toLowerCase();
  if (HIDDEN_CATEGORIES.some(c => c.toLowerCase() === category)) return false;
  return isAvailableInStore(storeId, item.name);
}


/**
 * Find the ProductItem in products.ts matching the given GraphQL item name
 */
function findProductByName(name: string): ProductItem | undefined {
  const lowerName = name.toLowerCase();
  for (const category of PRODUCT_DATA) {
    const product = category.items.find(item => item.name.toLowerCase() === lowerName);
    if (product) return product;
  }
  return undefined;
}

/**
 * Resolve image from a GraphQL item name dynamically
 */
export function getInventoryImageFromName(itemName: string) {
  const product = findProductByName(itemName);
  if (!product || !product.image) {
    console.warn(`No image found for product: ${itemName}`);
    return undefined;
  }
  return getResponsiveImage(product.image);
}

export interface ProductItem {
    name: string;
    image?: string;
    price?: number | string;
    description?: string;
}

export interface ProductCategory {
    id: string;
    title: string;
    subtitle: string;
    layout: 'grid' | 'highlight' | 'list';
    heroImage?: string;
    items: ProductItem[];
}

export const PRODUCT_DATA: ProductCategory[] = [
    {
        id: 'specialty',
        title: 'Specialties',
        subtitle: "Lety's Buko Pie Specialty Pies",
        layout: 'grid',
        items: [
            { name: "Buko Pie", image: "buko_pie-3" },
            { name: "Pineapple Pie", image: "pineapple_pie-3" },
            { name: "Buko Pineapple Pie", image: "bp_pie-1" },
            { name: "Frozen Buko Pie", image: "frozen_pie-1" },
        ]
    },
    {
        id: 'bakedgoods',
        title: 'Baked Goods',
        subtitle: "Lety's Buko Pie Baked Goods",
        layout: 'highlight',
        items: [
            { name: "Cassava Cake", image: "cassava-3" }, 
            { name: "Banana Bread" },
            { name: "Carrot Cake" },
            { name: "Brownies" },
            { name: "Butterscotch" },
            { name: "Crinkles" },
        ]
    },
    {
        id: 'pasalubong',
        title: 'Pasalubongs',
        subtitle: "Lety's Buko Pie Pasalubongs",
        layout: 'list',
        heroImage: "pasalubong-2",
        items: [
            { name: "Apas" }, 
            { name: "Banana Chips" }, 
            { name: "Broas in Can", description: "(small & large)" },
            { name: "Broas Pack" }, 
            { name: "Garlic Bread" }, 
            { name: "Otap" },
            { name: "Puto Seko" }, 
            { name: "Honey", description: "(small & large)" },
            { name: "Miki Lucban" },
            { name: "Longanisa" }, 
            { name: "Uraro" }, 
            { name: "Halayang Ube" },
            { name: "Peanut Adobo", description: "(small & large)" },
            { name: "Bold", description: "(small & large)" },
            { name: "Mineral Water" },
        ]
    }
];
