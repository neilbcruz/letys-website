import PageHero from '@/components/home/PageHero';
import PageBody from '@/components/home/PageBody';

export default function HomePage() {
  return (
    <div className="w-full">
      <PageHero />
      <PageBody />
    </div>
  );
}