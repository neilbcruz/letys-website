import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Button from '../ui/Button';
import { IMAGES } from '@/lib/images';

export default function PageBody() {
  return (
    <div className="w-full">

      {/* --- HERO BANNER --- */}
      <section className="relative bg-linear-to-br from-primary-1 to-primary-1/80 text-primary-2 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-bold text-4xl lg:text-5xl mb-4">Lety's Special Buko Pie</h1>
              <p className="text-xl lg:text-2xl leading-relaxed">
                Enjoy our selection of specialty pies, baked goods, and pasalubong treats made with love and tradition.
              </p>
              <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                <NavLink to="/products">
                  <Button size="lg" variant="primary" >Order Now</Button>
                </NavLink>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src={IMAGES.BUKO_PIE.default}
                srcSet={IMAGES.BUKO_PIE.srcSet}
                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 20rem, 24rem"
                alt="Buko Pie"
                className="w-64 h-64 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-center text-primary-2 font-bold text-3xl lg:text-4xl mb-4">
            Why Choose Lety's?
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Four decades of tradition, quality, and authentic Filipino taste
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🥥</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary-2">Fresh Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">
                Made daily with fresh young coconuts and premium ingredients for the perfect taste
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary-2">Family Tradition</h3>
              <p className="text-gray-600 leading-relaxed">
                A legacy since 1976, passed down through generations with the same authentic recipe
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🏪</span>
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary-2">Multiple Locations</h3>
              <p className="text-gray-600 leading-relaxed">
                Conveniently located across Laguna for easy access to your favorite treats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BUKO FACTS --- */}
      <section className="py-16 lg:py-24 bg-primary-3/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-center text-primary-2 font-bold text-3xl lg:text-4xl mb-12">
            Buko Facts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-primary-2 mb-2">What is Buko?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Buko refers to a young, immature green coconut that hasn't fully ripened. They mostly contain water with little meat. As it matures at 8-10 months, the water becomes sweeter and the meat jelly-like.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-primary-2 mb-2">Health Benefits</h3>
                <p className="text-gray-700 leading-relaxed">
                  Buko is packed with nutritional value and antioxidants that protect against cellular damage and heart disease.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg text-primary-2 mb-2">Versatile Ingredient</h3>
                <p className="text-gray-700 leading-relaxed">
                  Buko can be enjoyed in many ways: as refreshing dessert treats or in desserts like buko pandan, buko ice cream, and of course, buko pie.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img 
                src={IMAGES.BUKO_TREE.default}
                srcSet={IMAGES.BUKO_TREE.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Young coconuts" 
                className="w-full h-auto object-cover rounded-2xl shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT LETY --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-center text-primary-2 font-bold text-3xl lg:text-4xl mb-12">
            About Lety
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={IMAGES.LETY.default}
                srcSet={IMAGES.LETY.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Lety Belarmino" 
                className="w-full h-auto object-cover rounded-2xl shadow-xl" 
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-2xl text-primary-2 mb-4">The Woman Behind the Pie</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Leticia Ocampo Belarmino is the person behind Lety's Special Buko Pie. A native of Los Baños, she turned her hobby into a thriving business that has become a beloved local institution.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-primary-2 mb-3">Humble Beginnings</h3>
                <p className="text-gray-700 leading-relaxed">
                  She started in 1976 with a single oven. Her goal was simple: to earn extra money for her kids' schooling while enjoying her free time baking.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl text-primary-2 mb-3">Growing Legacy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Today, she manages multiple store locations with her family, continuing the tradition of quality and authentic taste that made Lety's a household name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS --- */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-primary-3/20 to-primary-3/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-center text-primary-2 font-bold text-3xl lg:text-4xl mb-4">
            Our Products
          </h2>
          <p className="text-center mb-12 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of specialty pies, baked goods, and pasalubong favorites
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* BUKO PIE */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src={IMAGES.BUKO_PIE.default}
                  srcSet={IMAGES.BUKO_PIE.srcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt="Buko Pie"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-2xl mb-2 text-primary-2">Buko Pie</h3>
                <p className="text-gray-600 mb-4">Our signature specialty pies</p>
                <HashLink to="/products#specialty">
                  <Button size="md" variant="secondary" >View Specialty</Button>
                </HashLink>
              </div>
            </div>

            {/* CASSAVA CAKE */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src={IMAGES.CASSAVA.default}
                  srcSet={IMAGES.CASSAVA.srcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt="Cassava Cake" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-2xl mb-2 text-primary-2">Cassava Cake</h3>
                <p className="text-gray-600 mb-4">Freshly baked daily treats</p>
                <HashLink to="/products#bakedgoods">
                  <Button size="md" variant="secondary" >View Baked Goods</Button>
                </HashLink>
              </div>
            </div>

            {/* BROAS */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="overflow-hidden">
                <img 
                  src={IMAGES.PASALUBONG.default}
                  srcSet={IMAGES.PASALUBONG.srcSet}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt="Broas" 
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-2xl mb-2 text-primary-2">Broas</h3>
                <p className="text-gray-600 mb-4">Perfect pasalubong gifts</p>
                <HashLink to="/products#pasalubong">
                  <Button size="md" variant="secondary" >View Pasalubong</Button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCATION --- */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-center text-primary-2 font-bold text-3xl lg:text-4xl mb-12">
            Visit Our Main Branch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-primary-3/10 p-8 rounded-2xl">
                <h3 className="font-bold text-2xl mb-4 text-primary-2 flex items-center gap-2">
                  <span>📍</span> Location
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-2">
                  Lety's Buko Pie, National Road,<br />
                  Barangay Anos, Los Baños, Laguna
                </p>
                <p className="text-gray-600">(in front of Heaven's Memorial Garden)</p>
                <div className="mt-4">
                  <NavLink to="/locations">
                    <Button size="md" variant="primary" >View All Locations</Button>
                  </NavLink>
                </div>
              </div>

              <div className="bg-primary-3/10 p-8 rounded-2xl">
                <h3 className="font-bold text-2xl mb-4 text-primary-2 flex items-center gap-2">
                  <span>🕐</span> Store Hours
                </h3>
                <p className="text-lg text-gray-700 mb-4">Open daily from 6:00 AM to 6:00 PM</p>
                <NavLink to="/contact">
                  <Button size="md" variant="primary" >Get in Touch</Button>
                </NavLink>
              </div>
            </div>
            
            <div>
              <img 
                src={IMAGES.MAIN_STORE.default}
                srcSet={IMAGES.MAIN_STORE.srcSet}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Main store view" 
                className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}