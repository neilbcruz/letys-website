import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import HomePage from './pages/HomePage/HomePage';
import PageHeader from './components/PageHeader/PageHeader';
import ProductsPage from './pages/ProductsPage/ProductsPages';
import StoresPage from './pages/StoresPage/StoresPage';
import FaqPage from './pages/FaqPage/FaqPage';
import ContactPage from './pages/ContactPage/ContactPage';

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
            <Route path='/stores' element={<StoresPage />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;