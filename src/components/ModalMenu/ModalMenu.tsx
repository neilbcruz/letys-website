import './ModalMenu.scss';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import Close from '../../assets/icons/close.svg';

interface ModalMenuProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ModalMenu({ closeModal, isOpen }: ModalMenuProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='modal'
            overlayClassName='modal__overlay'
        >
            <button onClick={closeModal} className='modal__close'>
                <img src={Close} alt='Close modal' />
            </button>
            <div className='modal__nav'>
            <NavLink to='/'>
                <span onClick={closeModal}>Home</span>
            </NavLink>
            <NavLink to='/products'>
                <span onClick={closeModal}>Products</span>
            </NavLink>
            <NavLink to='/locations'>
                <span onClick={closeModal}>Locations</span>
            </NavLink>
            <NavLink to='/faq'>
                <span onClick={closeModal}>FAQ</span>
            </NavLink>
            <NavLink to='/contact'>
                <span onClick={closeModal}>Contact</span>
            </NavLink>
            </div>
        </Modal>
    )
}