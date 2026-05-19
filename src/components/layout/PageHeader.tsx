import { useState, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import ReactBurger from 'hamburger-react';
import { NAV_ITEMS } from '@/data/navItems';
import { useTheme } from '@/hooks/useTheme';
import { IMAGES } from '@/lib/images';
import ModalMenu from './ModalMenu';

export default function PageHeader() {
  const [isOpen, setOpen] = useState(false);
  const burgerButtonRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();

  const closeModal = () => {
    setOpen(false);
    // Return focus to burger button after modal closes
    setTimeout(() => {
      burgerButtonRef.current?.querySelector('button')?.focus();
    }, 0);
  };

  return (
    <header className="sticky top-0 z-40 bg-primary-1 px-[var(--space-4)] py-[var(--space-4)] shadow-md sm:px-[var(--space-8)] lg:px-[var(--space-20)] lg:py-[var(--space-6)]">
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
          <div ref={burgerButtonRef} className="z-50 sm:hidden" aria-label="Mobile menu toggle">
            <ReactBurger
              color="var(--color-brand-primary)"
              toggled={isOpen}
              toggle={setOpen}
              easing="ease-in"
              label="Toggle menu"
            />
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav id="navigation" className="hidden gap-4 items-center tablet:flex" aria-label="Main navigation">
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

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-stroke-default bg-surface-white p-3 text-primary-2 shadow-sm transition-colors duration-200 hover:bg-support-2 focus:outline-none focus:ring-2 focus:ring-primary-1 focus:ring-offset-2"
            aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {/* MOBILE MODAL MENU */}
      <ModalMenu closeModal={closeModal} isOpen={isOpen} />
    </header>
  );
}
