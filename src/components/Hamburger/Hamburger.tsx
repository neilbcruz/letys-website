import './Hamburger.scss';

interface HamburgerProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export default function Hamburger({ setOpen, open }: HamburgerProps) {
    return (
        <>
        <button onClick={() => setOpen(!open)} className='hamburger'>
            <div className='hamburger__div div__one' />
            <div className='hamburger__div 2' />
            <div className='hamburger__div 3' />
        </button>
    </>
    )

}