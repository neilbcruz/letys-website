import { NavLink, Outlet } from "react-router-dom";

import BukoPie from '../../assets/images/buko_pie-12.jpg';
import Cassava from '../../assets/images/cassava-10.jpg';
import Pasalubong from '../../assets/images/pasalubong-2.png';

export default function ProductsPage() {
    // Reusable styles
    const bannerClass = "bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40 text-center";
    const navItemClass = "flex flex-col items-center p-4 hover:opacity-80 transition group";
    const imgClass = "w-20 h-20 mt-2 object-cover rounded-full tablet:w-40 tablet:h-40 desktop:w-48 desktop:h-48";
    const linkTextClass = "text-primary-2 font-bold text-lg group-hover:text-secondary-1 decoration-0";

    return (
        <div className="text-center w-full">
            {/* Title Banner */}
            <div className={bannerClass}>
                <h1 className="text-primary-2 font-bold text-2xl mb-2">Products</h1>
                <h3 className="text-sm tablet:text-base text-primary-2">
                    Enjoy Lety's Buko Pie's different selection of products from our pie specialties to various baked goods to pasalubongs
                </h3>
            </div>

            {/* Navigation Grid */}
            <div className="flex flex-wrap justify-around gap-4 p-4 tablet:px-8 desktop:px-40">
                
                <NavLink to='specialty' className={navItemClass}>
                    <h2 className={linkTextClass}>Specialties</h2>
                    <img src={BukoPie} alt='Buko pie slice' className={imgClass} />
                </NavLink>

                <NavLink to='bakedgoods' className={navItemClass}>
                    <h2 className={linkTextClass}>Baked Goods</h2>
                    <img src={Cassava} alt='Cassava cake' className={imgClass} />
                </NavLink>

                <NavLink to='pasalubong' className={navItemClass}>
                    <h2 className={linkTextClass}>Pasalubong</h2>
                    <img src={Pasalubong} alt='Pasalubong items' className={imgClass} />
                </NavLink>
            </div>

            {/* Nested Routes Render Here */}
            <div className="m-4 pt-4 border-t border-primary-2 tablet:m-8 desktop:mx-40">
                <Outlet />
            </div>
        </div>
    )
}