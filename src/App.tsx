import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageHeader from './components/layout/PageHeader';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
// import ProductSpecialty from './components/home/ProductSpecialty';
// import ProductGoods from './components/home/ProductGoods';
// import ProductPasa from './components/home/ProductPasa';
import LocationsPage from './pages/LocationsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PageFooter from './components/layout/PageFooter';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Router>
        <PageHeader />
        
        <main className="grow">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />}>
              {/* <Route path='specialty' element={<ProductSpecialty />} />
              <Route path='bakedgoods' element={<ProductGoods />} />
              <Route path='pasalubong' element={<ProductPasa />} /> */}
            </Route>
            <Route path='/locations' element={<LocationsPage />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </main>

        <PageFooter />
      </Router>
    </div>
  );
}

export default App;