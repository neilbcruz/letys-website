import './PageHeader.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactBurger from 'hamburger-react';

import ModalMenu from '../ModalMenu/ModalMenu';

import LetysLogo from '../../assets/images/letys-logo.jpg';

export default function PageHeader() {
    const [isOpen, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }


    return (
        <>
            <header className='header'>
                <div className='header__top'>
                    <NavLink to='/'>
                        <img className='header__top-logo' src={LetysLogo} alt='Yellow Background Letys Name with Coconut' />
                    </NavLink>
                    <div className='header__top-burger'>
                        <ReactBurger
                            color='#014723'
                            easing="ease-in"
                            toggled={isOpen}
                            toggle={setOpen}
                            onToggle={toggled => {
                                if (toggled) {
                                    // open a menu
                                } if (!toggled) {
                                    // close a menu
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='header__nav'>
                    <NavLink to='/'>
                        <h3 onClick={closeModal}>Home</h3>
                    </NavLink>
                    <NavLink to='/products'>
                        <h3 onClick={closeModal}>Products</h3>
                    </NavLink>
                    <NavLink to='/locations'>
                        <h3 onClick={closeModal}>Locations</h3>
                    </NavLink>
                    <NavLink to='/faq'>
                        <h3 onClick={closeModal}>FAQ</h3>
                    </NavLink>
                    <NavLink to='/contact'>
                        <h3 onClick={closeModal}>Contact</h3>
                    </NavLink>
                    <ModalMenu
                        closeModal={closeModal}
                        isOpen={isOpen}
                    />
                </div>
            </header>
        </>
    )
}