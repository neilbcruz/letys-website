import './PageHeader.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ReactBurger from 'hamburger-react';

import ModalMenu from '../ModalMenu/ModalMenu';
// import Hamburger from '../Hamburger/Hamburger';

import LetysLogo from '../../assets/images/letys-logo.jpg';
// import HamburgerIcon from '../../assets/icons/hamb.svg';

export default function PageHeader() {
    const [isOpen, setOpen] = useState(false);

    // function openModal() {
    //     setOpen(true);
    // }

    function closeModal() {
        setOpen(false);
    }

    // function onToggle(toggled) {
    //     if (toggled) {
    //         // open a menu
    //         open
    //      } else {
    //         // close a menu
    //         closeModal
    //      }
    // }

    return (
        <>
            <header className='header'>
                <div className='header__top'>
                    <NavLink to='/'>
                        <img className='header__top-logo' src={LetysLogo} alt='Yellow Background Letys Name with Coconut' />
                    </NavLink>
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
                    {/* <Hamburger 
                    openModal={openModal}
                    setOpen={setOpen}
                    open={open}
                     /> */}
                    {/* <img className='header__top-hamburger' src={Hamburger} onClick={openModal} /> */}
                </div>
                <div className='header__nav'>
                    <NavLink to='/'>
                        <h3 onClick={closeModal}>Home</h3>
                    </NavLink>
                    <NavLink to='/products'>
                        <h3 onClick={closeModal}>Products</h3>
                    </NavLink>
                    <NavLink to='/stores'>
                        <h3 onClick={closeModal}>Stores</h3>
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