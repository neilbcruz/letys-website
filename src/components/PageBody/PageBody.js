import './PageBody.scss';

import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'

import BodyVideo from '../BodyVideo/BodyVideo';
import BukoTree from '../../assets/images/buko-tree.jpg';
import Lety from '../../assets/images/lety-1.jpg';
import BukoPie from '../../assets/images/buko_pie-12.jpg';
import Cassava from '../../assets/images/cassava-10.jpg';
import Pasalubong from '../../assets/images/pasalubong-2.png';
import MainStore from '../../assets/images/location-main.png';

export default function PageBody() {
    return (
        <>
            <div className='body'>
                <div className='body__video'>
                    <BodyVideo />
                </div>
                <div className='body__buko'>
                    <h1>Buko Facts</h1>
                    <div className='body__buko-info'>
                        <p>Buko refers to a young, immature green coconut that haven't fully ripened and turned brown. They mostly contain water with little meat. As it matures at 8-10 months, the water becomes sweeter and the meat becomes jelly-like.<br></br>Buko is packed with a lot of nutritional value and health benefits. They are also rich in antioxidant compounds that may protect against cellular damage and heart disease.<br></br>Buko can be enjoyed in many different ways. You can enjoy the coconut water and the meat as refreshing dessert treats by themselves. They are also used in a lot of desserts like buko pandan, buko ice cream, and especially buko pie.</p>
                        <img src={BukoTree} alt='Six green young coconuts hanging from a tree' />
                    </div>
                </div>
                <div className='body__lety'>
                    <h1>About Lety</h1>
                    <div className='body__lety-info'>
                        <p>Leticia Ocampo Belarmino is the person behind Lety's Special Buko Pie. She's a native in Los Baños and singlehandedly turned her hobby into a business.<br></br>She started her business in 1976 using one oven. Her driving point to selling her buko pies were free time and boredom. She also wanted to use the extra money she earned to help her kids for their schooling.<br></br>Now, she has multiple store locations in Laguna which is managed by her and family members.</p>
                        <img src={Lety} alt='Lety Belarmino holding an book next to an article about her' />
                    </div>
                </div>
                <div className='body__products'>
                    <h1>Products</h1>
                    <div className='body__products-info'>
                        <p>Enjoy some of our products!<br></br>Specialty Pies, Baked Goods, and Pasalubong!</p>
                        <div className='body__products-item'>
                            <h2>Buko Pie</h2>
                            <img src={BukoPie} alt='Buko pie in a box slightly open and a triangle slice on a small plate' />
                            <HashLink to='/products/specialty#specialty'>
                                <button>VIEW SPECIALTY</button>
                            </HashLink>
                        </div>
                        <div className='body__products-item'>
                            <h2>Cassava Cake</h2>
                            <img src={Cassava} alt='Cassava cake on a board with a rectangular slice cut' />
                            <NavLink to='/products/bakedgoods'>
                                <button>VIEW BAKED GOODS</button>
                            </NavLink>
                        </div>
                        <div className='body__products-item'>
                            <h2>Broas</h2>
                            <img src={Pasalubong} alt='Various take away products from the pasalubong section' />
                            <NavLink to='/products/pasalubong'>
                                <button>VIEW PASALUBONG</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className='body__location'>
                    <h1>Lety's Buko Pie Main Branch</h1>
                    <div className='body__location-info'>
                        <h3>Location:<br></br>Lety's Buko Pie, National Road,<br></br>Barangay Anos, Los Baños, Laguna<br></br>(in front of Heaven's Memorial Garden)</h3>
                        <img src={MainStore} alt='Main store view' />
                        <NavLink to='/locations'>
                            <button>VIEW MORE LOCATION</button>
                        </NavLink>
                        <h3>Store Hours:<br></br>Open daily from 6am to 6pm</h3>
                        <NavLink to='/contact'>
                            <button>GET IN TOUCH</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}