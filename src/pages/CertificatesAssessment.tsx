import CertificatesHeroSection from '@/components/sections/certificates/CertificatesHero';
import SubmitButton from '@/components/ui/submit-button';
import { certificateTracks } from '@/constants/data';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

const axies = [
  { name: 'المحور الأول', title: 'الحوكمة النتائج' },
  { name: 'المحور الثاني', title: 'الاستراتيجية  النتائج' },
  { name: 'المحور الثالث', title: 'العمليات  النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج' },
  { name: 'المحور الرابع', title: 'النتائج النتائج النتائج النتائج' }
];

export default function CertificatesAssessmentPage() {
  const [searchParams] = useSearchParams();
  const tracks = (searchParams.getAll('tracks') || []) as (keyof typeof certificateTracks)[];
  const [currentModelData, setCurrentModelData] = useState({
    currentAxisIndex: 0,
    currentModelIndex: 0
  });

  const handleNext = () => {
    if (currentModelData.currentAxisIndex < axies.length - 1) {
      setCurrentModelData((prev) => ({ ...prev, currentAxisIndex: prev.currentAxisIndex + 1 }));
    } else if (currentModelData.currentModelIndex < tracks.length - 1) {
      setCurrentModelData((prev) => ({ currentAxisIndex: 0, currentModelIndex: prev.currentModelIndex + 1 }));
    }
  };

  return (
    <>
      <CertificatesHeroSection
        title="مرحبًا بكم في جائزة “درع أداء”!"
        subtitle="للتسجيل:
لتسجيل جمعيتك في “درع أداء”، يرجى تعبئة النموذج أدناه. نرجو منك التأكد من تقديم معلومات دقيقة وكاملة ليتم تقييم مشاركتك بشكل صحيح."
      />

      <div className="mt-8 space-y-8">
        <div className="flex justify-center gap-4">
          {tracks.map((t, index) => (
            <div
              key={t}
              className={`w-52 space-y-1 rounded-lg border p-4 text-center text-sm ${currentModelData.currentModelIndex === index ? 'border-accent bg-accent/10 text-secondary' : ''}`}
            >
              <p>نموذج</p>
              <p>{certificateTracks[t].label}</p>
            </div>
          ))}
        </div>

        <div className="container">
          <div className="no-scrollbar max-w-full overflow-auto">
            <div className="w-fit min-w-full space-y-4">
              <div className="text-muted flex w-fit min-w-full justify-between text-center text-sm font-semibold">
                {axies.map((axisItem, i) => (
                  <div
                    key={axisItem.name}
                    className={`w-36 space-y-2 transition-colors duration-500 ${i === currentModelData.currentAxisIndex ? 'text-secondary' : ''}`}
                  >
                    <p>{axisItem.name}</p>
                    <p>{axisItem.title}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted relative mb-1 h-1 w-full">
                <div
                  className="bg-secondary absolute -top-0.5 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentModelData.currentAxisIndex + 1) * 100) / axies.length}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <SubmitButton variant="secondary" className="mx-auto w-32" onClick={handleNext}>
          التالي
        </SubmitButton>
      </div>
    </>
  );
}
