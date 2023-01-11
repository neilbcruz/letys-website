import './PageBody.scss';

import Lety1 from '../../assets/images/lety-1.jpg';
import Lety2 from '../../assets/images/lety-2.jpg';
import Lety3 from '../../assets/images/lety-3.jpg';

export default function PageBody() {
    return (
        <>
            <div className='body'>
                <div className='body__text'>
                    <div className='body__image'>
                        <img className='body__image-one' src={Lety1} alt='Lety with award' />
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dictum libero quam, netus conubia nec semper nascetur nisi curae habitasse. Luctus venenatis tempor hendrerit ridiculus fusce ornare porttitor pulvinar aliquam justo, litora integer cras aenean senectus cursus platea habitant ligula sociosqu, conubia cum arcu quam at elementum molestie montes taciti. Vestibulum libero viverra et condimentum cum convallis leo interdum, iaculis torquent platea conubia duis class volutpat posuere, a dis nascetur mauris magna fringilla urna.</p>
                        <img className='body__image-two' src={Lety2} alt='Lety with award' />
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dictum libero quam, netus conubia nec semper nascetur nisi curae habitasse. Luctus venenatis tempor hendrerit ridiculus fusce ornare porttitor pulvinar aliquam justo, litora integer cras aenean senectus cursus platea habitant ligula sociosqu, conubia cum arcu quam at elementum molestie montes taciti. Vestibulum libero viverra et condimentum cum convallis leo interdum, iaculis torquent platea conubia duis class volutpat posuere, a dis nascetur mauris magna fringilla urna.</p>
                        <img className='body__image-three' src={Lety3} alt='Lety with award' /> 
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit dictum libero quam, netus conubia nec semper nascetur nisi curae habitasse. Luctus venenatis tempor hendrerit ridiculus fusce ornare porttitor pulvinar aliquam justo, litora integer cras aenean senectus cursus platea habitant ligula sociosqu, conubia cum arcu quam at elementum molestie montes taciti. Vestibulum libero viverra et condimentum cum convallis leo interdum, iaculis torquent platea conubia duis class volutpat posuere, a dis nascetur mauris magna fringilla urna.</p>
                    </div>
                </div>
            </div>
        </>
    )
}