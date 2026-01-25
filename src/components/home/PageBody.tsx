import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Button from '../ui/Button';
import { IMAGES } from '@/lib/images';

export default function PageBody() {
  return (
    <div className="w-full min-h-screen text-gray-800">

      {/* --- BANNER --- */}
      <section className="relative bg-primary-1/90 text-primary-2 text-center py-12">
        <h1 className="font-bold text-3xl mb-2">Lety's Special Buko Pie</h1>
        <p className="text-lg max-w-xl mx-auto">
          Enjoy our selection of specialty pies, baked goods, and pasalubong treats made with love.
        </p>
        <img 
          src={IMAGES.BUKO_PIE.default}
          srcSet={IMAGES.BUKO_PIE.srcSet}
          sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 20rem"
          alt="Buko Pie"
          className="w-60 h-60 object-cover mt-6 rounded-lg shadow-lg mx-auto"
        />
      </section>

      {/* --- BUKO FACTS --- */}
      <section className="px-4 sm:px-8 lg:px-40 py-12">
        <h2 className="text-center text-primary-2 font-bold text-2xl py-3 border-y border-primary-2 mb-8 uppercase tracking-widest">
          Buko Facts
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-3">
            <p>Buko refers to a young, immature green coconut that hasn't fully ripened. They mostly contain water with little meat. As it matures at 8-10 months, the water becomes sweeter and the meat jelly-like.</p>
            <p>Buko is packed with nutritional value and antioxidants that protect against cellular damage and heart disease.</p>
            <p>Buko can be enjoyed in many ways: as refreshing dessert treats or in desserts like buko pandan, buko ice cream, and buko pie.</p>
          </div>
          <img 
            src={IMAGES.BUKO_TREE.default}
            srcSet={IMAGES.BUKO_TREE.srcSet}
            sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 15rem"
            alt="Young coconuts" 
            className="w-full lg:w-60 h-auto object-cover rounded-md" 
          />
        </div>
      </section>

      {/* --- ABOUT LETY --- */}
      <section className="px-4 sm:px-8 lg:px-40 py-12 bg-primary-3/20">
        <h2 className="text-center text-primary-2 font-bold text-2xl py-3 border-y border-primary-2 mb-8 uppercase tracking-widest">
          About Lety
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 space-y-3">
            <p>Leticia Ocampo Belarmino is the person behind Lety's Special Buko Pie. A native of Los Baños, she turned her hobby into a thriving business.</p>
            <p>She started in 1976 with a single oven. Her goal was to earn extra money for her kids' schooling while enjoying her free time.</p>
            <p>Today, she manages multiple store locations with her family.</p>
          </div>
          <img 
            src={IMAGES.LETY.default}
            srcSet={IMAGES.LETY.srcSet}
            sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 15rem"
            alt="Lety Belarmino" 
            className="w-full lg:w-60 h-auto object-cover rounded-md" 
          />
        </div>
      </section>

      {/* --- PRODUCTS --- */}
      <section className="px-4 sm:px-8 lg:px-40 py-12">
        <h2 className="text-center text-primary-2 font-bold text-2xl py-3 border-y border-primary-2 mb-8 uppercase tracking-widest">
          Products
        </h2>
        <p className="text-center mb-8 text-lg font-medium">
          Enjoy some of our products!<br />Specialty Pies, Baked Goods, and Pasalubong!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* BUKO PIE */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
            <img 
              src={IMAGES.BUKO_PIE.default}
              srcSet={IMAGES.BUKO_PIE.srcSet}
              sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 20rem"
              alt="Buko Pie"
              className="w-3/4 h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="font-bold text-lg mb-1">Buko Pie</h3>
            <HashLink to="/products#specialty">
              <Button size="sm">VIEW SPECIALTY</Button>
            </HashLink>
          </div>

          {/* CASSAVA CAKE */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
            <img 
              src={IMAGES.CASSAVA.default}
              srcSet={IMAGES.CASSAVA.srcSet}
              sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 20rem"
              alt="Cassava Cake" 
              className="w-3/4 h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="font-bold text-lg mb-1">Cassava Cake</h3>
            <HashLink to="/products#bakedgoods">
              <Button size="sm">VIEW BAKED GOODS</Button>
            </HashLink>
          </div>

          {/* BROAS */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center text-center">
            <img 
              src={IMAGES.PASALUBONG.default}
              srcSet={IMAGES.PASALUBONG.srcSet}
              sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 20rem"
              alt="Broas" 
              className="w-3/4 h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="font-bold text-lg mb-1">Broas</h3>
            <HashLink to="/products#pasalubong">
              <Button size="sm">VIEW PASALUBONG</Button>
            </HashLink>
          </div>
        </div>
      </section>

      {/* --- LOCATION --- */}
      <section className="px-4 sm:px-8 lg:px-40 py-12 bg-primary-3/10">
        <h2 className="text-center text-primary-2 font-bold text-2xl py-3 border-y border-primary-2 mb-8 uppercase tracking-widest">
          Main Branch
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-bold text-lg">Location:</h3>
              <p>Lety's Buko Pie, National Road, Barangay Anos, Los Baños, Laguna</p>
              <p>(in front of Heaven's Memorial Garden)</p>
            </div>
            <NavLink to="/locations">
              <Button size="sm">VIEW MORE LOCATIONS</Button>
            </NavLink>

            <div>
              <h3 className="font-bold text-lg">Store Hours:</h3>
              <p>Open daily from 6am to 6pm</p>
            </div>
            <NavLink to="/contact">
              <Button size="sm">GET IN TOUCH</Button>
            </NavLink>
          </div>
          <img 
            src={IMAGES.MAIN_STORE.default}
            srcSet={IMAGES.MAIN_STORE.srcSet}
            sizes="(max-width: 640px) 16rem, (max-width: 1024px) 24rem, 24rem"
            alt="Main store view" 
            className="w-full lg:w-96 h-auto rounded-lg shadow-md" 
          />
        </div>
      </section>
    </div>
  );
}
