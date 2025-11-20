import AdaaShieldHeroSection from '@/components/sections/adaa-shield-assessment/AdaaShieldHero';
import ShildQuestionsSection from '@/components/sections/adaa-shield-assessment/ShieldQuestions';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';
import { useUserState } from '@/context/UserProvider';
import { useState } from 'react';

export default function AdaaShieldAssessmentPage() {
  const { setFlags, flags } = useUserState();
  const [success, setSuccess] = useState(() => flags.completed_shield);

  return (
    <>
      <AdaaShieldHeroSection
        title={`مرحبًا بكم في جائزة “درع أداء”!`}
        description="لتسجيل جمعيتك في “درع أداء”، يرجى تعبئة النموذج أدناه. نرجو منك التأكد من تقديم معلومات دقيقة وكاملة ليتم تقييم مشاركتك بشكل صحيح."
      />

      {success ? (
        <SuccessScreen>
          <p className="mb-4 text-2xl font-semibold">تهانينا! لقد أكملت جميع نماذج التقييم بنجاح.</p>
          <p>شكرًا لمشاركتك في جائزة درع أداء. سيتم مراجعة إجاباتك والاتصال بك قريبًا.</p>
        </SuccessScreen>
      ) : (
        <ShildQuestionsSection
          onSuccess={() => {
            setFlags((prev) => ({ ...prev, completed_shield: true }));
            setSuccess(true);
          }}
        />
      )}
    </>
  );
}
