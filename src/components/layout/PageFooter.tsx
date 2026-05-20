// PageFooter.tsx
import { NavLink } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const FACEBOOK_ICON_PATH =
  'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z';

interface PageFooterProps {
  facebookUrl?: string;
  messengerUrl?: string;
  email?: string;
  id?: string;
}

export default function PageFooter({
  email = 'hello@letysbukopie.com',
  facebookUrl = 'https://www.facebook.com/letysbukopie/',
  messengerUrl = 'https://m.me/letysbukopie/',
  id,
}: PageFooterProps) {
  const iconClasses = 'footer-icon inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent sm:h-12 sm:w-12';
  const iconProps = {
    className: 'h-6 w-6 sm:h-7 sm:w-7',
    strokeWidth: 2,
    'aria-hidden': true,
  } as const;

  return (
    <footer id={id} className="site-footer" role="contentinfo">
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
            <a
              href={`mailto:${email}`}
              className={iconClasses}
              aria-label="Send us an email"
            >
              <Mail {...iconProps} />
            </a>

            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={iconClasses}
              aria-label="Chat with us on Facebook Messenger (opens in new tab)"
            >
              <MessageCircle {...iconProps} />
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={iconClasses}
              aria-label="Visit our Facebook page (opens in new tab)"
            >
              <svg
                className={iconProps.className}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={FACEBOOK_ICON_PATH} />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
