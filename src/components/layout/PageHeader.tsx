import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactBurger from 'hamburger-react';
import { NAV_ITEMS } from '../../data/navItems';
import { IMAGES } from '../../data/images';
import ModalMenu from './ModalMenu';

export default function PageHeader() {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <header className="bg-primary-1 px-4 py-3 sm:px-8 sm:py-4 lg:px-40 lg:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      
      {/* LOGO + BURGER */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/">
          <img
            srcSet={IMAGES.LETYS_LOGO2}
            sizes="192px"
            width={192}
            height={64}
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
        <nav className="hidden tablet:flex items-center gap-8">
        {NAV_ITEMS.map(item => (
            <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
                `font-bold text-lg no-underline transition-colors duration-200 ${
                isActive ? 'text-secondary-2' : 'text-primary-2 hover:text-primary-3'
                }`
            }
            >
            {item.label}
            </NavLink>
        ))}
        </nav>

      {/* MOBILE MODAL MENU */}
      <ModalMenu closeModal={closeModal} isOpen={isOpen} />
    </header>
  );
}
