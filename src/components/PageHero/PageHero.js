import './PageHero.scss';

import Logo2 from '../../assets/images/letys-logo2.png';

export default function PageHero() {
    return (
        <>
            <div className='hero'>
                <div className='hero__title'>
                    {/* <h1>Lety's Buko Pie</h1> */}
                    <img src={Logo2} alt='Letys Buko Pie logo but vertical' />
                </div>
            </div>
        </>
    )
}