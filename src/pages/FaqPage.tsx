import { NavLink } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

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
    answer: <>We're open daily from 6:00 AM to 6:00 PM. Check out the full details on our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-primary-1 underline focus:outline-none focus:ring-2 focus:ring-primary-1 rounded">locations page</NavLink>.</>
  },
  {
    question: "Where can I find your stores?",
    answer: <>You can see all our store locations on our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-primary-1 underline focus:outline-none focus:ring-2 focus:ring-primary-1 rounded">locations page</NavLink>. Come visit us!</>
  },
  {
    question: "Can I order or reserve online?",
    answer: "Not just yet. We love seeing you in person — it's the best way to pick your favorite pies!"
  },
  {
    question: "What products do you offer?",
    answer: <>Check out all our delicious treats on our <NavLink to='/products' className="font-bold text-primary-2 hover:text-primary-1 underline focus:outline-none focus:ring-2 focus:ring-primary-1 rounded">products page</NavLink>. You won't want to miss them!</>
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
      <div className="bg-linear-to-br from-primary-2 to-primary-3 text-white py-12 lg:py-16">
        <div className="container-width text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/20 rounded-full">
              <HelpCircle size={48} aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl lg:text-2xl mb-6">Find answers to common questions about Lety's Buko Pie</p>
          <NavLink to='/contact'>
            <button className="btn-secondary inline-flex items-center gap-2 text-lg">
              <MessageCircle size={20} aria-hidden="true" />
              Get in Touch
            </button>
          </NavLink>
        </div>
      </div>

      {/* FAQ Content */}
      <main id="main-content">
        <section className="section-padding">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary-2 mb-4">
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
                      <div className="card-elevated overflow-hidden">
                        <DisclosureButton 
                          className="flex justify-between items-center w-full p-6 text-left hover:bg-primary-3/10 transition focus:outline-none focus:ring-4 focus:ring-primary-1"
                          aria-expanded={open}
                          aria-controls={`faq-answer-${index}`}
                        >
                          <span className="font-bold text-lg lg:text-xl text-primary-2 pr-4">
                            {item.question}
                          </span>
                          <ChevronDown 
                            className={`w-6 h-6 text-primary-2 transition-transform duration-200 shrink-0 ${
                              open ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </DisclosureButton>
                        <DisclosurePanel 
                          className="p-6 pt-0 bg-white"
                          id={`faq-answer-${index}`}
                        >
                          <div className="text-gray-700 text-lg leading-relaxed border-l-4 border-primary-1 pl-6 py-2">
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
          <div className="container-width text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <MessageCircle size={48} className="mx-auto text-primary-2" aria-hidden="true" />
              </div>
              <h2 className="heading-secondary mb-4">Still have questions?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our team is here to help! Send us a message and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NavLink to='/contact'>
                  <button className="btn-primary text-lg">
                    Contact Us
                  </button>
                </NavLink>
                <NavLink to='/locations'>
                  <button className="btn-secondary text-lg">
                    Visit Our Stores
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-secondary text-center mb-12">Explore More</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NavLink to="/products" className="card-elevated p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">🥥</div>
                  <h3 className="text-xl font-bold text-primary-2 mb-2 group-hover:text-primary-1 transition">
                    Our Products
                  </h3>
                  <p className="text-gray-600">
                    Browse our delicious selection
                  </p>
                </NavLink>

                <NavLink to="/locations" className="card-elevated p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-bold text-primary-2 mb-2 group-hover:text-primary-1 transition">
                    Store Locations
                  </h3>
                  <p className="text-gray-600">
                    Find a store near you
                  </p>
                </NavLink>

                <NavLink to="/contact" className="card-elevated p-6 text-center hover:scale-105 transition-transform group">
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-xl font-bold text-primary-2 mb-2 group-hover:text-primary-1 transition">
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