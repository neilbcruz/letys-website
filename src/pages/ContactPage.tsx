import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Mail, MessageCircle } from 'lucide-react';

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
      () => alert('Message sent!'),
      () => alert('Failed to send.')
    );

    e.currentTarget.reset();
  };

  return (
    <div className="w-full text-primary-2">
      {/* --- Banner --- */}
      <div className="bg-primary-3 p-6 text-center mb-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-2 font-medium">Have questions? Reach out to us!</p>
      </div>

      <div className="px-4 tablet:px-8 desktop:px-40 flex flex-col tablet:flex-row gap-8">
        {/* --- Contact Form --- */}
        <Card className="flex-1 hoverable">
          <CardHeader>Send us a message</CardHeader>
          <CardContent>
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-2"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-2"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-2"
                required
              />
              <button
                type="submit"
                className="mt-2 py-2 px-4 bg-primary-2 text-white rounded-lg hover:bg-secondary-2 transition font-bold"
              >
                Submit
              </button>
            </form>
          </CardContent>
        </Card>

        {/* --- Contact Options --- */}
        <div className="flex-1 flex flex-col gap-4">
          <Card
            className="hoverable flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => window.location.href = "mailto:hello@letysbukopie.com"}
          >
            <Mail size={32} className="text-primary-2" />
            <div>
              <h3 className="font-bold text-lg">Email Us</h3>
              <p>hello@letysbukopie.com</p>
            </div>
          </Card>

          <Card
            className="hoverable flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => window.open('https://m.me/letysbukopie/', '_blank')}
          >
            <MessageCircle size={32} className="text-primary-2" />
            <div>
              <h3 className="font-bold text-lg">Message on Facebook</h3>
              <p>Chat with us on Messenger</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
