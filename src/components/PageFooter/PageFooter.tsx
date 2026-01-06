import './PageFooter.scss';

import { NavLink } from 'react-router-dom';

import LetysLogo from '../../assets/images/letys-logo.jpg';
import Facebook from '../../assets/icons/facebook.png';
import Google from '../../assets/icons/googlemail.png';
import Phone from '../../assets/icons/telephone.png';

interface PageFooterProps {
    fbUrl?: string;
    mailTo?: string;
    telTo?: string;
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
    <div className='footer'>
      <div className='footer__social'>
        <div className='footer__social-contact'>
          <img
            onClick={() => window.location.href = `mailto:${email}`}
            src={Google}
            alt='Google Mail icon that is shaped as letter M and envelope'
          />
          <img
            onClick={() => newTab(facebookUrl)}
            src={Facebook}
            alt='Facebook icon is a blue circle with a letter f lowercase inside it'
          />
          <img
            onClick={() => window.location.href = `tel:${phone}`}
            src={Phone}
            alt='Light blue circle with a phone shape inside it'
          />
        </div>
      </div>

      <div className='footer__container'>
        <div className='footer__text'>
          <NavLink to='/'>
            <img src={LetysLogo} alt='Yellow Background Letys Name with Coconut' />
          </NavLink>
          <h3>© 2023 Lety's Buko Pie</h3>
        </div>
        <div className='footer__contact'>
          <img
            onClick={() => newTab(facebookUrl)}
            src={Facebook}
            alt='Facebook icon is a blue circle with a letter f lowercase inside it'
          />
        </div>
      </div>
    </div>
  )
}