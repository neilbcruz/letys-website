import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';

import MainStore from '../../assets/images/location-main.jpg';
import Agapita from '../../assets/images/location-agapita.jpg';
import Shell from '../../assets/images/location-shell.jpg';
import Pansol from '../../assets/images/location-pansol.jpg';

export default function LocationsPage() {
    const newTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // Styles
    const bannerClass = "bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40 text-center";
    const storeContainer = "px-4 pt-4 tablet:px-8 desktop:px-40 tablet:flex tablet:flex-wrap tablet:justify-between tablet:gap-4";
    const storeItem = "py-4 border-t border-primary-2 tablet:border-none w-full tablet:w-[48%] desktop:w-[22%] text-left";
    const storeTitle = "text-primary-2 font-bold text-lg cursor-pointer hover:text-secondary-1 mb-2";
    const storeImg = "w-full h-auto mt-2 object-cover cursor-pointer tablet:h-56 desktop:h-64 hover:opacity-90 transition";

    return (
        <div className="text-center w-full">
            <div className={bannerClass}>
                <h1 className="text-primary-2 font-bold text-2xl">Locations</h1>
            </div>

            <div className={storeContainer}>
                {/* Main Store */}
                <div className={storeItem}>
                    <h2 className={storeTitle} onClick={() => newTab('https://goo.gl/maps/5X7KQ3frkvcYXyMf9')}>MAIN STORE</h2>
                    <div className="text-sm font-bold text-gray-700">
                        <p>Location:</p>
                        <p>Lety's Buko Pie, National Road,</p>
                        <p>Barangay Anos, Los Baños, Laguna</p>
                        <p>(in front of Heaven's Memorial Garden)</p>
                    </div>
                    <img className={storeImg} onClick={() => newTab('https://goo.gl/maps/5X7KQ3frkvcYXyMf9')} src={MainStore} alt='Main store view' />
                    <div className="mt-2 text-sm font-bold">
                        <p>Store Hours:</p>
                        <p>Open daily from 6am to 6pm</p>
                    </div>
                </div>

                {/* Agapita */}
                <div className={storeItem}>
                    <h2 className={storeTitle} onClick={() => newTab('https://goo.gl/maps/wQfUpTLt3cBWu29G6')}>AGAPITA BRANCH</h2>
                    <div className="text-sm font-bold text-gray-700">
                        <p>Location:</p>
                        <p>Lety's Buko Pie, Agapita Plaza,</p>
                        <p>Barangay Batong Malake, Los Baños, Laguna</p>
                        <p>(near UPLB)</p>
                    </div>
                    <img className={storeImg} onClick={() => newTab('https://goo.gl/maps/wQfUpTLt3cBWu29G6')} src={Agapita} alt='Agapita branch' />
                    <div className="mt-2 text-sm font-bold">
                        <p>Store Hours:</p>
                        <p>Open daily from 6am to 5pm</p>
                    </div>
                </div>

                {/* Shell */}
                <div className={storeItem}>
                    <h2 className={storeTitle} onClick={() => newTab('https://goo.gl/maps/cD73huCuXU57BXfb6')}>ANOS SHELL BRANCH</h2>
                    <div className="text-sm font-bold text-gray-700">
                        <p>Location:</p>
                        <p>56JH+HPC, National Hwy,</p>
                        <p>Barangay Anos, Los Baños, Laguna</p>
                        <p>(beside Shell Gas Station)</p>
                    </div>
                    <img className={storeImg} onClick={() => newTab('https://goo.gl/maps/cD73huCuXU57BXfb6')} src={Shell} alt='Shell branch' />
                    <div className="mt-2 text-sm font-bold">
                        <p>Store Hours:</p>
                        <p>Open Fri, Sat, Sun ONLY from 6am to 6pm</p>
                    </div>
                </div>

                {/* Pansol */}
                <div className={storeItem}>
                    <h2 className={storeTitle} onClick={() => newTab('https://goo.gl/maps/aTFtvHWEaH5N8i54A')}>PANSOL BRANCH</h2>
                    <div className="text-sm font-bold text-gray-700">
                        <p>Location:</p>
                        <p>Lety’s Buko Pie, Pansol,</p>
                        <p>Calamba City, Laguna</p>
                        <p>(near Cuyab Resort)</p>
                    </div>
                    <img className={storeImg} onClick={() => newTab('https://goo.gl/maps/aTFtvHWEaH5N8i54A')} src={Pansol} alt='Pansol branch' />
                    <div className="mt-2 text-sm font-bold">
                        <p>Store Hours:</p>
                        <p>Open daily from 7am to 5pm</p>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="hidden tablet:block py-4 px-4 tablet:px-8 desktop:px-40">
                <GoogleMaps />
            </div>
        </div>
    )
}