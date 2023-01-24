import './ProductPasa.scss';

import Pasalubong from '../../assets/images/pasalubong-2.png';

export default function ProductPasa() {
    return (
        <>
            <div className='pasalubong' id='pasalubong'>
                <div className='pasalubong__title'>
                    <h1>Pasalubongs</h1>
                    <p>Lety's Buko Pie Pasalubongs</p>
                    <img src={Pasalubong} alt='Buko pie outside the box with a triangle cut piece' />
                </div>
                <div className='pasalubong__list'>
                    <h3>Apas</h3>
                    <h3>Banana Chips</h3>
                    <h3>Broas in Can (small & large)</h3>
                    <h3>Broas Pack</h3>
                    <h3>Garlic Bread</h3>
                    <h3>Otap</h3>
                    <h3>Puto Seko</h3>
                    <h3>Honey (small & large)</h3>
                    <h3>Miki Lucban</h3>
                    <h3>Longanisa</h3>
                    <h3>Uraro</h3>
                    <h3>Halayang Ube</h3>
                    <h3>Peanut Adobo (small & large)</h3>
                    <h3>Bold (small & large)</h3>
                    <h3>Mineral Water</h3>
                </div>
            </div>
        </>
    )
}