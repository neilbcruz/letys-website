import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Clock3, Coffee, MapPin, Store, Users, ArrowRight } from 'lucide-react';
import CallToAction from '@/components/layout/CallToAction';
import { IMAGES } from '@/lib/images';
import { Button } from '@/components/ui';

export default function PageBody() {
  return (
    <div className="w-full">

      {/* FEATURED PRODUCT INTRO */}
      <section aria-labelledby="featured-heading" className="py-16 bg-surface-base lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div className="order-1 text-left">
              <h2 id="featured-heading" className="mb-4 text-3xl font-bold text-brand lg:text-4xl">Our Signature <span className="text-accent-fg">Buko Pie</span></h2>
              <p className="text-lg leading-relaxed text-fg-base lg:text-xl mb-6">
                Experience Lety's famous specialty pie, crafted with fresh young coconuts and a legacy of baking excellence since 1976. Each pie is made with love using our time-honored family recipe.
              </p>
              <div className="flex flex-wrap gap-3">
                <NavLink to="/products" className="flex items-center gap-2 text-brand font-semibold hover:text-accent-fg transition-colors">
                  <ArrowRight size={18} />
                  Browse All Products
                </NavLink>
                <HashLink to="/products#specialty" className="flex items-center gap-2 text-brand font-semibold hover:text-accent-fg transition-colors">
                  View Specialty Pies
                </HashLink>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <img
                src={IMAGES.BUKO_PIE.default}
                srcSet={IMAGES.BUKO_PIE.srcSet}
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
                alt="Lety's signature Buko Pie"
                loading="lazy"
                decoding="async"
                className="dark-content-image object-cover w-64 h-64 mx-auto rounded-2xl shadow-xl lg:w-80 lg:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section aria-labelledby="why-choose-heading" className="py-16 bg-surface-base lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <h2 id="why-choose-heading" className="mb-4 text-3xl font-bold text-center text-brand lg:text-4xl">
            Why Choose <span className="text-accent-fg">Lety's</span>?
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-center text-fg-muted">
            Three things that matter: fresh ingredients, family tradition, and authentic taste
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {[
              { icon: Coffee, title: 'Fresh Daily', desc: 'Made fresh every morning with young coconuts and premium ingredients', link: '/products', cta: 'Browse our pies' },
              { icon: Users, title: 'Since 1976', desc: 'Three generations of baking the same authentic recipe our customers love', link: '/#about-lety-heading', cta: 'Read our story' },
              { icon: Store, title: '4 Branches', desc: 'Find our branches across Laguna', link: '/locations', cta: 'Find a branch' },
            ].map((item, idx) => (
              <div key={idx} className="group p-6 text-center rounded-2xl border border-stroke-default hover:border-brand transition-all duration-300">
                <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 rounded-full bg-brand-muted/20 group-hover:bg-brand-muted/40 transition-colors">
                  <item.icon size={32} className="text-brand" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-brand">{item.title}</h3>
                <p className="mb-4 leading-relaxed text-fg-muted">{item.desc}</p>
                <HashLink to={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-accent-fg hover:text-brand transition-colors">
                  {item.cta} →
                </HashLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT LETY - with Buko Facts merged */}
      <section aria-labelledby="about-lety-heading" className="py-16 bg-surface-subtle lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 id="about-lety-heading" className="mb-6 text-3xl font-bold text-brand lg:text-4xl">About <span className="text-accent-fg">Lety</span></h2>
            <p className="text-lg text-fg-base">From a single oven in 1976 to Laguna's favorite buko pie, here's our story</p>
          </div>

          {/* Timeline */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative border-l-2 border-brand-muted/30 pl-8 space-y-12">
              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-6 h-6 rounded-full bg-brand-fill text-fg-on-brand flex items-center justify-center text-sm font-bold">1</div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent-fg">1976</p>
                <h3 className="mb-2 text-2xl font-bold text-brand">Humble Beginnings</h3>
                <p className="text-lg text-fg-base">Leticia "Lety" Ocampo Belarmino started with one oven and a simple goal: earn extra for her kids' schooling by baking what she loved. Her buko pie became a neighborhood favorite.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-6 h-6 rounded-full bg-brand-fill text-fg-on-brand flex items-center justify-center text-sm font-bold">2</div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent-fg">The early years</p>
                <h3 className="mb-2 text-2xl font-bold text-brand">The Recipe That Worked</h3>
                <p className="text-lg text-fg-base">With young buko — jelly-like immature coconut — and fresh coconut water, Lety perfected a lighter, sweeter, distinctly Filipino recipe. Customers kept coming back.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[45px] top-0 w-6 h-6 rounded-full bg-brand-fill text-fg-on-brand flex items-center justify-center text-sm font-bold">3</div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-accent-fg">Today</p>
                <h3 className="mb-2 text-2xl font-bold text-brand">Growing Together</h3>
                <p className="text-lg text-fg-base">Lety manages four branches across Laguna with her family. The same recipe. The same love. The taste that reminds you of home.</p>
              </div>
            </div>
          </div>

          {/* Lety's photo */}
          <div className="flex justify-center">
            <img
              src={IMAGES.LETY.default}
              srcSet={IMAGES.LETY.srcSet}
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Leticia Belarmino - founder of Lety's Buko Pie"
              loading="lazy"
              decoding="async"
              className="object-cover w-full max-w-md h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* STAT BAND — owned facts, no borrowed claims */}
      <section aria-label="Lety's Buko Pie by the numbers" className="bg-brand-fill text-fg-on-brand">
        <div className="px-4 py-14 mx-auto max-w-7xl sm:px-8 lg:py-20">
          <dl className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-8">
            <div>
              <dt className="[font-family:var(--font-heading)] font-semibold text-5xl leading-none lg:text-6xl">1976</dt>
              <dd className="mt-3 text-sm font-medium uppercase tracking-wide text-fg-on-brand/90">Founded in Los Baños</dd>
            </div>
            <div>
              <dt className="[font-family:var(--font-heading)] font-semibold text-5xl leading-none lg:text-6xl">4</dt>
              <dd className="mt-3 text-sm font-medium uppercase tracking-wide text-fg-on-brand/90">Branches across Laguna</dd>
            </div>
            <div>
              <dt className="[font-family:var(--font-heading)] font-semibold text-5xl leading-none lg:text-6xl">3</dt>
              <dd className="mt-3 text-sm font-medium uppercase tracking-wide text-fg-on-brand/90">Generations of bakers</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* PRODUCTS */}
      <section aria-labelledby="our-products-heading" className="py-16 lg:py-24 bg-surface-base">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 id="our-products-heading" className="mb-4 text-3xl font-bold text-brand lg:text-4xl">Our <span className="text-accent-fg">Products</span></h2>
              <p className="text-lg text-fg-muted">Specialty pies, baked goods, and pasalubong favorites</p>
            </div>
            <NavLink to="/products" className="flex items-center gap-2 text-brand font-semibold hover:text-accent-fg transition-colors whitespace-nowrap">
              Browse All Products <ArrowRight size={18} />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Buko Pie', img: IMAGES.BUKO_PIE, link: '/products#specialty', desc: 'Baked by three generations', alt: "Whole Lety's buko pie with golden-brown crust" },
              { name: 'Baked Goods', img: IMAGES.CASSAVA, link: '/products#bakedgoods', desc: 'Cassava cake, broas, and more', alt: 'Cassava cake, broas, and other freshly baked goods' },
              { name: 'Pasalubong', img: IMAGES.PASALUBONG, link: '/products#pasalubong', desc: 'Perfect gift for your loved ones back home', alt: "Boxes of Lety's baked goods ready for gifting" },
            ].map((item, idx) => (
              <div key={idx} className="overflow-hidden bg-surface-subtle rounded-2xl border border-stroke-default shadow-lg transition-all duration-300 hover:border-brand hover:shadow-xl group">
                <div className="overflow-hidden">
                  <img
                    src={item.img.default}
                    srcSet={item.img.srcSet}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-56 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="mb-2 text-2xl font-bold text-brand">{item.name}</h3>
                  <p className="mb-4 text-fg-muted">{item.desc}</p>
                  <Button href={item.link} size="md" variant="secondary">View {item.name}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section aria-labelledby="visit-branch-heading" className="py-16 bg-surface-subtle lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-8">
          <div className="mb-12 text-center">
            <h2 id="visit-branch-heading" className="mb-4 text-3xl font-bold text-brand lg:text-4xl">Visit Our <span className="text-accent-fg">Main Branch</span></h2>
            <p className="text-lg text-fg-muted">Our flagship store in Los Baños, Laguna</p>
          </div>
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-surface-base shadow-md">
                <h3 className="flex gap-2 items-center mb-4 text-2xl font-bold text-brand">
                  <MapPin size={24} aria-hidden="true" />
                  <span>Location</span>
                </h3>
                <p className="mb-2 text-lg text-fg-base">
                  Lety's Buko Pie, National Road,<br />
                  Barangay Anos, Los Baños, Laguna
                </p>
                <p className="text-sm text-fg-muted mb-4">(in front of Heaven's Memorial Garden)</p>
                <NavLink to="/locations" className="inline-flex items-center gap-2 text-accent-fg font-semibold hover:text-brand transition-colors">
                  Find a Branch <MapPin size={16} />
                </NavLink>
              </div>

              <div className="p-8 rounded-2xl bg-surface-base shadow-md">
                <h3 className="flex gap-2 items-center mb-4 text-2xl font-bold text-brand">
                  <Clock3 size={24} aria-hidden="true" />
                  <span>Store Hours</span>
                </h3>
                <p className="mb-4 text-lg text-fg-base">Open daily: <span className="font-semibold text-brand">6:00 AM to 6:00 PM</span></p>
                <p className="text-sm">
                  <NavLink to="/availability" className="font-semibold text-accent-fg hover:text-brand transition-colors">
                    Come early, we sell out fast — see what's in stock today
                  </NavLink>
                </p>
              </div>
            </div>

            <div>
              <img
                src={IMAGES.MAIN_STORE.default}
                srcSet={IMAGES.MAIN_STORE.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Lety's Buko Pie Main Branch storefront"
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-16 bg-surface-base lg:py-24">
        <CallToAction
          title="Fresh Buko Pie, Every Morning"
          description="Baked daily at our four branches across Laguna since 1976."
          buttons={[
            { label: 'Find a Branch', href: '/locations', variant: 'primary' },
            { label: 'Browse All Products', href: '/products', variant: 'secondary' },
          ]}
        />
      </section>
    </div>
  );
}
