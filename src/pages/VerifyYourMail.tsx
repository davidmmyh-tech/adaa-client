import BackgroundElement1, { BackgroundElement2 } from '@/components/ui/extend/BackgroundElements';
import ErrorMessage from '@/components/ui/extend/error-message';
import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import useResendVerifyMailMutation from '@/hooks/mutations/useResendVerifyMailMutation';
import useCountDown from '@/hooks/useCountDown';
import { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/routes';

export default function VerifyYourMail() {
  useDocumentHead({
    title: 'تحقق من بريدك الإلكتروني - أداء',
    description: 'يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك في منصة أداء.'
  });

  const { countdown, isCounting, restart } = useCountDown({ initial: 120, interval: 120 });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useResendVerifyMailMutation({
    onSuccess: () => {
      restart();
      setError(null);
    },
    onError: (err) => {
      if (err.response?.status === 400) {
        if (err.response.data.message === 'Email is already verified') {
          setError('تم تفعيل بريدك الإلكتروني مسبقًا, سيتم تحويلك لتسجيل الدخول خلال ثوانٍ.');
          setTimeout(() => {
            navigate(ROUTES.AUTH.LOGIN);
          }, 3000);
          return;
        } else return setError('لا يمكن تكرار الطلب في الوقت الحالي. يرجى المحاولة لاحقًا.');
      }
      setError('حدث خطأ ما، يرجى المحاولة مرة أخرى.');
    }
  });

  return (
    <>
      <div className="fixed end-8 bottom-8 w-[30vw]">
        <BackgroundElement1 />
      </div>

      <div className="fixed start-8 top-8 w-[20vw]">
        <BackgroundElement2 />
      </div>

      <div className="relative z-20 container mx-auto my-20 w-full max-w-2xl grow space-y-8 px-8">
        <div className="w-full">
          <div className="bg-secondary mx-auto block w-fit rounded-full p-8">
            <Logo className="h-24 w-24" variant="light" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold">
          "شكرًا لانضمامك إلى منصة اداء . يرجى تفعيل حسابك من خلال الرابط المرسل لبريدك."
        </h1>

        <div className="space-y-4">
          <ErrorMessage error={error} />

          <div className="flex flex-col items-center gap-4">
            <SubmitButton onClick={() => mutate()} isLoading={isPending} disabled={isCounting || isPending}>
              {isCounting ? `إعادة الإرسال ${countdown} ثانية` : 'إعادة ارسال التفعيل'}
            </SubmitButton>

            {isCounting && <p className="text-muted text-center text-sm">يمكنك طلب إعادة الإرسال بعد انتهاء العداد</p>}
          </div>
        </div>
      </div>
    </>
  );
}
