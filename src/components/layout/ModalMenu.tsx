import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Close from '../../assets/icons/close.svg';

interface ModalMenuProps {
  isOpen: boolean;
  closeModal: () => void;
}

Modal.setAppElement('#root');

export default function ModalMenu({ closeModal, isOpen }: ModalMenuProps) {
    const linkClass = "no-underline text-primary-2 hover:text-secondary-2 text-xl font-bold my-4 cursor-pointer";

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            // Tailwind classes for the modal content
            className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col items-center justify-center outline-none"
            // Tailwind classes for the background overlay
            overlayClassName="fixed inset-0 bg-primary-1/90 z-[2000]"
        >
            <button onClick={closeModal} className="absolute top-4 right-4 cursor-pointer">
                <img src={Close} alt='Close modal' className="w-8" />
            </button>
            
            <div className="flex flex-col text-center">
                <h1 className="mb-12 text-primary-2 font-bold text-2xl">Menu</h1>
                
                <NavLink to='/' onClick={closeModal} className={linkClass}>Home</NavLink>
                <NavLink to='/products' onClick={closeModal} className={linkClass}>Products</NavLink>
                <NavLink to='/locations' onClick={closeModal} className={linkClass}>Locations</NavLink>
                <NavLink to='/faq' onClick={closeModal} className={linkClass}>FAQ</NavLink>
                <NavLink to='/contact' onClick={closeModal} className={linkClass}>Contact</NavLink>
            </div>
        </Modal>
    )
}