import { useRef } from 'react';
import emailjs from 'emailjs-com';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs.sendForm(
      import.meta.env.REACT_APP_SERVICE_ID,
      import.meta.env.REACT_APP_TEMPLATE_ID,
      form.current,
      import.meta.env.REACT_APP_USER_ID
    ).then(
      (result) => {
        console.log(result.text);
        alert('SUCCESS!');
      },
      (error) => {
        console.log(error.text);
        alert('FAILED...');
      }
    );
    e.currentTarget.reset();
  };

  // Reusable styles
  const bannerClass = "bg-primary-3 p-4 mb-4 tablet:px-8 desktop:px-40 text-center";
  const containerClass = "px-4 py-4 text-left tablet:px-40 desktop:px-80";
  // Input: Light yellow bg, dark green text, shadow
  const inputClass = "w-full p-2 mt-1 rounded bg-primary-3 text-primary-2 border-b border-primary-2/50 shadow-[5px_5px_5px_rgba(97,193,42,0.5)] focus:outline-none focus:ring-1 focus:ring-primary-2 transition";
  const labelClass = "text-primary-2 font-bold text-lg";

  return (
    <div className="text-center w-full">
      <div className={bannerClass}>
        <h1 className="text-primary-2 font-bold text-2xl">Contact</h1>
        <h3 className="text-sm font-bold">Let us know if you have any questions or concerns!</h3>
      </div>

      <div className={containerClass}>
        <form data-netlify='true' ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
          <div>
            <label htmlFor='name' className={labelClass}>Name</label>
            <input type='name' name='name' className={inputClass} id='name' placeholder='enter your name' required />
          </div>
          <div>
            <label htmlFor='email' className={labelClass}>Email</label>
            <input type='email' name='email' className={inputClass} id='email' placeholder='enter your email' required />
          </div>
          <div>
            <label htmlFor='subject' className={labelClass}>Subject</label>
            <input type='text' name='subject' className={inputClass} id='subject' placeholder='enter email subject' required />
          </div>
          <div>
            <label htmlFor='message' className={labelClass}>Message</label>
            <textarea name='message' className={inputClass} id='message' rows={5} placeholder='enter your message' required></textarea>
          </div>

          <button type='submit' className="mt-4 py-2 px-6 bg-primary-2 text-support-1 rounded-lg border border-secondary-2 shadow-[5px_5px_5px_rgba(6,142,70,0.5)] hover:opacity-90 transition font-bold text-xl cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}