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
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          {/* Overlay */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary-1/90" />
          </TransitionChild>

          {/* Trick to center panel */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          {/* Panel */}
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <DialogTitle as="h3" className="text-2xl font-bold text-primary-2 mb-6">
                Menu
              </DialogTitle>
              
              {/* --- DYNAMIC NAV LINKS --- */}
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeModal}
                    className="text-primary-2 hover:text-secondary-2 font-bold text-xl"
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
              
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
