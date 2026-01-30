import PageHero from '@/components/home/PageHero';
import PageBody from '@/components/home/PageBody';
import { SkipLinks } from '@/components/accessibility';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function HomePage() {
  return (
    <ErrorBoundary>
      <SkipLinks />
      <div className="w-full">
        <PageHero />
        <PageBody />
      </div>
    </ErrorBoundary>
  );
}
