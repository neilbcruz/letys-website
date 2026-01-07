import Cassava from '../../assets/images/cassava-3.jpg';

export default function ProductGoods() {
    return (
        <div id='goods' className="w-full">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">Baked Goods</h1>
                <p>Lety's Buko Pie Baked Goods</p>
            </div>
            
            <div className="tablet:flex tablet:justify-center tablet:gap-4">
                <div className="pt-4 w-full tablet:w-72 desktop:w-80">
                    <h3 className="font-bold text-lg mb-1">Cassava Cake</h3>
                    <img src={Cassava} alt='Cassava cake' className="w-full h-auto pb-2 object-cover tablet:h-72 desktop:h-80" />
                </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary-2">
                <h2 className="font-bold text-xl mb-4">Other Baked Goods</h2>
                <div className="flex flex-col gap-2 font-bold text-primary-2">
                    <h3>Banana Bread</h3>
                    <h3>Carrot Cake</h3>
                    <h3>Brownies</h3>
                    <h3>Butterscotch</h3>
                    <h3>Crinkles</h3>
                </div>
            </div>
        </div>
    )
}