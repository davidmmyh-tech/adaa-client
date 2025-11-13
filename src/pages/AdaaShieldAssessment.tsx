import AdaaShieldHeroSection from '@/components/sections/adaa-shield-assessment/AdaaShieldHero';
import CertificatesQuestionsSection from '@/components/sections/adaa-shield-assessment/ShieldQuestions';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';
import { useState } from 'react';

export default function AdaaShieldAssessmentPage() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <AdaaShieldHeroSection
        title={`مرحبًا بكم في جائزة “درع أداء”!`}
        description="لتسجيل جمعيتك في “درع أداء”، يرجى تعبئة النموذج أدناه. نرجو منك التأكد من تقديم معلومات دقيقة وكاملة ليتم تقييم مشاركتك بشكل صحيح."
      />

      {success ? (
        <SuccessScreen>
          <p className="text-2xl font-semibold">تم استلام إجاباتكم بنجاح!</p>
        </SuccessScreen>
      ) : (
        <CertificatesQuestionsSection onSuccess={() => setSuccess(true)} />
      )}
    </>
  );
}
