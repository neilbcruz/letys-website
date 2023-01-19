import './ProductSpecialty.scss';

import BukoPie from '../../assets/images/buko_pie-3.jpg';
import PineapplePie from '../../assets/images/pineapple_pie-3.jpg';

export default function ProductSpecialty() {
    return (
        <>
            <div className='specialty'>
                <div className='specialty__title'>
                    <h1>Specialties</h1>
                    <p>Lety's Buko Pie Specialty Pies</p>
                </div>
                <div className='specialty__product'>
                    <h3>Buko Pie</h3>
                    <img src={BukoPie} alt='Buko pie outside the box with a triangle cut piece' />
                </div>
                <div className='specialty__product'>
                    <h3>Pineapple Pie</h3>
                    <img src={PineapplePie} alt='Pineapple pie outside the box with a triangle cut piece' />
                </div>
            </div>
        </>
    )
}