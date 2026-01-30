// src/App.tsx - UPDATED WITH ERROR BOUNDARY AND LAZY LOADING
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageHeader from './components/layout/PageHeader';
import PageFooter from './components/layout/PageFooter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/ui';
import ScrollToTop from './components/ui/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductsAvailabilityPage = lazy(() => import('./pages/ProductsAvailabilityPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen bg-white">
        <Router>
          <ScrollToTop />
          <PageHeader />
          
          <main className="grow">
            <Suspense 
              fallback={
                <div className="flex justify-center items-center min-h-screen">
                  <LoadingSpinner label="Loading page..." />
                </div>
              }
            >
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/availability' element={<ProductsAvailabilityPage />} />
                <Route path='/locations' element={<LocationsPage />} />
                <Route path='/faq' element={<FaqPage />} />
                <Route path='/contact' element={<ContactPage />} />
              </Routes>
            </Suspense>
          </main>

          <PageFooter />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;