import './ContactPage.scss';

import { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      // process.env.REACT_APP_SERVICE_ID, 
      'service_gwxauj3',
      // process.env.REACT_APP_TEMPLATE_ID, 
      'template_lqaclxg',
      form.current,
      // process.env.REACT_APP_USER_ID)
      '5r561NxOPSpI-g8_D')
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
            <div className="form-group">
              <label for="name">Name</label>
              <input
                type="name"
                name="name"
                class="form-control"
                id="name"
                placeholder="enter your name"
              />
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="enter your email"
              />
            </div>
            <div className="form-group">
              <label for="subject">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                id="subject"
                placeholder="enter email subject"
              />
            </div>
            <div className="form-group">
              <label for="message">Message</label>
              <textarea
                name="message"
                className="form-control"
                id="message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}