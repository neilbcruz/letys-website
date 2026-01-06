import BukoPie from '../../assets/images/buko_pie-3.jpg';
import PineapplePie from '../../assets/images/pineapple_pie-3.jpg';
import BukoPineapple from '../../assets/images/bp_pie-1.jpg';
import FrozenPie from '../../assets/images/frozen_pie-1.jpg';

export default function ProductSpecialty() {
    const itemContainer = "pt-4 w-full tablet:w-[48%] desktop:w-[23%]";
    const imgClass = "w-full h-auto pb-2 object-cover tablet:h-72 desktop:h-80";
    const titleClass = "font-bold text-lg mb-1";

    return (
        <div id='specialty' className="w-full">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Specialties</h1>
                <p>Lety's Buko Pie Specialty Pies</p>
            </div>
            
            <div className="tablet:flex tablet:flex-wrap tablet:justify-between tablet:gap-4">
                <div className={itemContainer}>
                    <h3 className={titleClass}>Buko Pie</h3>
                    <img src={BukoPie} alt='Buko pie' className={imgClass} />
                </div>
                <div className={itemContainer}>
                    <h3 className={titleClass}>Pineapple Pie</h3>
                    <img src={PineapplePie} alt='Pineapple pie' className={imgClass} />
                </div>
                <div className={itemContainer}>
                    <h3 className={titleClass}>Buko Pineapple Pie</h3>
                    <img src={BukoPineapple} alt='Buko pineapple' className={imgClass} />
                </div>
                <div className={itemContainer}>
                    <h3 className={titleClass}>Frozen Buko Pie</h3>
                    <img src={FrozenPie} alt='Frozen pie' className={imgClass} />
                </div>
            </div>
        </div>
    )
}