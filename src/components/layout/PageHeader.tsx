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
    <header className="sticky top-0 z-40 px-4 py-3 shadow-md bg-primary-1 sm:px-8 sm:py-4 lg:px-40 lg:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        {/* LOGO + BURGER */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link to="/" aria-label="Lety's Buko Pie - Home">
            <img
              src={IMAGES.LETYS_LOGO2.default}
              srcSet={IMAGES.LETYS_LOGO2.srcSet}
              sizes="192px"
              width={192}
              height={64}
              alt="Lety's Buko Pie Logo"
              className="object-contain w-32 h-auto sm:w-40 lg:w-48"
            />
          </Link>
          
          {/* Burger menu for mobile */}
          <div className="z-50 sm:hidden" aria-label="Mobile menu toggle">
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
        <nav id="navigation" className="hidden gap-8 items-center tablet:flex" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-bold text-lg no-underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-2 rounded px-2 py-1 ${
                  isActive ? 'text-[#03200E]' : 'text-[#042B14] hover:text-[#03200E]'
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