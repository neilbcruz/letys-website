import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Clock3, Coffee, MapPin, Store, Users } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import { Button } from '@/components/ui';

export default function PageBody() {
  return (
    <div className="w-full">

      {/* FEATURED PRODUCT INTRO */}
      <section aria-labelledby="featured-heading" className="py-16 bg-surface-base lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src={IMAGES.BUKO_PIE.default}
                srcSet={IMAGES.BUKO_PIE.srcSet}
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
                alt="Lety's signature Buko Pie"
                className="object-cover w-64 h-64 mx-auto rounded-2xl shadow-xl transition-transform duration-300 lg:w-80 lg:h-80 hover:scale-105"
              />
            </div>
            <div className="order-1 text-center lg:order-2 lg:text-left">
              <h2 id="featured-heading" className="mb-4 text-3xl font-bold text-primary-2 lg:text-4xl">Our Signature Buko Pie</h2>
              <p className="text-lg leading-relaxed text-fg-base lg:text-xl">
                Experience Lety's famous specialty pie, crafted with fresh young coconuts and a legacy of baking excellence since 1976. Each pie is made with love using our time-honored family recipe.
              </p>
              <div className="flex gap-4 justify-center mt-8 lg:justify-start">
                <NavLink to="/products">
                  <Button size="lg" variant="primary">View All Products</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section aria-labelledby="why-choose-heading" className="py-16 bg-surface-base lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="why-choose-heading" className="mb-4 text-3xl font-bold text-center text-primary-2 lg:text-4xl">
            Why Choose Lety's?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-center text-fg-muted">
            Four decades of tradition, quality, and authentic Filipino taste
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {[
              { icon: Coffee, title: 'Fresh Ingredients', desc: 'Made daily with fresh young coconuts and premium ingredients for the perfect taste' },
              { icon: Users, title: 'Family Tradition', desc: 'A legacy since 1976, passed down through generations with the same authentic recipe' },
              { icon: Store, title: 'Multiple Locations', desc: 'Conveniently located across Laguna for easy access to your favorite treats' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 text-center">
                <div className="flex justify-center items-center mx-auto mb-4 w-20 h-20 rounded-full bg-primary-3">
                  <item.icon size={36} className="text-primary-2" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-primary-2">{item.title}</h3>
                <p className="leading-relaxed text-fg-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUKO FACTS */}
      <section aria-labelledby="buko-facts-heading" className="py-16 lg:py-24 bg-primary-3/10">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="buko-facts-heading" className="mb-12 text-3xl font-bold text-center text-primary-2 lg:text-4xl">Buko Facts</h2>
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div className="order-2 space-y-6 lg:order-1">
              {[
                { title: 'What is Buko?', desc: 'Buko refers to a young, immature green coconut that hasn\'t fully ripened. They mostly contain water with little meat. As it matures at 8-10 months, the water becomes sweeter and the meat jelly-like.' },
                { title: 'Health Benefits', desc: 'Buko is packed with nutritional value and antioxidants that protect against cellular damage and heart disease.' },
                { title: 'Versatile Ingredient', desc: 'Buko can be enjoyed in many ways: as refreshing dessert treats or in desserts like buko pandan, buko ice cream, and of course, buko pie.' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-surface-base rounded-lg shadow-md">
                  <h3 className="mb-2 text-lg font-bold text-primary-2">{item.title}</h3>
                  <p className="leading-relaxed text-fg-base">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={IMAGES.BUKO_TREE.default}
                srcSet={IMAGES.BUKO_TREE.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Young coconuts" 
                className="object-cover w-full h-auto rounded-2xl shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT LETY */}
      <section aria-labelledby="about-lety-heading" className="py-16 bg-surface-base lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="about-lety-heading" className="mb-12 text-3xl font-bold text-center text-primary-2 lg:text-4xl">About Lety</h2>
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div>
              <img 
                src={IMAGES.LETY.default}
                srcSet={IMAGES.LETY.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Lety Belarmino" 
                className="object-cover w-full h-auto rounded-2xl shadow-xl" 
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-primary-2">The Woman Behind the Pie</h3>
                <p className="text-lg leading-relaxed text-fg-base">
                  Leticia Ocampo Belarmino is the person behind Lety's Special Buko Pie. A native of Los Baños, she turned her hobby into a thriving business that has become a beloved local institution.
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold text-primary-2">Humble Beginnings</h3>
                <p className="leading-relaxed text-fg-base">
                  She started in 1976 with a single oven. Her goal was simple: to earn extra money for her kids' schooling while enjoying her free time baking.
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold text-primary-2">Growing Legacy</h3>
                <p className="leading-relaxed text-fg-base">
                  Today, she manages multiple store locations with her family, continuing the tradition of quality and authentic taste that made Lety's a household name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section aria-labelledby="our-products-heading" className="py-16 lg:py-24 bg-linear-to-br from-primary-3/20 to-primary-3/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="our-products-heading" className="mb-4 text-3xl font-bold text-center text-primary-2 lg:text-4xl">Our Products</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-center text-fg-muted">
            Discover our delicious selection of specialty pies, baked goods, and pasalubong favorites
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Buko Pie', img: IMAGES.BUKO_PIE, link: '/products#specialty', desc: 'Our signature specialty pies' },
              { name: 'Cassava Cake', img: IMAGES.CASSAVA, link: '/products#bakedgoods', desc: 'Freshly baked daily treats' },
              { name: 'Broas', img: IMAGES.PASALUBONG, link: '/products#pasalubong', desc: 'Perfect pasalubong gifts' },
            ].map((item, idx) => (
              <div key={idx} className="overflow-hidden bg-surface-base rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl group">
                <div className="overflow-hidden">
                  <img 
                    src={item.img.default}
                    srcSet={item.img.srcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={item.name} 
                    className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-primary-2">{item.name}</h3>
                  <p className="mb-4 text-fg-muted">{item.desc}</p>
                  <HashLink to={item.link}>
                    <Button size="md" variant="secondary">View {item.name}</Button>
                  </HashLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section aria-labelledby="visit-branch-heading" className="py-16 bg-surface-base lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="visit-branch-heading" className="mb-12 text-3xl font-bold text-center text-primary-2 lg:text-4xl">Visit Our Main Branch</h2>
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-primary-3/10">
                <h3 className="flex gap-2 items-center mb-4 text-2xl font-bold text-primary-2">
                  <MapPin size={24} aria-hidden="true" />
                  <span>Location</span>
                </h3>
                <p className="mb-2 text-lg text-fg-base">
                  Lety's Buko Pie, National Road,<br />
                  Barangay Anos, Los Baños, Laguna
                </p>
                <p className="text-fg-muted">(in front of Heaven's Memorial Garden)</p>
                <div className="mt-4">
                  <NavLink to="/locations">
                    <Button size="md" variant="primary">View All Locations</Button>
                  </NavLink>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-primary-3/10">
                <h3 className="flex gap-2 items-center mb-4 text-2xl font-bold text-primary-2">
                  <Clock3 size={24} aria-hidden="true" />
                  <span>Store Hours</span>
                </h3>
                <p className="mb-4 text-lg text-fg-base">Open daily from 6:00 AM to 6:00 PM</p>
                <NavLink to="/contact">
                  <Button size="md" variant="primary">Get in Touch</Button>
                </NavLink>
              </div>
            </div>
            
            <div>
              <img 
                src={IMAGES.MAIN_STORE.default}
                srcSet={IMAGES.MAIN_STORE.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Main store view" 
                className="w-full h-auto rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
