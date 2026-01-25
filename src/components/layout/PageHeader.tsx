// PageHeader.tsx
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactBurger from 'hamburger-react';
import { NAV_ITEMS } from '@/data/navItems';
import { IMAGES } from '@/lib/images';
import ModalMenu from './ModalMenu';

export default function PageHeader() {
  const [isOpen, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <header className="bg-primary-1 px-4 py-3 sm:px-8 sm:py-4 lg:px-40 lg:py-5 shadow-md sticky top-0 z-50">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* LOGO + BURGER */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link to="/" aria-label="Lety's Buko Pie - Home">
            <img
              src={IMAGES.LETYS_LOGO2.default}
              srcSet={IMAGES.LETYS_LOGO2.srcSet}
              sizes="192px"
              width={192}
              height={64}
              alt="Lety's Buko Pie Logo"
              className="w-32 sm:w-40 lg:w-48 h-auto object-contain"
            />
          </Link>
          
          {/* Burger menu for mobile */}
          <div className="sm:hidden" aria-label="Mobile menu toggle">
            <ReactBurger
              color="#074621"
              toggled={isOpen}
              toggle={setOpen}
              easing="ease-in"
              label="Toggle menu"
            />
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden tablet:flex items-center gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-bold text-lg no-underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-2 rounded px-2 py-1 ${
                  isActive ? 'text-primary-2' : 'text-primary-2/80 hover:text-primary-2'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* MOBILE MODAL MENU */}
      <ModalMenu closeModal={closeModal} isOpen={isOpen} />
    </header>
  );
}
