import BackgroundElement1, { BackgroundElement2 } from '@/components/ui/extend/BackgroundElements';
import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import { getSessionEmail } from '@/lib/storage';
import { resendEmailVerification } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function VerifyYourMail() {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => resendEmailVerification({ email: getSessionEmail() }),
    onSuccess: () => {
      setCountdown(60);
      setCanResend(false);
    }
  });

  useEffect(() => {
    if (countdown === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <>
      <div className="fixed end-8 bottom-8 w-[30vw]">
        <BackgroundElement1 />
      </div>

      <div className="fixed start-8 top-8 w-[20vw]">
        <BackgroundElement2 />
      </div>

      <div className="relative z-20 container mx-auto my-20 grow space-y-8 px-8">
        <div className="w-full">
          <div className="bg-secondary mx-auto block w-fit rounded-full p-8">
            <Logo className="h-24 w-24" variant="light" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold">
          "شكرًا لانضمامك إلى منصة اداء . يرجى تفعيل حسابك من خلال الرابط المرسل لبريدك."
        </h1>

        <div className="flex flex-col items-center gap-4">
          <SubmitButton onClick={() => mutate()} isLoading={isPending} disabled={!canResend || isPending}>
            {canResend ? 'إعادة ارسال التفعيل' : `إعادة الإرسال ${countdown} ثانية`}
          </SubmitButton>
          {!canResend && <p className="text-muted text-sm">يمكنك طلب إعادة الإرسال بعد انتهاء العداد</p>}
        </div>
      </div>
    </>
  );
}
