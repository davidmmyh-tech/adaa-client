import CertificatesClassesSection from '@/components/sections/certificates/CertificatesClasses';
import CertificatesHeroSection from '@/components/sections/certificates/CertificatesHero';
import CertificatesScheduleSection from '@/components/sections/certificates/CertificatesSchedule';
import CertificatesTermsSection from '@/components/sections/certificates/CertificatesTerms';
import EvaluationBoardSection from '@/components/sections/certificates/EvaluationBoard';
import CertificatePickTrackSection from '@/components/sections/certificates/CertificatePickTrack';

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
