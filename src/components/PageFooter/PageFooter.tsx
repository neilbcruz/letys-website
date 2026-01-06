import { NavLink } from 'react-router-dom';

import LetysLogo from '../../assets/images/letys-logo.jpg';
import Facebook from '../../assets/icons/facebook.png';
import Google from '../../assets/icons/googlemail.png';
import Phone from '../../assets/icons/telephone.png';

interface PageFooterProps {
    facebookUrl?: string;
    email?: string;
    phone?: string;
}

export default function PageFooter({
  email = 'hello@letysbukopie.com',
  phone = '+16478642354',
  facebookUrl = 'https://www.facebook.com/letysbukopie/'
}: PageFooterProps) {
  const newTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="pt-8">
      {/* Main Footer Bar */}
      <div className="flex items-center justify-between bg-primary-1 px-4 py-2 tablet:px-8 tablet:py-5 desktop:px-40">
        
        {/* Left Side: Logo + Copyright */}
        <div className="flex items-center gap-4">
          <NavLink to='/'>
            <img src={LetysLogo} alt='Logo' className="w-10" />
          </NavLink>
          <h3 className="font-bold text-sm">© 2023 Lety's Buko Pie</h3>
        </div>

        {/* Right Side: Contact Icons */}
        <div className="flex items-center">
            <img 
                onClick={() => window.location.href = `mailto:${email}`}
                src={Google} alt='Email' 
                className="w-8 ml-4 cursor-pointer tablet:w-12 hidden tablet:block" 
            />
             {/* <img 
                onClick={() => window.location.href = `tel:${phone}`}
                src={Phone} alt='Phone' 
                className="w-8 ml-4 cursor-pointer tablet:w-12 hidden tablet:block" 
            /> */}
            <img 
                onClick={() => newTab(facebookUrl)}
                src={Facebook} alt='Facebook' 
                className="w-8 ml-4 cursor-pointer tablet:w-12" 
            />
        </div>
      </div>
    </div>
  )
}