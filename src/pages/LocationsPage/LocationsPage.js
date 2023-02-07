import './LocationsPage.scss';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';

import MainStore from '../../assets/images/location-main.jpg';
import Agapita from '../../assets/images/location-agapita.jpg';
import Shell from '../../assets/images/location-shell.jpg';
import Pansol from '../../assets/images/location-pansol.jpg';

export default function LocationsPage() {
    const newTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <>
            <div className='locations'>
                <div className='locations__title'>
                    <h1>Locations</h1>
                </div>
                <div className='locations__stores'>
                    <div className='locations__stores-info main'>
                        <h2 onClick={() => newTab('https://goo.gl/maps/5X7KQ3frkvcYXyMf9')}>MAIN STORE</h2>
                        <h3>Location:</h3>
                        <h3>Lety's Buko Pie, National Road,</h3>
                        <h3>Barangay Anos, Los Baños, Laguna</h3>
                        <h3>(in front of Heaven's Memorial Garden)</h3>
                        <img onClick={() => newTab('https://goo.gl/maps/5X7KQ3frkvcYXyMf9')} src={MainStore} alt='Main store view' />
                        <h3>Store Hours:</h3>
                        <h3>Open daily from 6am to 6pm</h3>
                    </div>
                    <div className='locations__stores-info'>
                        <h2 onClick={() => newTab('https://goo.gl/maps/wQfUpTLt3cBWu29G6')}>AGAPITA BRANCH</h2>
                        <h3>Location:</h3>
                        <h3>Lety's Buko Pie, Agapita Plaza,</h3>
                        <h3>Barangay Batong Malake, Los Baños, Laguna</h3>
                        <h3>(near UPLB)</h3>
                        <img onClick={() => newTab('https://goo.gl/maps/wQfUpTLt3cBWu29G6')} src={Agapita} alt='Agapita branch of Letys Buko Pie' />
                        <h3>Store Hours:</h3>
                        <h3>Open daily from 6am to 5pm</h3>
                    </div>
                    <div className='locations__stores-info'>
                        <h2 onClick={() => newTab('https://goo.gl/maps/cD73huCuXU57BXfb6')}>ANOS SHELL BRANCH</h2>
                        <h3>Location:</h3>
                        <h3>56JH+HPC, National Hwy,</h3>
                        <h3>Barangay Anos, Los Baños, Laguna</h3>
                        <h3>(beside Shell Gas Station)</h3>
                        <img onClick={() => newTab('https://goo.gl/maps/cD73huCuXU57BXfb6')} src={Shell} alt='Shell branch of Letys Buko Pie' />
                        <h3>Store Hours:</h3>
                        <h3>Open Friday, Saturday, and Sunday</h3>
                        <h3>ONLY from 6am to 6pm</h3>
                    </div>
                    <div className='locations__stores-info'>
                        <h2 onClick={() => newTab('https://goo.gl/maps/aTFtvHWEaH5N8i54A')}>PANSOL BRANCH</h2>
                        <h3>Location:</h3>
                        <h3>Lety’s Buko Pie, Pansol,</h3>
                        <h3>Calamba City, Laguna</h3>
                        <h3>(near Cuyab Resort)</h3>
                        <img onClick={() => newTab('https://goo.gl/maps/aTFtvHWEaH5N8i54A')} src={Pansol} alt='Pansol branch of Letys Buko Pie' />
                        <h3>Store Hours:</h3>
                        <h3>Open daily from 7am to 5pm</h3>
                    </div>
                </div>
                <div className='locations__map'>
                    <GoogleMaps />
                </div>
            </div>
        </>
    )
}