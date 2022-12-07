import './PageHeader.scss';
import { NavLink } from 'react-router-dom';

import LetysLogo from '../../assets/images/letys-logo.jpg';

export default function PageHeader() {
    return (
        <>
        <header className='header'>
            <div className='header__top'>
                <img src={LetysLogo} alt='Yellow Background Letys Name with Coconut' />
            </div>
            <div className='header__nav'>
                <NavLink to='/'>
                    <h3>Home</h3>
                </NavLink>
                <NavLink to='/products'>
                    <h3>Products</h3>
                </NavLink>
                <NavLink to='/stores'>
                    <h3>Stores</h3>
                </NavLink>
                <NavLink to='/faq'>
                    <h3>FAQ</h3>
                </NavLink>
                <NavLink to='/contact'>
                    <h3>Contact</h3>
                </NavLink>
            </div>
        </header>
        </>
    )
}