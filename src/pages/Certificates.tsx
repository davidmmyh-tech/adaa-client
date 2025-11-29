import CertificatesClassesSection from '@/components/sections/Certificates/CertificatesClasses';
import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import CertificatesScheduleSection from '@/components/sections/Certificates/CertificatesSchedule';
import CertificatesTermsSection from '@/components/sections/Certificates/CertificatesTerms';
import EvaluationBoardSection from '@/components/sections/Certificates/EvaluationBoard';
import CertificatePickTrackSection from '@/components/sections/Certificates/CertificatePickTrack';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function CertificatesPage() {
  useDocumentHead({
    title: 'شهادات أداء - شهادة الأداء المؤسسي المعتمدة',
    description:
      'احصل على شهادة الأداء المؤسسي المعتمدة. منصة إلكترونية لقياس وتقييم أداء الجمعيات في ثلاثة مسارات مستقلة مع إصدار شهادة معتمدة.',
    ogTitle: 'شهادات أداء - شهادة الأداء المؤسسي المعتمدة',
    ogDescription: 'منصة إلكترونية لقياس وتقييم أداء الجمعيات في ثلاثة مسارات مستقلة، مع إصدار شهادة أداء معتمدة.'
  });

  return (
    <div className="space-y-12">
      <CertificatesHeroSection
        title={`احصل على شهادة الأداء المؤسسي لعام ${new Date().getFullYear()}`}
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
