import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { Mail, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';
import { SEOHead, useGoogleAnalytics } from '@/components/seo';
import { PageSection, PageSectionGrid } from '@/components/layout';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { trackContactFormSubmit } = useGoogleAnalytics();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    // Track contact form submission
    const formData = new FormData(form.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    trackContactFormSubmit({ name, email, subject });

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
      <SEOHead pageKey="contact" />

      {/* Header */}
      <PageHeroNarrow
        title="Contact Us"
        subtitle="We'd love to hear from you!"
        icon={<Mail size={32} aria-hidden="true" />}
      />

      {/* Content */}
      <main id="main-content" tabIndex={-1}>
        <PageSection>
          <PageSectionGrid cols={2}>
            {/* Contact Form */}
            <div className="p-8 card-elevated lg:p-12">
              <h2 className="flex gap-3 items-center mb-6 heading-secondary">
                <Send className="text-primary-2" size={28} aria-hidden="true" />
                Send us a message
              </h2>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-bold text-gray-700">
                    Your Name <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    aria-required="true"
                    className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                    placeholder="Juan Dela Cruz"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                    Your Email <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-bold text-gray-700">
                    Subject <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    aria-required="true"
                    className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-700">
                    Message <span className="text-red-600" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    aria-required="true"
                    className="px-4 py-3 w-full rounded-lg border-2 border-gray-300 transition resize-none focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {status === 'success' && (
                  <div className="flex gap-2 items-center p-4 text-green-700 bg-green-100 rounded-lg border border-green-400" role="alert" aria-live="polite">
                    <CheckCircle size={20} aria-hidden="true" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex gap-2 items-center p-4 text-red-700 bg-red-100 rounded-lg border border-red-400" role="alert" aria-live="polite">
                    <AlertCircle size={20} aria-hidden="true" />
                    <span>Failed to send message. Please try again or contact us directly via email.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex gap-2 justify-center items-center w-full text-lg btn-primary"
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
                <h2 className="mb-4 heading-secondary">Other Ways to Reach Us</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Choose your preferred method to get in touch with our team
                </p>
              </div>

              <a
                href="mailto:hello@letysbukopie.com"
                className="p-8 w-full text-left transition-transform card-elevated hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-primary-1"
                aria-label="Send email to hello@letysbukopie.com"
              >
                <div className="flex gap-6 items-start">
                  <div className="p-4 rounded-full transition bg-primary-3/20 group-hover:bg-primary-3/40">
                    <Mail size={32} className="text-primary-2" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-primary-2">Email Us</h3>
                    <p className="text-lg font-semibold text-gray-700">hello@letysbukopie.com</p>
                    <p className="mt-2 text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
              </a>

              <a
                href="https://m.me/letysbukopie/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-8 w-full text-left transition-transform card-elevated hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-primary-1"
                aria-label="Chat with us on Facebook Messenger (opens in new tab)"
              >
                <div className="flex gap-6 items-start">
                  <div className="p-4 rounded-full transition bg-primary-3/20 group-hover:bg-primary-3/40">
                    <MessageCircle size={32} className="text-primary-2" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-primary-2">Facebook Messenger</h3>
                    <p className="text-lg text-gray-700">Chat with us instantly</p>
                    <p className="mt-2 text-sm text-gray-500">Available during business hours</p>
                  </div>
                </div>
              </a>

              {/* Additional Info Card */}
              <div className="p-8 card-elevated bg-linear-to-br from-primary-3/10 to-primary-1/10">
                <h3 className="mb-4 text-xl font-bold text-primary-2">Business Hours</h3>
                <p className="mb-2 text-gray-700">
                  <span className="font-bold">Monday - Sunday:</span> 6:00 AM - 6:00 PM
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  We typically respond to messages within 24 hours during business days.
                </p>
              </div>
            </div>
          </PageSectionGrid>
        </PageSection>
      </main>
    </div>
  );
}
