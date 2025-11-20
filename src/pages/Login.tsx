import { loginSchema, type LoginForm } from '@/schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useLoginMutation from '@/hooks/mutations/useLoginMutation';
import FormInput from '@/components/ui/extend/FormInput';
import SubmitButton from '@/components/ui/submit-button';
import { authImage } from '@/assets/images';
import ErrorMessage from '@/components/ui/extend/error-message';
import { Link } from 'react-router';

export default function LoginPage() {
  const [error, setError] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const { mutate, isPending } = useLoginMutation({
    onError: (err) => {
      if (err.response?.status === 401) setError('كلمة المرور او البريد غير صحيح');
      else setError('خطأ غير متوقع حاول لاحقا');
    }
  });

  const submitForm = handleSubmit((form: LoginForm) => mutate(form));

  return (
    <div className="flex min-h-screen gap-4">
      <div className="mx-auto mt-28 max-w-lg grow space-y-8 px-8">
        <div>
          <h1 className="text-xl font-semibold">مرحبًا بعودتك إلى أداء!</h1>
          <p className="text-muted">برجاء تسجيل الدخول لتتمكن من مباشرة صلاحياتك</p>
        </div>

        <div className="space-y-2">
          <FormInput label="البريد الالكتروني" {...register('email')} error={errors.email?.message} />
          <FormInput label="كلمة المرور" type="password" {...register('password')} error={errors.password?.message} />
        </div>

        <div className="text-center">
          <ErrorMessage error={error} className="flex justify-center text-center" />
          <SubmitButton className="mt-4" onClick={submitForm} isLoading={isPending}>
            تسجيل الدخول
          </SubmitButton>
        </div>

        <p className="text-center">
          <Link className="ms-2 underline" to="/نسيت-كلمة-المرور">
            هل نسيت كلمة المرور ؟
          </Link>
        </p>

        <p className="text-center">
          <span>ليس لديك حساب؟ </span>
          <Link className="ms-2 underline" to="/حساب-جديد">
            انشئ حساب الآن
          </Link>
        </p>
      </div>
      <img src={authImage} alt="Register Image" className="sticky top-0 hidden h-screen w-1/3 object-cover sm:block" />
    </div>
  );
}
