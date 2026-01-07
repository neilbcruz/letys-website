// Images
import BukoPie from '../assets/images/buko_pie-3.jpg';
import PineapplePie from '../assets/images/pineapple_pie-3.jpg';
import BukoPineapple from '../assets/images/bp_pie-1.jpg';
import FrozenPie from '../assets/images/frozen_pie-1.jpg';
import Cassava from '../assets/images/cassava-3.jpg';
import Pasalubong from '../assets/images/pasalubong-2.png';

export const PRODUCT_CATEGORIES = [
    {
        id: 'specialty',
        title: 'Specialties',
        subtitle: "Lety's Buko Pie Specialty Pies",
        type: 'grid', // Uses images
        items: [
            { name: "Buko Pie", img: BukoPie },
            { name: "Pineapple Pie", img: PineapplePie },
            { name: "Buko Pineapple Pie", img: BukoPineapple },
            { name: "Frozen Buko Pie", img: FrozenPie },
        ]
    },
    {
        id: 'bakedgoods',
        title: 'Baked Goods',
        subtitle: "Lety's Buko Pie Baked Goods",
        type: 'mixed', // Has one highlighted image, then a list
        highlight: { name: "Cassava Cake", img: Cassava },
        items: [
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
        type: 'list', // Just text
        heroImg: Pasalubong,
        items: [
            { name: "Apas" }, 
            { name: "Banana Chips" }, 
            { name: "Broas in Can (small & large)" },
            { name: "Broas Pack" }, 
            { name: "Garlic Bread" }, 
            { name: "Otap" },
            { name: "Puto Seko" }, 
            { name: "Honey (small & large)" }, 
            { name: "Miki Lucban" },
            { name: "Longanisa" }, 
            { name: "Uraro" }, 
            { name: "Halayang Ube" },
            { name: "Peanut Adobo (small & large)" }, 
            { name: "Bold (small & large)" },
            { name: "Mineral Water" },
        ]
    }
];