import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactBurger from 'hamburger-react';

import ModalMenu from '../ModalMenu/ModalMenu';
import LetysLogo2 from '../../assets/images/letys-logo2.png';

export default function PageHeader() {
    const [isOpen, setOpen] = useState(false);

    function closeModal() {
        setOpen(false);
    }

    // Base: text-primary-2 (Dark Green)
    // Hover/Active: text-primary-3 (Light Green - as seen in your .active class)
    const linkClasses = ({ isActive }: { isActive: boolean }) => 
        `font-bold text-lg no-underline transition-colors duration-200 ${
            isActive 
            ? 'text-primary-3' 
            : 'text-primary-2 hover:text-primary-3'
        }`;

    return (
        <>
            {/* 
               HEADER CONTAINER
               - bg-primary-1: Matches $prim-color-1 (Yellow)
               - Padding Logic:
                 Mobile: px-4 py-2 (0.5rem 1rem)
                 Tablet: px-8 py-4 (1rem 2rem)
                 Desktop: px-40 py-5 (1.25rem 10rem)
               - Flex Logic (Tablet+): Matches @include tablet { display: flex... }
            */}
            <header className='bg-primary-1 px-4 py-2 tablet:px-8 tablet:py-4 desktop:px-40 desktop:py-5 tablet:flex tablet:items-center tablet:justify-between'>
                
                {/* 
                   TOP SECTION (Logo + Burger) 
                   - On Mobile: w-full, flex justify-between
                   - On Tablet: w-auto (Burger disappears)
                */}
                <div className='flex items-center justify-between w-full tablet:w-auto'>
                    <Link to='/'>
                        {/* 
                           LOGO SIZING
                           Mobile: w-32 (8rem)
                           Tablet: w-40 (10rem)
                           Desktop: w-48 (12rem)
                        */}
                        <img 
                            className='w-32 h-auto pt-2 tablet:pt-0 tablet:w-40 desktop:w-48 object-contain' 
                            src={LetysLogo2} 
                            alt="Lety's Buko Pie Logo" 
                        />
                    </Link>

                    {/* BURGER (Mobile Only) - Matches @include tablet { display: none } */}
                    <div className='block tablet:hidden'>
                        <ReactBurger
                            color='#014723' // Dark Green
                            easing="ease-in"
                            toggled={isOpen}
                            toggle={setOpen}
                        />
                    </div>
                </div>

                {/* 
                   NAV LINKS (Tablet/Desktop Only)
                   - Hidden on mobile
                   - Flex on tablet+ 
                   - Gap-8 (2rem)
                */}
                <nav className='hidden tablet:flex items-center gap-8'>
                    <NavLink to='/' className={linkClasses}>
                        Home
                    </NavLink>
                    <NavLink to='/products' className={linkClasses}>
                        Products
                    </NavLink>
                    <NavLink to='/locations' className={linkClasses}>
                        Locations
                    </NavLink>
                    <NavLink to='/faq' className={linkClasses}>
                        FAQ
                    </NavLink>
                    <NavLink to='/contact' className={linkClasses}>
                        Contact
                    </NavLink>
                </nav>

                {/* MODAL (Passed props remain the same) */}
                <ModalMenu
                    closeModal={closeModal}
                    isOpen={isOpen}
                />
            </header>
        </>
    )
}