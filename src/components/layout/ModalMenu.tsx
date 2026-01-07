import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalMenuProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ModalMenu({ isOpen, closeModal }: ModalMenuProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
        aria-label="Main menu"
      >
        <div className="min-h-screen px-4 text-center">
          {/* Overlay */}
          <TransitionChild
            as={Fragment}
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
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white rounded-lg shadow-xl relative">
              
              {/* Close button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-primary-2 hover:text-secondary-2"
                aria-label="Close menu"
              >
                ✕
              </button>

              {/* Menu heading */}
              <h3 className="text-2xl font-bold text-primary-2 mb-6">Menu</h3>

              {/* Links */}
              <nav className="flex flex-col gap-4">
                <a href="/" onClick={closeModal} className="text-primary-2 hover:text-secondary-2 font-bold text-xl">
                  Home
                </a>
                <a href="/products" onClick={closeModal} className="text-primary-2 hover:text-secondary-2 font-bold text-xl">
                  Products
                </a>
                <a href="/locations" onClick={closeModal} className="text-primary-2 hover:text-secondary-2 font-bold text-xl">
                  Locations
                </a>
                <a href="/faq" onClick={closeModal} className="text-primary-2 hover:text-secondary-2 font-bold text-xl">
                  FAQ
                </a>
                <a href="/contact" onClick={closeModal} className="text-primary-2 hover:text-secondary-2 font-bold text-xl">
                  Contact
                </a>
              </nav>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
