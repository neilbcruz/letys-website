import BukoPie from '../assets/images/buko_pie-3.jpg';
import PineapplePie from '../assets/images/pineapple_pie-3.jpg';
import BukoPineapple from '../assets/images/bp_pie-1.jpg';
import FrozenPie from '../assets/images/frozen_pie-1.jpg';
import Cassava from '../assets/images/cassava-3.jpg';
import Pasalubong from '../assets/images/pasalubong-2.png';

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
            // Example of how to add a price later:
            // { name: "Buko Pie", img: BukoPie, price: 280 },
            { name: "Buko Pie", image: BukoPie }, 
            { name: "Pineapple Pie", image: PineapplePie },
            { name: "Buko Pineapple Pie", image: BukoPineapple },
            { name: "Frozen Buko Pie", image: FrozenPie },
        ]
    },
    {
        id: 'bakedgoods',
        title: 'Baked Goods',
        subtitle: "Lety's Buko Pie Baked Goods",
        layout: 'highlight',
        items: [
            // The first item here will be the "Highlight"
            { name: "Cassava Cake", image: Cassava }, 
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
        heroImage: Pasalubong,
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