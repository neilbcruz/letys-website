import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactBurger from 'hamburger-react';

import ModalMenu from './ModalMenu';
import LetysLogo2 from '../../assets/images/letys-logo2.png';

export default function PageHeader() {
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-bold text-lg transition-colors duration-200 ${
      isActive
        ? 'text-secondary-2' // Active: Bright green
        : 'text-primary-2 hover:text-primary-3' // Base: Dark green, Hover: Light green
    }`;

  return (
    <header className="bg-primary-1 px-4 py-3 sm:px-8 sm:py-4 lg:px-40 lg:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      
      {/* LOGO + BURGER */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/">
          <img
            src={LetysLogo2}
            alt="Lety's Buko Pie Logo"
            className="w-32 sm:w-40 lg:w-48 h-auto object-contain"
          />
        </Link>

        {/* Burger menu for mobile */}
        <div className="sm:hidden">
          <ReactBurger
            color="#014723"
            toggled={isOpen}
            toggle={setOpen}
            easing="ease-in"
          />
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClasses}>
          Products
        </NavLink>
        <NavLink to="/locations" className={linkClasses}>
          Locations
        </NavLink>
        <NavLink to="/faq" className={linkClasses}>
          FAQ
        </NavLink>
        <NavLink to="/contact" className={linkClasses}>
          Contact
        </NavLink>
      </nav>

      {/* MOBILE MODAL MENU */}
      <ModalMenu closeModal={closeModal} isOpen={isOpen} />
    </header>
  );
}
