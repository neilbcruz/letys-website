import './Hamburger.scss';

export default function Hamburger( { setOpen, open }) {
    return (
        <>
        <button open={open} onClick={() => setOpen(!open)} className='hamburger'>
            <div className='hamburger__div div__one' />
            <div className='hamburger__div 2' />
            <div className='hamburger__div 3' />
        </button>
    </>
    )

}