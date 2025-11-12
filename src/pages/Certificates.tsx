import CertificatesClassesSection from '@/components/sections/Certificates/CertificatesClasses';
import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import CertificatesScheduleSection from '@/components/sections/Certificates/CertificatesSchedule';
import CertificatesTermsSection from '@/components/sections/Certificates/CertificatesTerms';
import EvaluationBoardSection from '@/components/sections/Certificates/EvaluationBoard';
import CertificatePickTrackSection from '@/components/sections/Certificates/CertificatePickTrack';

export default function CertificatesPage() {
  return (
    <div className="space-y-12">
      <CertificatesHeroSection />
      <CertificatesClassesSection />
      <CertificatesTermsSection />
      <CertificatesScheduleSection />
      <CertificatePickTrackSection />
      <EvaluationBoardSection />
    </div>
  );
}
