import { getResponsiveImage } from '@/lib/images';

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
    return getResponsiveImage('fallback');
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