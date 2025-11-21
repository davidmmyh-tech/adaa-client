import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput from '@/components/ui/extend/FormInput';
import Logo from '@/components/ui/extend/Logo';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';
import SubmitButton from '@/components/ui/submit-button';
import useResetPasswordMutation from '@/hooks/mutations/useResetPasswordMutation';
import { useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function ChangePasswordPage() {
  useDocumentHead({
    title: 'تغيير كلمة المرور - أداء',
    description: 'أدخل كلمة المرور الجديدة لحسابك في منصة أداء.'
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [passwords, setPasswords] = useState<{ password: string; password_confirmation: string }>({
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const { mutate, isSuccess } = useResetPasswordMutation({
    onError: (err) => {
      if (err.response?.status === 400) setError('رابط إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية');
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passwords.password.length < 8) return setError('يجب أن تكون كلمة المرور 8 أحرف على الأقل');
    if (passwords.password !== passwords.password_confirmation)
      return setError('تاكيد كلمة المرور لا تتوافق مع كلمة المرور');
    mutate({ ...passwords, token: token });
  };

  const successAction = () => navigate('/تسجيل-الدخول');

  if (isSuccess)
    return (
      <SuccessScreen action={{ name: 'العودة إلى تسجيل الدخول', fn: successAction }}>
        <p className="text-4xl font-bold">تم تغيير كلمة المرور بنجاح</p>
      </SuccessScreen>
    );

  return (
    <div className="mx-auto flex h-screen w-full max-w-2xl flex-col justify-center space-y-4 px-4">
      <div className="w-full">
        <div className="bg-secondary mx-auto block w-fit rounded-full p-8">
          <Logo className="h-24 w-24" variant="light" />
        </div>
      </div>
      <h1 className="mb-4 text-center text-2xl font-bold">اعادة تعيين كلمة السر</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="كلمة المرور"
          type="password"
          value={passwords.password}
          onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
        />
        <FormInput
          label="تأكيد كلمة المرور"
          type="password"
          value={passwords.password_confirmation}
          onChange={(e) => setPasswords({ ...passwords, password_confirmation: e.target.value })}
        />
        <ErrorMessage error={error} />
        <SubmitButton className="w-full">تأكيد</SubmitButton>
      </form>
    </div>
  );
}
