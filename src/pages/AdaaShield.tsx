import CommonQuestion from '@/components/sections/adaa-shield/CommonQuestion';
import EvaluationSection from '@/components/sections/adaa-shield/Evaluation';
import AdaaShieldHeroSection from '@/components/sections/adaa-shield/Hero';
import PrizesSection from '@/components/sections/adaa-shield/Prizes';

export default function AdaaShieldPage() {
  return (
    <div className="-mb-12 space-y-18">
      <AdaaShieldHeroSection />
      <PrizesSection />
      <EvaluationSection />
      <CommonQuestion />
    </div>
  );
}
