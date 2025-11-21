import AdaaPodcastsSection from '@/components/sections/podcast/AdaaPodcasts';
import NewsSection from '@/components/sections/podcast/News';
import PodcastHeroSection from '@/components/sections/podcast/PodcastHero';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function Podcast() {
  useDocumentHead({
    title: 'كرسي أداء - بودكاست التميز المؤسسي للقطاع غير الربحي',
    description:
      'استمع إلى حلقات كرسي أداء، البودكاست المتخصص في مناقشة قضايا التميز المؤسسي والأداء الاحترافي للمنظمات غير الربحية مع خبراء ومختصين في القطاع.',
    ogTitle: 'كرسي أداء - بودكاست التميز المؤسسي',
    ogDescription: 'بودكاست متخصص في مناقشة قضايا التميز المؤسسي والأداء الاحترافي للمنظمات غير الربحية.'
  });

  return (
    <div>
      <PodcastHeroSection />
      <NewsSection />
      <AdaaPodcastsSection />
    </div>
  );
}
