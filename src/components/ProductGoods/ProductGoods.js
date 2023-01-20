import './ProductGoods.scss';

import Cassava from '../../assets/images/cassava-3.jpg';

export default function ProductGoods() {
    return (
        <>
            <div className='goods' id='goods'>
                <div className='goods__title'>
                    <h1>Baked Goods</h1>
                    <p>Lety's Buko Pie Baked Goods</p>
                </div>
                <div className='specialty__product'>
                    <h3>Cassava Cake</h3>
                    <img src={Cassava} alt='Cassava cake on a board' />
                </div>
                <div className='specialty__list'>
                    <h2>Other Baked Goods</h2>
                    <h3>Banana Bread</h3>
                    <h3>Carrot Cake</h3>
                    <h3>Brownies</h3>
                    <h3>Butterscotch</h3>
                    <h3>Crinkles</h3>
                </div>
            </div>
        </>
    )
}