import AdaaPodcastsSection from '@/components/sections/podcast/AdaaPodcasts';
import NewsSection from '@/components/sections/podcast/News';
import PodcastHeroSection from '@/components/sections/podcast/PodcastHero';

export default function Podcast() {
  return (
    <div>
      <PodcastHeroSection />
      <NewsSection />
      <AdaaPodcastsSection />
    </div>
  );
}
