import './ProductsPage.scss';

import { NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';

import BukoPie from '../../assets/images/buko_pie-12.jpg';
import Cassava from '../../assets/images/cassava-10.jpg';
import Pasalubong from '../../assets/images/pasalubong-2.png';

export default function ProductsPage() {
    return (
        <>
            <div className='products'>
                <div className='products__title'>
                    <h1>Products</h1>
                    <h3>Enjoy Lety's Buko Pie's different selection of products from our pie specialties to various baked goods to pasalubongs</h3>
                </div>
                <div className='products__nav'>
                    <div className='products__nav-products'>
                        <NavLink to='specialty'>
                            <h2>Specialties</h2>
                            <img src={BukoPie} alt='Buko pie slice on a white plate with flower design' />
                        </NavLink>
                    </div>
                    <div className='products__nav-products'>
                        <NavLink to='bakedgoods'>
                            <h2>Baked Goods</h2>
                            <img src={Cassava} alt='Buko pie slice on a white plate with flower design' />
                        </NavLink>
                    </div>
                    <div className='products__nav-products'>
                        <NavLink to='pasalubong'>
                            <h2>Pasalubong</h2>
                            <img src={Pasalubong} alt='Buko pie slice on a white plate with flower design' />
                        </NavLink>
                    </div>
                </div>
                <div className='products__list'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}