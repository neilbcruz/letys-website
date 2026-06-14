/**
 * FAQ Data
 *
 * Frequently asked questions for Lety's Buko Pie
 * This file is imported by both FaqPage and StructuredData to avoid circular dependencies
 */

import { NavLink } from 'react-router-dom';

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export const FAQ_ITEMS: FAQItem[] = [
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
    answer: <>We're open daily from 6:00 AM to 6:00 PM. Check out the full details on our <NavLink to='/locations' className="font-bold underline rounded text-brand hover:text-accent-fg focus:outline-none focus:ring-2 focus:ring-accent">locations page</NavLink>.</>
  },
  {
    question: "Where can I find your stores?",
    answer: <>You can see all our store locations on our <NavLink to='/locations' className="font-bold underline rounded text-brand hover:text-accent-fg focus:outline-none focus:ring-2 focus:ring-accent">locations page</NavLink>. Come visit us!</>
  },
  {
    question: "Can I order or reserve online?",
    answer: "Not just yet. We love seeing you in person. It's the best way to pick your favorite pies!"
  },
  {
    question: "What products do you offer?",
    answer: <>Check out all our delicious treats on our <NavLink to='/products' className="font-bold underline rounded text-brand hover:text-accent-fg focus:outline-none focus:ring-2 focus:ring-accent">products page</NavLink>. You won't want to miss them!</>
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

// Plain text version for structured data (without React components)
export const FAQ_ITEMS_PLAIN: Array<{ question: string; answer: string }> = [
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
    answer: "We're open daily from 6:00 AM to 6:00 PM. Check out the full details on our locations page."
  },
  {
    question: "Where can I find your stores?",
    answer: "You can see all our store locations on our locations page. Come visit us!"
  },
  {
    question: "Can I order or reserve online?",
    answer: "Not just yet. We love seeing you in person. It's the best way to pick your favorite pies!"
  },
  {
    question: "What products do you offer?",
    answer: "Check out all our delicious treats on our products page. You won't want to miss them!"
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
