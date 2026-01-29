import { NavLink } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';

export const FAQ_ITEMS = [
  {
    question: "Can you deliver my order?",
    answer: "We're not offering delivery yet, but you can always arrange your own courier or pasabuy service to get our buko pies to you!"
  },
  {
    question: "Can I open a Lety's Buko Pie franchise?",
    answer: "Not at the moment, but we really appreciate your interest in sharing our pies with others!"
  },
  {
    question: "I want to resell your products. Do you have a bulk price list?",
    answer: "We don't have official resellers or distributors, so we can't guarantee quality from third parties. But thanks for wanting to spread the love of Lety's pies!"
  },
  {
    question: "When are your stores open?",
    answer: <>We're open daily from 6:00 AM to 6:00 PM. Check out the full details on our <NavLink to='/locations' className="font-bold underline rounded text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1">locations page</NavLink>.</>
  },
  {
    question: "Where can I find your stores?",
    answer: <>You can see all our store locations on our <NavLink to='/locations' className="font-bold underline rounded text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1">locations page</NavLink>. Come visit us!</>
  },
  {
    question: "Can I order or reserve online?",
    answer: "Not just yet. We love seeing you in person — it's the best way to pick your favorite pies!"
  },
  {
    question: "What products do you offer?",
    answer: <>Check out all our delicious treats on our <NavLink to='/products' className="font-bold underline rounded text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1">products page</NavLink>. You won't want to miss them!</>
  },
  {
    question: "Do you cater for events?",
    answer: "Yes! We can provide buko pies and other treats for your special occasions. Please contact us directly to discuss your catering needs."
  },
  {
    question: "How long do your pies stay fresh?",
    answer: "Our buko pies are best enjoyed within 2-3 days when stored at room temperature. For longer storage, you can refrigerate them for up to a week or freeze them for up to a month."
  },
  {
    question: "Do you accept bulk orders?",
    answer: "Absolutely! We welcome bulk orders for parties, events, or corporate gifting. Please visit us at any of our locations or contact us to place your order in advance."
  },
];

export default function FaqPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeroNarrow
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about Lety's Buko Pie"
        icon={<HelpCircle size={32} aria-hidden="true" />}
      />

      {/* FAQ Content */}
      <main id="main-content">
        <section className="section-padding">
          <div className="container-width">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-2xl font-bold lg:text-3xl text-primary-2">
                  Everything You Need to Know
                </h2>
                <p className="text-lg text-gray-600">
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
                          className="p-6 pt-0 bg-white"
                          id={`faq-answer-${index}`}
                        >
                          <div className="py-2 pl-6 text-lg leading-relaxed text-gray-700 border-l-4 border-primary-1">
                            {item.answer}
                          </div>
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-linear-to-br from-primary-3/20 to-primary-1/10">
          <div className="text-center container-width">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6">
                <MessageCircle size={48} className="mx-auto text-primary-2" aria-hidden="true" />
              </div>
              <h2 className="mb-4 heading-secondary">Still have questions?</h2>
              <p className="mb-8 text-xl text-gray-600">
                Our team is here to help! Send us a message and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <NavLink to='/contact'>
                  <button className="text-lg btn-primary">
                    Contact Us
                  </button>
                </NavLink>
                <NavLink to='/locations'>
                  <button className="text-lg btn-secondary">
                    Visit Our Stores
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white section-padding">
          <div className="container-width">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center heading-secondary">Explore More</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <NavLink to="/products" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">🥥</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Our Products
                  </h3>
                  <p className="text-gray-600">
                    Browse our delicious selection
                  </p>
                </NavLink>

                <NavLink to="/locations" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">📍</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Store Locations
                  </h3>
                  <p className="text-gray-600">
                    Find a store near you
                  </p>
                </NavLink>

                <NavLink to="/contact" className="p-6 text-center transition-transform card-elevated hover:scale-105 group">
                  <div className="mb-4 text-4xl">💬</div>
                  <h3 className="mb-2 text-xl font-bold transition text-primary-2 group-hover:text-primary-1">
                    Get in Touch
                  </h3>
                  <p className="text-gray-600">
                    We're here to help
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}