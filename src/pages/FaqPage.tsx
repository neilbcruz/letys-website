import { NavLink } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, Coffee, HelpCircle, MapPin, MessageCircle } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import { SEOHead, FAQSchema } from '@/components/seo';
import { PageSection, ContactCTA } from '@/components/layout';
import { FAQ_ITEMS } from '@/data/faqs';

export default function FaqPage() {
  return (
    <div className="w-full min-h-screen bg-surface-subtle">
      <SEOHead pageKey="faq" />
      <FAQSchema />

      {/* Header */}
      <HeroBanner
        variant="narrow"
        title={<>Common <span className="text-accent">Questions</span></>}
        icon={<HelpCircle size={32} aria-hidden="true" />}
      />

      {/* Subheading */}
      <section className="bg-surface-base border-b border-stroke-default">
        <div className="container-width px-4 py-6 sm:px-8 text-center">
          <p className="text-lg text-fg-muted">
            Quick answers about our pies, stores, and orders
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <main id="main-content" tabIndex={-1}>
        <PageSection>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold lg:text-3xl text-brand">
                Everything You Need to Know
              </h2>
              <p className="text-lg text-fg-muted">
                Can't find what you're looking for? Feel free to reach out to us directly!
              </p>
            </div>

            <div className="grid gap-6">
              {FAQ_ITEMS.map((item, index) => (
                <Disclosure key={index} as="div">
                  {({ open }) => (
                    <div className="overflow-hidden card-elevated">
                      <DisclosureButton
                        className="flex justify-between items-center p-6 w-full text-left transition-all duration-200 hover:bg-brand-muted/5 focus:outline-none focus:ring-4 focus:ring-brand/50 group"
                        aria-expanded={open}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <span className="pr-4 text-lg font-bold lg:text-xl text-brand group-hover:text-brand-hover">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 text-brand transition-transform duration-200 shrink-0 group-hover:text-brand-hover ${
                            open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel
                        className="p-6 pt-0 bg-surface-base"
                        id={`faq-answer-${index}`}
                      >
                        <div className="py-2 pl-6 text-lg leading-relaxed text-fg-base border-l-4 border-accent">
                          {item.answer}
                        </div>
                      </DisclosurePanel>
                    </div>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </PageSection>

        {/* CTA Section */}
        <PageSection variant="gradient">
          <ContactCTA />
        </PageSection>

        {/* Quick Links Section */}
        <PageSection variant="white">
          <div className="container-width">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center heading-secondary">Explore More</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <NavLink to="/products" className="p-6 text-center card-elevated hover:border-brand-muted group">
                  <Coffee className="w-12 h-12 mx-auto mb-4 text-brand" />
                  <h3 className="mb-2 text-xl font-bold transition text-brand group-hover:text-accent">
                    Our Products
                  </h3>
                  <p className="text-fg-muted">
                    Browse our delicious selection
                  </p>
                </NavLink>

                <NavLink to="/locations" className="p-6 text-center card-elevated hover:border-brand-muted group">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-brand" />
                  <h3 className="mb-2 text-xl font-bold transition text-brand group-hover:text-accent">
                    Store Locations
                  </h3>
                  <p className="text-fg-muted">
                    Find a store near you
                  </p>
                </NavLink>

                <a href="mailto:hello@letysbukopie.com" className="p-6 text-center card-elevated hover:border-brand-muted group">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-brand" />
                  <h3 className="mb-2 text-xl font-bold transition text-brand group-hover:text-accent">
                    Get in Touch
                  </h3>
                  <p className="text-fg-muted">
                    We're here to help
                  </p>
                </a>
              </div>
            </div>
          </div>
        </PageSection>
      </main>
    </div>
  );
}
