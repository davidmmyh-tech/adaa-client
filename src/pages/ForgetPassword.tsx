import FormInput from '@/components/ui/extend/FormInput';
import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import useForgetPasswordMutation from '@/hooks/mutations/useForgetPasswordMutation';
import { useState } from 'react';

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>();

  const { mutate, isPending, isSuccess } = useForgetPasswordMutation({
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

  return (
    <form className="mx-auto mt-28 flex w-full max-w-2xl flex-col space-y-4 px-8" onSubmit={handleSubmit}>
      <div className="w-full">
        <div className="bg-secondary mx-auto block w-fit rounded-full p-8">
          <Logo className="h-24 w-24" variant="light" />
        </div>
      </div>
      {isSuccess ? (
        <p className="my-4 text-2xl font-semibold">تم ارسال رابط استعادة كلمة السر الى بريدك الالكتروني!</p>
      ) : (
        <>
          <h1 className="mb-4 text-center text-2xl font-bold">اعادة تعيين كلمة السر</h1>
          <p className="text-muted text-center">ادخل بريدك الالكتروني لاستعادة كلمة السر</p>
          <FormInput
            label="البريد الالكتروني"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          <SubmitButton className="mx-auto block" isLoading={isPending}>
            إعادة تعيين كلمة السر
          </SubmitButton>
        </>
      )}
    </form>
  );
}
