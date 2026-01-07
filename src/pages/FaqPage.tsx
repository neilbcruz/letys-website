import { NavLink } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

export const FAQ_ITEMS = [
  {
    question: "Can you deliver my order?",
    answer: "We’re not offering delivery yet 😅, but you can always arrange your own courier or pasabuy service to get our buko pies to you!"
  },
  {
    question: "Can I open a Lety’s Buko Pie franchise?",
    answer: "Not at the moment, but we really appreciate your interest in sharing our pies with others! ❤️"
  },
  {
    question: "I want to resell your products. Do you have a bulk price list?",
    answer: "We don’t have official resellers or distributors, so we can’t guarantee quality from third parties. But thanks for wanting to spread the love of Lety’s pies! 🥥"
  },
  {
    question: "When are your stores open?",
    answer: <>We’re open daily from 6am to 6pm! ⏰ Check out the full details on our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-secondary-1">locations</NavLink> page.</>
  },
  {
    question: "Where can I find your stores?",
    answer: <>You can see all our store locations on our <NavLink to='/locations' className="font-bold text-primary-2 hover:text-secondary-1">locations</NavLink> page 📍. Come visit us!</>
  },
  {
    question: "Can I order or reserve online?",
    answer: "Not just yet 😅. We love seeing you in person — it’s the best way to pick your favorite pies!"
  },
  {
    question: "What products do you offer?",
    answer: <>Check out all our delicious treats on our <NavLink to='/products' className="font-bold text-primary-2 hover:text-secondary-1">products</NavLink> page 🍰. You won’t want to miss them!</>
  },
];


export default function FaqPage() {
  return (
    <div className="w-full text-primary-2">
      {/* Banner */}
      <div className="bg-primary-3 p-6 text-center">
        <h1 className="text-3xl font-bold">FAQ</h1>
        <p className="mt-2 font-medium">For other questions, please send us a message through our contact page.</p>
        <NavLink to='/contact'>
          <button className="mt-4 px-4 py-2 bg-primary-2 text-white rounded-lg hover:bg-secondary-2 font-bold">Get in Touch</button>
        </NavLink>
      </div>

      {/* FAQ Accordion */}
      <div className="w-full px-4 tablet:px-8 desktop:px-0 flex justify-center pt-16">
				<div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
					{FAQ_ITEMS.map((item, index) => (
						<Disclosure key={index}>
							{({ open }) => (
								<div className="border border-gray-200 rounded-lg overflow-hidden">
									<DisclosureButton className="flex justify-between items-center w-full p-4 bg-white hover:bg-primary-3 transition">
										<span className="font-bold text-lg">{item.question}</span>
										<ChevronDown 
											className={`w-5 h-5 text-primary-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
										/>
									</DisclosureButton>
									<DisclosurePanel className="p-4 bg-primary-3 text-primary-2">
										{item.answer}
									</DisclosurePanel>
								</div>
							)}
						</Disclosure>
					))}
				</div>
			</div>
    </div>
  );
}
