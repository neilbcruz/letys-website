import './ContactPage.scss';

import { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID, 
      // 'service_gwxauj3',
      process.env.REACT_APP_TEMPLATE_ID, 
      // 'template_lqaclxg',
      form.current,
      process.env.REACT_APP_USER_ID)
      // '5r561NxOPSpI-g8_D')
      .then((result) => {
        console.log(result.text);
        alert('SUCCESS!')
      }, (error) => {
        console.log(error.text);
        alert('FAILED...', error)
      });

    e.target.reset();
  };

  return (
    <>
      <div className='contact'>
        <div className='contact__title'>
          <h1>Contact</h1>
          <h3>Let us know if you have any questions or concerns!</h3>
        </div>
        <div className='contact__form'>
          <form ref={form} onSubmit={sendEmail}>
            <div className='contact__form-group'>
              <label for='name'><h2>Name</h2></label>
              <input
                type='name'
                name='name'
                class='contact__form-input'
                id='name'
                placeholder='enter your name'
                required
              />
            </div>
            <div className='contact__form-group'>
              <label for='email'><h2>Email</h2></label>
              <input
                type='email'
                name='email'
                className='contact__form-input'
                id='email'
                placeholder='enter your email'
                required
              />
            </div>
            <div className='contact__form-group'>
              <label for='subject'><h2>Subject</h2></label>
              <input
                type='text'
                name='subject'
                className='contact__form-input'
                id='subject'
                placeholder='enter email subject'
                required
              />
            </div>
            <div className='contact__form-group'>
              <label for='message'><h2>Message</h2></label>
              <textarea
                name='message'
                className='contact__form-input'
                id='message'
                rows='5'
                placeholder='enter your message'
                required
              ></textarea>
            </div>

            <button type='submit'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}