import './ProductPasa.scss';

import { Outlet } from 'react-router-dom';

export default function ProductPasa() {
    return (
        <>
            <div className='pasalubong'>
                <h1>Pasalubong</h1>
                <Outlet />
            </div>
        </>
    )
}