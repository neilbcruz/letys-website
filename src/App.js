import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import PageHeader from './components/PageHeader/PageHeader';

import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPages';
import LocationsPage from './pages/LocationsPage/LocationsPage';
import FaqPage from './pages/FaqPage/FaqPage';
import ContactPage from './pages/ContactPage/ContactPage';

import PageFooter from './components/PageFooter/PageFooter';

function App() {
  return (
    <>
      <div className='app'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Lety's Buko Pie</title>
          <link rel="icon" href="./assets/icons/favicon.ico" />
          {/* <link rel="canonical" href="https://neilbcruz.com/" /> */}
          <meta name="description" content="Lety's Buko Pie Website" />
        </Helmet>
        <Router>
          <PageHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/locations' element={<LocationsPage />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
          <PageFooter />
        </Router>
      </div>
    </>
  );
}

export default App;