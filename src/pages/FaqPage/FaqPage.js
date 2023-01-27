import './FaqPage.scss';

import { NavLink } from 'react-router-dom';

export default function FaqPage() {
    return (
        <>
            <div className='faq'>
                <div className='faq__title'>
                    <h1>FAQ</h1>
                    <h3>For other questions, please send us a message through our contact page.</h3>
                    <NavLink to='/contact'>
                        <button>GET IN TOUCH</button>
                    </NavLink>
                </div>
                <div className='faq__body'>
                    <div className='faq__body-details'>
                        <h2>Do you do delivery?</h2>
                        <p>No, we do not offer delivery services but you can arrange for you own delivery service/pasabuys.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>Do you franchise?</h2>
                        <p>No, we do not do franchises.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>I want to resell your product. Do you have a price list for bulk orders?</h2>
                        <p>No, Lety's Buko Pie does not have any official resellers/distributors. We are not accountable for the quality of products sold by resellers.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>What are your store hours?</h2>
                        <p>You can check our store hours in our <NavLink 
                        to='/locations'
                        >
                        locations
                        </NavLink> page.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>Where are your stores located?</h2>
                        <p>You can check our store locations in our <NavLink 
                        to='/locations'
                        >
                        locations
                        </NavLink> page.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>Can I order and reserve online?</h2>
                        <p>No, we do not do orders and reservations online.</p>
                    </div>
                    <div className='faq__body-details'>
                        <h2>What are your products?</h2>
                        <p>You can check out our products in our <NavLink 
                        to='/products'
                        >
                        products
                        </NavLink> page.</p>
                    </div>
                </div>
            </div>
        </>
    )
}