import { Mail, MessageCircle } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import { SEOHead } from '@/components/seo';
import { PageSection } from '@/components/layout';

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <SEOHead pageKey="contact" />

      {/* Header */}
      <HeroBanner
        variant="narrow"
        title="Contact Us"
        subtitle="We'd love to hear from you!"
        icon={<Mail size={32} aria-hidden="true" />}
      />

      {/* Content */}
      <main id="main-content" tabIndex={-1}>
        <PageSection>
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="mb-4 heading-secondary">Get in Touch</h2>
              <p className="text-lg text-gray-600">
                Choose your preferred method to reach our team
              </p>
            </div>

            <a
              href="mailto:hello@letysbukopie.com"
              className="card-elevated p-8 block w-full text-left transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-1"
              aria-label="Send email to hello@letysbukopie.com"
            >
              <div className="flex gap-6 items-start">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-3/20 hover:bg-primary-3/40 transition">
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
              className="card-elevated p-8 block w-full text-left transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-1"
              aria-label="Chat with us on Facebook Messenger (opens in new tab)"
            >
              <div className="flex gap-6 items-start">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-3/20 hover:bg-primary-3/40 transition">
                  <MessageCircle size={32} className="text-primary-2" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-primary-2">Facebook Messenger</h3>
                  <p className="text-lg text-gray-700">Chat with us instantly</p>
                  <p className="mt-2 text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>
            </a>

            {/* Business Hours Card */}
            <div className="card-elevated p-8 bg-linear-to-br from-primary-3/10 to-primary-1/10">
              <h3 className="mb-4 text-xl font-bold text-primary-2">Business Hours</h3>
              <p className="mb-2 text-gray-700">
                <span className="font-bold">Monday - Sunday:</span> 6:00 AM - 6:00 PM
              </p>
              <p className="mt-4 text-sm text-gray-600">
                We typically respond to messages within 24 hours during business days.
              </p>
            </div>
          </div>
        </PageSection>
      </main>
    </div>
  );
}
