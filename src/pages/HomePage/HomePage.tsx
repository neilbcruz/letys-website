import './HomePage.scss';

import PageHero from '../../components/PageHero/PageHero';
import PageBody from '../../components/PageBody/PageBody';

export default function HomePage() {
    return (
        <>
            <div className='home'>
                {/* <h1>Lety's Buko Pie</h1> */}
                <PageHero />
                <PageBody />
            </div>
        </>
    )
}