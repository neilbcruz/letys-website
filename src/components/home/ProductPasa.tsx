import Pasalubong from '../../assets/images/pasalubong-2.png';

export default function ProductPasa() {
    return (
        <div id='pasalubong' className="w-full">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Pasalubongs</h1>
                <p>Lety's Buko Pie Pasalubongs</p>
                <img 
                    src={Pasalubong} 
                    alt='Pasalubong items' 
                    className="w-full h-auto mt-4 object-cover tablet:h-72 desktop:h-80 tablet:w-72 desktop:w-80 mx-auto"
                />
            </div>
            
            <div className="mt-8 pt-4 border-t border-primary-2">
                <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 font-bold text-primary-2">
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
        </div>
    )
}