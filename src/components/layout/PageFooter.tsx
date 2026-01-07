import { NavLink } from 'react-router-dom';
import { IMAGES } from "../../data/images";

import Facebook from '../../assets/icons/facebook.png';
import Google from '../../assets/icons/googlemail.png';

interface PageFooterProps {
  facebookUrl?: string;
  email?: string;
}

export default function PageFooter({
  email = 'hello@letysbukopie.com',
  facebookUrl = 'https://www.facebook.com/letysbukopie/',
}: PageFooterProps) {
  const newTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-primary-1 text-primary-2">
      {/* Main Footer Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-6 sm:px-8 lg:px-40 gap-4 sm:gap-0">
        
        {/* Left Side: Logo + Copyright */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink to="/">
            <img 
              src={IMAGES.LETYS_LOGO} 
              alt="Logo" 
              className="w-10 sm:w-12 lg:w-14 h-auto" 
            />
          </NavLink>
          <p className="font-bold text-sm sm:text-base">© 2023 Lety's Buko Pie</p>
        </div>

        {/* Right Side: Contact Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            onClick={() => window.location.href = `mailto:${email}`}
            src={Google}
            alt="Email"
            className="w-8 sm:w-10 lg:w-12 h-auto cursor-pointer"
          />
          <img
            onClick={() => newTab(facebookUrl)}
            src={Facebook}
            alt="Facebook"
            className="w-8 sm:w-10 lg:w-12 h-auto cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
}
