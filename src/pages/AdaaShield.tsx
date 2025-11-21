import CommonQuestion from '@/components/sections/adaa-shield/CommonQuestion';
import EvaluationSection from '@/components/sections/adaa-shield/Evaluation';
import AdaaShieldHeroSection from '@/components/sections/adaa-shield/Hero';
import PrizesSection from '@/components/sections/adaa-shield/Prizes';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function AdaaShieldPage() {
  useDocumentHead({
    title: 'درع أداء - جائزة التميز المؤسسي للمنظمات غير الربحية',
    description:
      'درع أداء هو جائزة سنوية تكرّم المنظمات غير الربحية المتميزة في الأداء المؤسسي. تقييم شامل للأداء مع جوائز وشهادات تقدير للفائزين.',
    ogTitle: 'درع أداء - جائزة التميز المؤسسي',
    ogDescription: 'جائزة سنوية تكرّم المنظمات غير الربحية المتميزة في الأداء المؤسسي مع تقييم شامل وجوائز قيمة.'
  });

  return (
    <div className="-mb-12 space-y-18">
      <AdaaShieldHeroSection />
      <PrizesSection />
      <EvaluationSection />
      <CommonQuestion />
    </div>
  );
}
