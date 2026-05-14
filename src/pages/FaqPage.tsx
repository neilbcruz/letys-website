import { NavLink } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
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
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about Lety's Buko Pie"
        icon={<HelpCircle size={32} aria-hidden="true" />}
      />

      {/* FAQ Content */}
      <main id="main-content" tabIndex={-1}>
        <PageSection>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-2xl font-bold lg:text-3xl text-primary-2">
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
                        className="flex justify-between items-center p-6 w-full text-left transition hover:bg-primary-3/10 focus:outline-none focus:ring-4 focus:ring-primary-1"
                        aria-expanded={open}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <span className="pr-4 text-lg font-bold lg:text-xl text-primary-2">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-6 h-6 text-primary-2 transition-transform duration-200 shrink-0 ${
                            open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel
                        className="p-6 pt-0 bg-surface-base"
                        id={`faq-answer-${index}`}
                      >
                        <div className="py-2 pl-6 text-lg leading-relaxed text-fg-base border-l-4 border-primary-1">
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
                <NavLink to="/products" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">🥥</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Our Products
                  </h3>
                  <p className="text-fg-muted">
                    Browse our delicious selection
                  </p>
                </NavLink>

                <NavLink to="/locations" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">📍</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Store Locations
                  </h3>
                  <p className="text-fg-muted">
                    Find a store near you
                  </p>
                </NavLink>

                <NavLink to="/contact" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">💬</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Get in Touch
                  </h3>
                  <p className="text-fg-muted">
                    We're here to help
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </PageSection>
      </main>
    </div>
  );
}
