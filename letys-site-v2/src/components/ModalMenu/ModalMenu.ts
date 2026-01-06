import './ModalMenu.scss';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';

import Close from '../../assets/icons/close.svg';

export default function ModalMenu({ closeModal, isOpen }) {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='modal'
                overlayClassName='modal__overlay'
            >
                <div className='modal__icon'>
                    <img onClick={closeModal} src={Close} alt='X mark to close modal' />
                </div>
                <div className='modal__nav'>
                <NavLink to='/'>
                    <h1 onClick={closeModal}>Home</h1>
                </NavLink>
                <NavLink to='/products'>
                    <h1 onClick={closeModal}>Products</h1>
                </NavLink>
                <NavLink to='/locations'>
                    <h1 onClick={closeModal}>Locations</h1>
                </NavLink>
                <NavLink to='/faq'>
                    <h1 onClick={closeModal}>FAQ</h1>
                </NavLink>
                <NavLink to='/contact'>
                    <h1 onClick={closeModal}>Contact</h1>
                </NavLink>
                </div>
            </Modal>
        </>
    )
}