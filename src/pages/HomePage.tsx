import PageHero from '@/components/home/PageHero';
import PageBody from '@/components/home/PageBody';
import { SkipLinks } from '@/components/accessibility';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SEOHead, LocalBusinessSchema, ProductsSchema, FAQSchema } from '@/components/seo';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <SEOHead pageKey="home" />
      <LocalBusinessSchema />
      <ProductsSchema />
      <FAQSchema />
      <SkipLinks />
      <div className="w-full">
        <PageHero />
        <PageBody />
      </div>
    </ErrorBoundary>
  );
}
