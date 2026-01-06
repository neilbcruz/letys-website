import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'

// import BodyVideo from '../BodyVideo/BodyVideo';
import BukoTree from '../../assets/images/buko-tree.jpg';
import Lety from '../../assets/images/lety-1.jpg';
import BukoPie from '../../assets/images/buko_pie-12.jpg';
import Cassava from '../../assets/images/cassava-10.jpg';
import Pasalubong from '../../assets/images/pasalubong-2.png';
import MainStore from '../../assets/images/location-main.jpg';

export default function PageBody() {
    
    // Helper classes to keep the JSX readable
    const sectionClasses = "px-4 pt-4 pb-0 tablet:px-8 desktop:px-40";
    const h1Classes = "text-center text-primary-2 font-bold text-2xl py-3 border-y border-primary-2 mb-8 uppercase tracking-widest";
    const btnClasses = "p-1.5 bg-primary-1 border border-secondary-2 rounded-lg shadow-[5px_5px_5px_rgba(249,195,1,0.3)] cursor-pointer hover:opacity-90 transition font-bold text-sm inline-block";
    const pIndent = "indent-8 pb-2";

    return (
        <div className="w-full pb-8">
            {/* <div className="hidden tablet:block bg-black">
                <BodyVideo />
            </div> */}

            {/* --- BUKO FACTS --- */}
            <div className={sectionClasses}>
                <h1 className={h1Classes}>Buko Facts</h1>
                <div className="text-left tablet:flex tablet:justify-between tablet:gap-8">
                    <div className="flex-1">
                        <p className={pIndent}>Buko refers to a young, immature green coconut that haven't fully ripened and turned brown. They mostly contain water with little meat. As it matures at 8-10 months, the water becomes sweeter and the meat becomes jelly-like.</p>
                        <p className={pIndent}>Buko is packed with a lot of nutritional value and health benefits. They are also rich in antioxidant compounds that may protect against cellular damage and heart disease.</p>
                        <p className={pIndent}>Buko can be enjoyed in many different ways. You can enjoy the coconut water and the meat as refreshing dessert treats by themselves. They are also used in a lot of desserts like buko pandan, buko ice cream, and especially buko pie.</p>
                    </div>
                    <img src={BukoTree} alt='Young coconuts' className="w-full h-auto pt-4 tablet:w-60 tablet:pt-0 object-cover" />
                </div>
            </div>

            {/* --- ABOUT LETY --- */}
            <div className={sectionClasses}>
                <h1 className={h1Classes}>About Lety</h1>
                <div className="text-left tablet:flex tablet:justify-between tablet:gap-8">
                    <div className="flex-1">
                        <p className={pIndent}>Leticia Ocampo Belarmino is the person behind Lety's Special Buko Pie. She's a native in Los Baños and singlehandedly turned her hobby into a business.</p>
                        <p className={pIndent}>She started her business in 1976 using one oven. Her driving point to selling her buko pies were free time and boredom. She also wanted to use the extra money she earned to help her kids for their schooling.</p>
                        <p className={pIndent}>Now, she has multiple store locations in Laguna which is managed by her and family members.</p>
                    </div>
                    <img src={Lety} alt='Lety Belarmino' className="w-full h-auto pt-4 tablet:w-60 tablet:pt-0 object-cover" />
                </div>
            </div>

            {/* --- PRODUCTS (Manual Format + Fixed Layout) --- */}
            <div className={sectionClasses}>
                <h1 className={h1Classes}>Products</h1>
                <div className="text-center">
                    <p className="mb-6 font-medium text-lg">
                        Enjoy some of our products!<br/>Specialty Pies, Baked Goods, and Pasalubong!
                    </p>
                    
                    {/* 
                        FIXED LAYOUT:
                        1. flex-col (mobile) -> tablet:flex-row (side-by-side)
                        2. tablet:justify-center -> Centers them if they wrap
                        3. desktop:justify-between -> Spreads them out on big screens
                    */}
                    <div className="flex flex-col gap-8 tablet:flex-row tablet:flex-wrap tablet:justify-center desktop:justify-between">
                        
                        {/* ITEM 1: BUKO PIE */}
                        <div className="flex flex-col items-center text-center py-2 w-full tablet:w-auto group">
                            <h2 className="font-bold text-xl mb-2">Buko Pie</h2>
                            <img 
                                src={BukoPie} 
                                alt='Buko pie' 
                                className="w-[60%] h-auto pb-4 object-cover tablet:w-72 tablet:h-72 transition-transform duration-300 group-hover:scale-105" 
                            />
                            <HashLink to='/products/specialty#specialty'>
                                <button className={btnClasses}>VIEW SPECIALTY</button>
                            </HashLink>
                        </div>

                        {/* ITEM 2: CASSAVA CAKE */}
                        <div className="flex flex-col items-center text-center py-2 w-full tablet:w-auto group">
                            <h2 className="font-bold text-xl mb-2">Cassava Cake</h2>
                            <img 
                                src={Cassava} 
                                alt='Cassava cake' 
                                className="w-[60%] h-auto pb-4 object-cover tablet:w-72 tablet:h-72 transition-transform duration-300 group-hover:scale-105" 
                            />
                            <HashLink to='/products/bakedgoods#goods'>
                                <button className={btnClasses}>VIEW BAKED GOODS</button>
                            </HashLink>
                        </div>

                        {/* ITEM 3: BROAS */}
                        <div className="flex flex-col items-center text-center py-2 w-full tablet:w-auto group">
                            <h2 className="font-bold text-xl mb-2">Broas</h2>
                            <img 
                                src={Pasalubong} 
                                alt='Pasalubong' 
                                className="w-[60%] h-auto pb-4 object-cover tablet:w-72 tablet:h-72 transition-transform duration-300 group-hover:scale-105" 
                            />
                            <HashLink to='/products/pasalubong#pasalubong'>
                                <button className={btnClasses}>VIEW PASALUBONG</button>
                            </HashLink>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- LOCATION --- */}
            <div className={sectionClasses}>
                <h1 className={h1Classes}>Lety's Buko Pie Main Branch</h1>
                <div className="text-center flex flex-col items-center justify-center tablet:flex-row tablet:gap-12 desktop:gap-20 tablet:text-left">
                    <div className="flex flex-col items-center tablet:items-start space-y-4">
                        <div className="text-sm font-bold leading-relaxed">
                            <span className="text-lg block mb-1">Location:</span>
                            Lety's Buko Pie, National Road,<br/>
                            Barangay Anos, Los Baños, Laguna<br/>
                            (in front of Heaven's Memorial Garden)
                        </div>
                        
                        <NavLink to='/locations'>
                            <button className={btnClasses}>VIEW MORE LOCATION</button>
                        </NavLink>
                        
                        <div className="text-sm font-bold leading-relaxed pt-2">
                            <span className="text-lg block mb-1">Store Hours:</span>
                            Open daily from 6am to 6pm
                        </div>
                        
                        <NavLink to='/contact'>
                            <button className={btnClasses}>GET IN TOUCH</button>
                        </NavLink>
                    </div>
                    <img 
                        src={MainStore} 
                        alt='Main store view' 
                        className="hidden tablet:block tablet:w-80 desktop:w-[30rem] h-auto object-cover rounded-lg" 
                    />
                </div>
            </div>
        </div>
    )
}