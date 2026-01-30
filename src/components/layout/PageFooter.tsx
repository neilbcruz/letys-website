// PageFooter.tsx
import { NavLink } from 'react-router-dom';
import { IMAGES } from '@/lib/images';
import { siFacebook, siGmail } from 'simple-icons';

interface PageFooterProps {
  facebookUrl?: string;
  email?: string;
  id?: string;
}

export default function PageFooter({
  email = 'hello@letysbukopie.com',
  facebookUrl = 'https://www.facebook.com/letysbukopie/',
  id,
}: PageFooterProps) {
  const newTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const iconClasses = 'w-10 sm:w-12 h-auto cursor-pointer text-white hover:text-primary-1 transition-colors';

  return (
    <footer id={id} className="bg-primary-2 text-white" role="contentinfo">
      <div className="container-width">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-8 gap-6 sm:gap-0">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <NavLink to="/" aria-label="Lety's Buko Pie - Home">
              <img
                src={IMAGES.LETYS_LOGO.default}
                srcSet={IMAGES.LETYS_LOGO.srcSet}
                sizes="3.5rem"
                alt="Lety's Buko Pie Logo"
                className="w-12 sm:w-14 h-auto"
              />
            </NavLink>
            <p className="font-bold text-sm sm:text-base">
              © {new Date().getFullYear()} Lety's Buko Pie
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => window.location.href = `mailto:${email}`}
              className={iconClasses}
              aria-label="Send us an email"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={siGmail.path} />
              </svg>
            </button>

            <button
              onClick={() => newTab(facebookUrl)}
              className={iconClasses}
              aria-label="Visit our Facebook page"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={siFacebook.path} />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
