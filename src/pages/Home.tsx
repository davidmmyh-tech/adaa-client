import { Suspense, lazy } from 'react';
import Hero from '@/components/sections/home/Hero';
import PlatformDescriptionSection from '@/components/sections/home/PlatformDescription';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const ServicesSection = lazy(() => import('@/components/sections/home/Services'));
const HowToJoinSection = lazy(() => import('@/components/sections/home/HowToJoin'));
const PartnersSection = lazy(() => import('@/components/sections/home/Partners'));

export default function HomePage() {
  useDocumentHead({
    title: 'أداء - منصة التميز المؤسسي للقطاع غير الربحي',
    description:
      'منصة أداء هي المنصة الرائدة لتقييم وتطوير أداء المنظمات غير الربحية في المملكة العربية السعودية. نقدم درع أداء، شهادات الأداء المؤسسي، كرسي أداء، وأدوات تقييم متخصصة.',
    ogTitle: 'أداء - منصة التميز المؤسسي للقطاع غير الربحي',
    ogDescription: 'منصة أداء هي المنصة الرائدة لتقييم وتطوير أداء المنظمات غير الربحية في المملكة العربية السعودية.'
  });

  return (
    <div className="space-y-18">
      <Hero />
      <PlatformDescriptionSection />
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HowToJoinSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PartnersSection />
      </Suspense>
    </div>
  );
}
