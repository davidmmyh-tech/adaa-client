import FormInput from '@/components/ui/extend/FormInput';
import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import useForgetPasswordMutation from '@/hooks/mutations/useForgetPasswordMutation';
import useCountDown from '@/hooks/useCountDown';
import { useState } from 'react';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>();
  const { countdown, isCounting, restart } = useCountDown({ initial: 0, interval: 120 });

  const { mutate, isPending, isSuccess } = useForgetPasswordMutation({
    onSuccess: () => restart(),
    onError: (error) => {
      if (error.response?.status === 400)
        return setError('لا يمكنك تغير كلمة المرور حاليا, انتظر بعض الوقت ثم حاول مرة اخرى');
      if (error.response?.status === 404) return setError('البريد الالكتروني غير مسجل');
      setError('حدث خطأ غير متوقع، يرجى المحاولة لاحقًا');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email);
  };

  useDocumentHead({
    title: 'استعادة كلمة المرور - أداء',
    description: 'أعد تعيين كلمة المرور الخاصة بك في منصة أداء للوصول إلى حسابك.'
  });

  return (
    <div className="mx-auto mt-28 w-full max-w-2xl space-y-8 px-8">
      <div className="w-full">
        <div className="bg-secondary mx-auto block w-fit rounded-full p-8">
          <Logo className="h-24 w-24" variant="light" />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-center text-2xl font-bold">اعادة تعيين كلمة السر</h1>
        <p className="text-muted text-center">ادخل بريدك الالكتروني لاستعادة كلمة السر</p>
      </div>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <FormInput
          label="البريد الالكتروني"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <div className="flex flex-col items-center gap-4 pt-4">
          {isSuccess && (
            <p className="text-success text-center text-xl font-semibold">
              تم ارسال رابط استعادة كلمة السر الى بريدك الالكتروني!
            </p>
          )}
          <SubmitButton onClick={handleSubmit} isLoading={isPending} disabled={isCounting || isPending}>
            {isCounting ? `إعادة الإرسال ${countdown} ثانية` : 'إعادة تعيين كلمة السر'}
          </SubmitButton>
          {isCounting && <p className="text-muted text-center text-sm">يمكنك طلب إعادة الإرسال بعد انتهاء العداد</p>}
        </div>
      </form>
    </div>
  );
}
