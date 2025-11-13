import CertificatesClassesSection from '@/components/sections/Certificates/CertificatesClasses';
import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import CertificatesScheduleSection from '@/components/sections/Certificates/CertificatesSchedule';
import CertificatesTermsSection from '@/components/sections/Certificates/CertificatesTerms';
import EvaluationBoardSection from '@/components/sections/Certificates/EvaluationBoard';
import CertificatePickTrackSection from '@/components/sections/Certificates/CertificatePickTrack';

export default function CertificatesPage() {
  return (
    <div className="space-y-12">
      <CertificatesHeroSection
        title="احصل على شهادة الأداء المؤسسي لعام 2025"
        subtitle="منصة إلكترونية لقياس وتقييم أداء الجمعيات في ثلاثة مسارات مستقلة، مع إصدار شهادة أداء رقمية معتمدة لكل مسار
          يتم تقييمه."
        isHome
      />
      <CertificatesClassesSection />
      <CertificatesTermsSection />
      <CertificatesScheduleSection />
      <CertificatePickTrackSection />
      <EvaluationBoardSection />
    </div>
  );
}
