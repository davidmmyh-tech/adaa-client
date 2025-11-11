import { Suspense, lazy } from 'react';
import Hero from '@/components/sections/home/Hero';
import PlatformDescriptionSection from '@/components/sections/home/PlatformDescription';

const ServicesSection = lazy(() => import('@/components/sections/home/Services'));
const HowToJoinSection = lazy(() => import('@/components/sections/home/HowToJoin'));
const PartnersSection = lazy(() => import('@/components/sections/home/Partners'));

export default function HomePage() {
  return (
    <div className="space-y-12">
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
