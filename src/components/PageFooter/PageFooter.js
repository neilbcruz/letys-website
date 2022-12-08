import './PageFooter.scss';
import { FacebookShareButton } from "react-share";

import LetysLogo from '../../assets/images/letys-logo.jpg';
// import Facebook from '../../assets/icons/facebook.png';
import FacebookComic from '../../assets/icons/facebook-comic.png';
import Share from '../../assets/icons/share.png';

export default function PageFooter() {
    const newTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <div className='footer'>
                <div className='footer__container'>
                    <div className='footer__text'>
                        <img src={LetysLogo} alt='Yellow Background Letys Name with Coconut' />
                        <h3>© 2022 Lety's Buko Pie</h3>
                    </div>
                    <div className='footer__contact'>
                        <img onClick={() => newTab('https://www.facebook.com/profile.php?id=100063583611018')} src={FacebookComic} alt='Blue Square with white text letter f' />
                        <FacebookShareButton
                            url={"https://www.facebook.com/profile.php?id=100063583611018"}
                            quote={"facebook share"}
                            hashtag={"#hashtag"}
                            description={"aiueo"}
                            className="footer__contact-share"
                        >
                            <img src={Share} alt='Share arrow' />
                        </FacebookShareButton>
                    </div>

                </div>

            </div>
        </>
    )
}