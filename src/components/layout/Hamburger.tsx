// src/components/layout/Hamburger.tsx - UPDATED WITH ARIA LABELS
import './Hamburger.scss';

interface HamburgerProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function Hamburger({ setOpen, open }: HamburgerProps) {
    return (
        <button 
            onClick={() => setOpen(!open)} 
            className='hamburger'
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
        >
            <div className='hamburger__div div__one' aria-hidden="true" />
            <div className='hamburger__div div__two' aria-hidden="true" />
            <div className='hamburger__div div__three' aria-hidden="true" />
        </button>
    );
}