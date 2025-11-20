import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import { CERTIFICATE_TRACKS } from '@/constants/data';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import StrategicModel from '@/components/sections/Certificates/questions/StrategicModel';
import OperationalModel from '@/components/sections/Certificates/questions/OperationalModel';
import HrModel from '@/components/sections/Certificates/questions/HrModel';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';
import { useUserState } from '@/context/UserProvider';
import type { CertificateTrack } from '@/schemas/types';

export default function CertificatesAssessmentPage() {
  const [searchParams] = useSearchParams();
  const trackParam = searchParams.getAll('tracks');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const { flags } = useUserState();

  const tracks = useMemo(() => {
    let tempTracks = trackParam && trackParam?.length > 0 ? [...trackParam] : ['hr', 'strategic', 'operational'];

    if (flags.completed_hr_certificate) tempTracks = tempTracks.filter((t) => t !== 'hr');
    if (flags.completed_strategic_certificate) tempTracks = tempTracks.filter((t) => t !== 'strategic');
    if (flags.completed_operational_certificate) tempTracks = tempTracks.filter((t) => t !== 'operational');
    if (tempTracks.length === 0) setSuccess(true);

    return [...tempTracks] as CertificateTrack[];
  }, []);

  const handleSuccessSubmission = useCallback(() => {
    if (currentTrackIndex >= tracks.length - 1) setSuccess(true);
    else setCurrentTrackIndex(currentTrackIndex + 1);
  }, [currentTrackIndex, tracks.length]);

  const trackFormMap = useMemo(
    () => ({
      strategic: <StrategicModel onSuccess={handleSuccessSubmission} isLast={false} />,
      operational: <OperationalModel onSuccess={handleSuccessSubmission} isLast={false} />,
      hr: <HrModel onSuccess={handleSuccessSubmission} isLast={true} />
    }),
    [handleSuccessSubmission]
  );

  return (
    <>
      <CertificatesHeroSection
        title="مرحبًا بكم في جائزة “درع أداء”!"
        subtitle="للتسجيل:
لتسجيل جمعيتك في “درع أداء”، يرجى تعبئة النموذج أدناه. نرجو منك التأكد من تقديم معلومات دقيقة وكاملة ليتم تقييم مشاركتك بشكل صحيح."
      />

      <div className="container">
        {success ? (
          <SuccessScreen>
            <div>
              <p className="mb-4 text-2xl font-semibold">تهانينا! لقد أكملت جميع نماذج التقييم بنجاح.</p>
              <p>شكرًا لمشاركتك في جائزة درع أداء. سيتم مراجعة إجاباتك والاتصال بك قريبًا.</p>
            </div>
          </SuccessScreen>
        ) : (
          <div className="mt-8 space-y-8">
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              {tracks.map((t, index) => (
                <div
                  key={t}
                  className={`w-full space-y-1 rounded-lg border p-4 text-center text-sm md:w-52 ${currentTrackIndex === index ? 'border-accent bg-accent/10 text-secondary' : ''}`}
                >
                  <p>نموذج</p>
                  <p>{CERTIFICATE_TRACKS[t].label}</p>
                </div>
              ))}
            </div>

            <div className="container">
              <div className="w-full overflow-hidden">
                <div
                  className="relative flex transition-all duration-500"
                  style={{ right: `-${currentTrackIndex * 100}%` }}
                >
                  {tracks.map((track) => (
                    <div className="w-full shrink-0" key={track}>
                      {trackFormMap[track]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
