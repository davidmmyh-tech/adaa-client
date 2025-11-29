import { Button } from '@/components/ui/button';
import { TCell, TRow } from '@/components/ui/extend/TableItems';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import SubmitButton from '@/components/ui/submit-button';
import { CERTIFICATE_CLASSES } from '@/constants/data';
import { ROUTES } from '@/routes';
import type { CertificateClass, CertificateTrack } from '@/schemas/types';
import { deleteCertificateSubmission, downloadTrackData } from '@/services/certificates/certificates-data';
import type { CertificateTrackSummary } from '@/services/certificates/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Download, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

type Props = {
  trackName: CertificateTrack;
  title: string;
  icon: string;
  summary: CertificateTrackSummary | undefined;
};

export default function TracksTableRow({ title, icon, trackName, summary }: Props) {
  const queryClient = useQueryClient();
  const { mutate: download, isPending } = useMutation({
    mutationFn: () => downloadTrackData(trackName),
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 403) return toast.error('لا يمكنك تحميل الشهادة قبل الانتهاء من تقييم اجاباتك.');
      }
      toast.error('حدث خطأ أثناء تحميل الشهادة. يرجى المحاولة مرة لاحقا.');
    }
  });

  const { mutate: deleteSubmission, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteCertificateSubmission(trackName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-certificate-tracks-states'] }),
    onError: () => {
      toast.error('حدث خطأ أثناء الالغاء. يرجى المحاولة مرة أخرى.');
    }
  });

  const trackClass: CertificateClass | '____' = summary
    ? summary?.progress.percentage > 85
      ? 'diamond'
      : summary?.progress.percentage > 75
        ? 'gold'
        : summary?.progress.percentage > 65
          ? 'silver'
          : summary?.progress.percentage > 55
            ? 'bronze'
            : '____'
    : '____';

  return (
    <TRow>
      <TCell className="col-span-3 flex justify-start gap-2 ps-10">
        {summary?.status === 'قيد المراجعة' && (
          <SubmitButton
            className="-ms-6 h-4 w-4 bg-transparent p-0 hover:bg-transparent"
            onClick={() => deleteSubmission()}
          >
            <Trash2 className={'stroke-destructive' + isDeleting ? 'stroke-muted' : ''} />
          </SubmitButton>
        )}
        <img src={icon} className="h-6 w-6" alt={trackName} />
        {title}
      </TCell>
      <TCell className="col-span-3">{summary?.status || ''}</TCell>
      <TCell className="col-span-1">
        {summary && summary?.progress.percentage > 0 ? summary?.progress.percentage + '%' : '___'}
      </TCell>
      <TCell className="col-span-3">
        {trackClass !== '____' ? (
          <>
            <img src={CERTIFICATE_CLASSES[trackClass].icon} alt={trackClass} className="w-6" />
            {CERTIFICATE_CLASSES[trackClass].name}
          </>
        ) : (
          '---'
        )}
      </TCell>
      <TCell>
        {summary?.status === 'مكتمل' && (
          <SubmitButton className="w-full" onClick={() => download()} isLoading={isPending}>
            <div className="flex items-center gap-4">
              <Download /> تحميل الشهادة
            </div>
          </SubmitButton>
        )}

        {summary?.status === 'لم يبدأ بعد' && (
          <UserStateButton
            to={ROUTES.CERTIFICATES.ASSESSMENT + `?tracks=${trackName}`}
            className="w-full"
            variant="secondary"
          >
            ابدأ الآن
          </UserStateButton>
        )}

        {summary?.status === 'قيد المراجعة' && (
          <Button className="w-full" variant="outline">
            ⏳ قيد المراجعة
          </Button>
        )}
      </TCell>
    </TRow>
  );
}
