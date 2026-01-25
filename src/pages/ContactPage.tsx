import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Mail, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');
    
    emailjs.sendForm(
      import.meta.env.REACT_APP_SERVICE_ID,
      import.meta.env.REACT_APP_TEMPLATE_ID,
      form.current,
      import.meta.env.REACT_APP_USER_ID
    ).then(
      () => {
        setStatus('success');
        if (form.current) form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      },
      () => {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-br from-primary-2 to-primary-3 text-white py-12 lg:py-16">
        <div className="container-width text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl lg:text-2xl">We'd love to hear from you!</p>
        </div>
      </div>

      {/* Content */}
      <main id="main-content">
        <section className="section-padding">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="card-elevated p-8 lg:p-12">
                <h2 className="heading-secondary mb-6 flex items-center gap-3">
                  <Send className="text-primary-2" size={28} aria-hidden="true" />
                  Send us a message
                </h2>
                
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name <span className="text-red-600" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent transition"
                      placeholder="Juan Dela Cruz"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Your Email <span className="text-red-600" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent transition"
                      placeholder="juan@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                      Subject <span className="text-red-600" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent transition"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Message <span className="text-red-600" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent transition resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg" role="alert" aria-live="polite">
                      <CheckCircle size={20} aria-hidden="true" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert" aria-live="polite">
                      <AlertCircle size={20} aria-hidden="true" />
                      <span>Failed to send message. Please try again or contact us directly via email.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full text-lg flex items-center justify-center gap-2"
                    aria-busy={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Options */}
              <div className="space-y-6">
                <div>
                  <h2 className="heading-secondary mb-4">Other Ways to Reach Us</h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Choose your preferred method to get in touch with our team
                  </p>
                </div>

                <button
                  onClick={() => window.location.href = "mailto:hello@letysbukopie.com"}
                  className="card-elevated p-8 w-full text-left hover:scale-105 transition-transform group"
                  aria-label="Send email to hello@letysbukopie.com"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary-3/20 rounded-full group-hover:bg-primary-3/40 transition">
                      <Mail size={32} className="text-primary-2" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-2 mb-2">Email Us</h3>
                      <p className="text-lg text-gray-700 font-semibold">hello@letysbukopie.com</p>
                      <p className="text-sm text-gray-500 mt-2">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => window.open('https://m.me/letysbukopie/', '_blank', 'noopener,noreferrer')}
                  className="card-elevated p-8 w-full text-left hover:scale-105 transition-transform group"
                  aria-label="Chat with us on Facebook Messenger"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary-3/20 rounded-full group-hover:bg-primary-3/40 transition">
                      <MessageCircle size={32} className="text-primary-2" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-2 mb-2">Facebook Messenger</h3>
                      <p className="text-lg text-gray-700">Chat with us instantly</p>
                      <p className="text-sm text-gray-500 mt-2">Available during business hours</p>
                    </div>
                  </div>
                </button>

                {/* Additional Info Card */}
                <div className="card-elevated p-8 bg-linear-to-br from-primary-3/10 to-primary-1/10">
                  <h3 className="text-xl font-bold text-primary-2 mb-4">Business Hours</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-bold">Monday - Sunday:</span> 6:00 AM - 6:00 PM
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    We typically respond to messages within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}