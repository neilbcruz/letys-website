import { NavLink } from 'react-router-dom';

export default function FaqPage() {
    // Styles
    const bannerClass = "bg-primary-3 p-4 tablet:px-8 desktop:px-40 text-center";
    const contentClass = "px-4 pt-4 text-left tablet:px-8 desktop:px-40 pb-8";
    const itemClass = "border border-black mb-4 flex flex-col";
    const questionClass = "bg-primary-3 p-2 text-primary-2 font-bold border-b border-primary-3";
    const answerClass = "p-2";
    const btnClass = "mt-2 p-1.5 bg-primary-1 border border-secondary-2 rounded-lg shadow-md font-bold text-sm hover:opacity-90";

    return (
        <div className="text-center w-full">
            <div className={bannerClass}>
                <h1 className="text-primary-2 font-bold text-2xl">FAQ</h1>
                <h3 className="font-bold text-sm my-2">For other questions, please send us a message through our contact page.</h3>
                <NavLink to='/contact'>
                    <button className={btnClass}>GET IN TOUCH</button>
                </NavLink>
            </div>

            <div className={contentClass}>
                {/* FAQ Items */}
                <div className={itemClass}>
                    <h2 className={questionClass}>Do you do delivery?</h2>
                    <p className={answerClass}>No, we do not offer delivery services but you can arrange for you own delivery service/pasabuys.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>Do you franchise?</h2>
                    <p className={answerClass}>No, we do not do franchises.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>I want to resell your product. Do you have a price list for bulk orders?</h2>
                    <p className={answerClass}>No, Lety's Buko Pie does not have any official resellers/distributors. We are not accountable for the quality of products sold by resellers.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>What are your store hours?</h2>
                    <p className={answerClass}>You can check our store hours in our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-primary-3">locations</NavLink> page.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>Where are your stores located?</h2>
                    <p className={answerClass}>You can check our store locations in our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-primary-3">locations</NavLink> page.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>Can I order and reserve online?</h2>
                    <p className={answerClass}>No, we do not do orders and reservations online.</p>
                </div>

                <div className={itemClass}>
                    <h2 className={questionClass}>What are your products?</h2>
                    <p className={answerClass}>You can check out our products in our <NavLink to='/products' className="font-bold text-primary-2 hover:text-primary-3">products</NavLink> page.</p>
                </div>
            </div>
        </div>
    )
}