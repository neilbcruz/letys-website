import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '@/data/navItems';
import { useTheme } from '@/hooks/useTheme';
import { IMAGES } from '@/lib/images';
import ModalMenu from './ModalMenu';

export default function PageHeader() {
  const [isOpen, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activePill, setActivePill] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !hasScrolled && !isOpen;
  const themeLabel = resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  const updateActivePill = useCallback(() => {
    const activeLink = navItemRefs.current[location.pathname];
    const nav = navRef.current;

    if (!activeLink || !nav) {
      setActivePill({ left: 0, width: 0 });
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    setActivePill({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [location.pathname]);

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 0);
  };

  useLayoutEffect(() => {
    updateActivePill();
  }, [updateActivePill, isTransparent]);

  useEffect(() => {
    const updateScrolled = () => setHasScrolled(window.scrollY > 24);

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('resize', updateActivePill);

    return () => {
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('resize', updateActivePill);
    };
  }, [updateActivePill]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1200] border-b px-[var(--space-4)] py-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-[var(--ease-smooth)] sm:px-[var(--space-8)] lg:px-[var(--space-12)] ${
        isTransparent
          ? 'border-transparent bg-surface-inverse/10 text-fg-emphasis backdrop-blur-[2px]'
          : 'border-stroke-default bg-surface-base/95 text-fg-default shadow-md backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="shrink-0 rounded-md" aria-label="Lety's Buko Pie - Home">
          <span className="sr-only">Lety's Buko Pie</span>
          <span className="logo-plate block rounded-lg bg-surface-emphasis/80 px-2 py-1 shadow-sm ring-1 ring-stroke-default/70 backdrop-blur-sm transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md">
            <img
              src={IMAGES.LETYS_LOGO2.default}
              srcSet={IMAGES.LETYS_LOGO2.srcSet}
              sizes="192px"
              width={192}
              height={64}
              alt=""
              className="header-logo-image h-auto w-32 object-contain sm:w-40 lg:w-44"
            />
          </span>
        </Link>

        <nav
          ref={navRef}
          id="navigation"
          className={`relative hidden items-center gap-1 overflow-hidden rounded-full border px-2 py-1 shadow-sm backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-smooth)] tablet:flex ${
            isTransparent
              ? 'border-fg-emphasis/20 bg-surface-inverse/25'
              : 'border-stroke-default bg-surface-base/85'
          }`}
          aria-label="Main navigation"
        >
          <span
            className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-brand shadow-sm transition-[left,width,background-color,opacity] duration-[360ms] ease-[var(--ease-spring)] motion-reduce:transition-none"
            style={{
              left: activePill.left,
              width: activePill.width,
              opacity: activePill.width ? 1 : 0,
            }}
            aria-hidden="true"
          />
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              ref={node => {
                navItemRefs.current[item.path] = node;
              }}
              className={({ isActive }) =>
                `relative z-10 rounded-full px-4 py-2 text-sm font-bold no-underline transition-[color,background-color,transform] duration-200 ease-[var(--ease-smooth)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base ${
                  isActive
                    ? 'text-fg-inverse'
                    : isTransparent
                      ? 'text-fg-emphasis hover:bg-fg-emphasis/10 hover:text-fg-emphasis hover:-translate-y-0.5'
                      : 'text-fg-base hover:bg-surface-muted hover:text-brand hover:-translate-y-0.5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className={`group relative inline-flex h-11 w-[88px] items-center rounded-full border p-1 shadow-sm transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface-base ${
              isTransparent
                ? 'border-fg-emphasis/20 bg-surface-inverse/25 text-fg-emphasis hover:bg-fg-emphasis/10'
                : 'border-stroke-default bg-surface-base/85 text-brand hover:bg-surface-muted hover:text-brand-hover'
            }`}
            aria-label={themeLabel}
            title={themeLabel}
            aria-pressed={resolvedTheme === 'dark'}
          >
            <span
              className={`absolute top-1 h-9 w-9 rounded-full bg-brand shadow-sm transition-transform duration-[360ms] ease-[var(--ease-spring)] motion-reduce:transition-none ${
                resolvedTheme === 'dark' ? 'translate-x-[43px]' : 'translate-x-0'
              }`}
              aria-hidden="true"
            />
            <span
              className={`absolute left-1 top-1 z-10 grid h-9 w-9 place-items-center text-fg-inverse transition-transform duration-[360ms] ease-[var(--ease-spring)] motion-reduce:transition-none ${
                resolvedTheme === 'dark' ? 'translate-x-[43px]' : 'translate-x-0'
              }`}
            >
              <Sun className={`h-4 w-4 transition-opacity duration-200 ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
              <Moon className={`absolute h-4 w-4 transition-opacity duration-200 ${resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
            </span>
            <span
              className={`relative z-10 w-full text-xs font-bold transition-[color,padding,text-align] duration-200 ${
                resolvedTheme === 'dark' ? 'pl-3 pr-10 text-left' : 'pl-10 pr-3 text-right'
              } ${
                isTransparent ? 'text-fg-emphasis' : 'text-fg-base'
              }`}
              aria-hidden="true"
            >
              {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
            </span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(current => !current)}
            className={`group inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border shadow-sm transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand tablet:hidden ${
              isTransparent
                ? 'border-fg-emphasis/20 bg-surface-inverse/25 text-fg-emphasis hover:bg-fg-emphasis/10'
                : 'border-stroke-default bg-surface-base/85 text-brand hover:bg-surface-muted hover:text-brand-hover'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-5 w-5 transition-transform duration-200 ease-out group-hover:rotate-90" aria-hidden="true" /> : <Menu className="h-5 w-5 transition-transform duration-200 ease-out group-hover:scale-110" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* MOBILE MODAL MENU */}
      <ModalMenu
        closeModal={closeModal}
        isOpen={isOpen}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
      />
    </header>
  );
}
