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
    <div class="container">
      <div class="row">
        <div class="col align-self-center">
          <h1 class="text-center">Email - JavaScript Contact Form</h1>
          {/* <!-- contact form --> */}
          <form ref={form} onSubmit={sendEmail}>
            {/* <!-- name --> */}
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="name"
                name="name"
                class="form-control"
                id="name"
                placeholder="enter your name"
              />
            </div>

            {/* <!-- email --> */}
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                name="email"
                class="form-control"
                id="email"
                placeholder="enter your email"
              />
            </div>

            {/* <!-- subject --> */}
            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                type="text"
                name="subject"
                class="form-control"
                id="subject"
                placeholder="enter email subject"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                name="message"
                class="form-control"
                id="message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}