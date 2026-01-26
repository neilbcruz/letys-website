import { NavLink } from 'react-router-dom';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import { NAV_ITEMS } from '@/data/navItems';

interface ModalMenuProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ModalMenu({ isOpen, closeModal }: ModalMenuProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] overflow-y-auto"
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
          <div className="fixed inset-0 backdrop-blur-sm bg-black/60" />
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
            <DialogPanel className="overflow-hidden relative p-6 w-full max-w-sm text-center bg-white rounded-xl shadow-2xl transition-all transform">
              <DialogTitle 
                as="h2" 
                className="mb-6 text-2xl font-bold text-primary-2"
              >
                Menu
              </DialogTitle>
              
              {/* Navigation Links */}
              <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
                {NAV_ITEMS.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeModal}
                    className={({ isActive }) =>
                      `text-lg font-bold py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-1 ${
                        isActive 
                          ? 'bg-primary-3/20 text-primary-2' 
                          : 'text-primary-2 hover:text-primary-1 hover:bg-primary-3/10'
                      }`
                    }
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                className="mt-6 w-full btn-primary text-base py-2.5"
                aria-label="Close menu"
              >
                Close Menu
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}