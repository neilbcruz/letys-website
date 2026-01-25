import { NavLink } from 'react-router-dom';
import { IMAGES } from '@/lib/images';
import { siFacebook, siGmail } from 'simple-icons';

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

  const iconClasses = 'w-8 sm:w-10 lg:w-12 h-auto cursor-pointer text-primary-2 hover:text-primary-3 transition-colors';

  return (
    <footer className="bg-primary-1 text-primary-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-6 sm:px-8 lg:px-40 gap-4 sm:gap-0">
        
        {/* Left Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink to="/">
            <img
              src={IMAGES.LETYS_LOGO.default}
              srcSet={IMAGES.LETYS_LOGO.srcSet}
              sizes="(max-width: 640px) 2.5rem, (max-width: 1024px) 3rem, 3.5rem"
              alt="Logo"
              className="w-10 sm:w-12 lg:w-14 h-auto"
            />
          </NavLink>
          <p className="font-bold text-sm sm:text-base">© 2023 Lety's Buko Pie</p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Email */}
          <svg
            onClick={() => window.location.href = `mailto:${email}`}
            role="img"
            viewBox="0 0 24 24"
            className={iconClasses}
          >
            <path d={siGmail.path} />
          </svg>

          {/* Facebook */}
          <svg
            onClick={() => newTab(facebookUrl)}
            role="img"
            viewBox="0 0 24 24"
            className={iconClasses}
          >
            <path d={siFacebook.path} />
          </svg>
        </div>
      </div>
    </footer>
  );
}
