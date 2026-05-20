import { NavLink } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS } from '@/data/navItems';
import { FocusTrap } from '@/components/accessibility';

interface ModalMenuProps {
  isOpen: boolean;
  closeModal: () => void;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function ModalMenu({ isOpen, closeModal, resolvedTheme, toggleTheme }: ModalMenuProps) {
  const themeLabel = resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-100 overflow-y-auto"
        onClose={closeModal}
      >
        {/* Backdrop overlay */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-surface-inverse/60" />
        </TransitionChild>

        {/* Container for centering */}
        <div className="flex fixed inset-0 justify-center items-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="overflow-hidden relative w-full max-w-sm rounded-xl border border-stroke-default bg-surface-base p-4 text-center shadow-2xl transition-[background-color,border-color,box-shadow,transform,opacity] duration-300 ease-out transform">
              <FocusTrap active={isOpen}>
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-stroke-default pb-4">
                <DialogTitle
                  as="h2"
                  className="text-xl font-bold text-brand"
                >
                  Menu
                </DialogTitle>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="group relative inline-flex h-11 w-[88px] items-center rounded-full border border-stroke-default bg-surface-subtle p-1 text-brand shadow-sm transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-muted hover:text-brand-hover hover:shadow-md active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface-base"
                    aria-label={themeLabel}
                    title={themeLabel}
                    aria-pressed={resolvedTheme === 'dark'}
                  >
                    <span
                      className={`absolute top-1 h-9 w-9 rounded-full bg-brand shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${
                        resolvedTheme === 'dark' ? 'translate-x-[43px]' : 'translate-x-0'
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={`absolute left-1 top-1 z-10 grid h-9 w-9 place-items-center text-fg-inverse transition-transform duration-300 ease-out motion-reduce:transition-none ${
                        resolvedTheme === 'dark' ? 'translate-x-[43px]' : 'translate-x-0'
                      }`}
                    >
                      <Sun className={`h-4 w-4 transition-opacity duration-200 ${resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                      <Moon className={`absolute h-4 w-4 transition-opacity duration-200 ${resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'}`} aria-hidden="true" />
                    </span>
                    <span
                      className={`relative z-10 w-full text-xs font-bold transition-[color,padding,text-align] duration-200 ${
                        resolvedTheme === 'dark' ? 'pl-3 pr-10 text-left' : 'pl-10 pr-3 text-right'
                      }`}
                      aria-hidden="true"
                    >
                      {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="group inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-stroke-default bg-surface-subtle text-brand shadow-sm transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-muted hover:text-brand-hover hover:shadow-md active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5 transition-transform duration-200 ease-out group-hover:rotate-90" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              {/* Navigation Links */}
              <nav id="mobile-navigation" className="flex flex-col gap-2" aria-label="Mobile navigation">
                {NAV_ITEMS.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeModal}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-left text-base font-bold transition-[background-color,color,transform] duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base ${
                        isActive
                          ? 'bg-brand text-fg-inverse shadow-sm'
                          : 'text-fg-base hover:translate-x-1 hover:bg-surface-muted hover:text-brand'
                      }`
                    }
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              </FocusTrap>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
