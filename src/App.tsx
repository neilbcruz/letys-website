import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageHeader from './components/layout/PageHeader';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductsAvailabilityPage from './pages/ProductsAvailabilityPage';
import LocationsPage from './pages/LocationsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PageFooter from './components/layout/PageFooter';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Router>
        <PageHeader />
        
        <main className="grow">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage /> } />
            <Route path='/availability' element={<ProductsAvailabilityPage />} />
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