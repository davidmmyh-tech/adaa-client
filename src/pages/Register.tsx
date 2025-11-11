import { useState } from 'react';
import SubmitButton from '@/components/ui/submit-button';
import { registerSchema, type RegisterForm } from '@/schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { authImage } from '@/assets/images';
import FormInput from '@/components/ui/extend/FormInput';
import ErrorMessage from '@/components/ui/extend/error-message';
import { FormDropdown } from '@/components/ui/extend/FormDropdown';
import { authorities } from '@/constants/data';
import useRegisterMutation from '@/hooks/queries/useRegisterMutation';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const { mutate, isPending } = useRegisterMutation({
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.status === 405) return setError('البريد مستخدم من قبل');
        if (error.response?.status === 422)
          return setError('خطاء في التحقق من البيانات المدخلة, تحقق منها وحاول مرة اخرى');
        setError(error.response?.data?.message ?? 'خطاء غير معروف حاول لاحقا');
      }
    }
  });

  const submitForm = handleSubmit((form: RegisterForm) => mutate(form));
  return (
    <div className="flex min-h-screen gap-4">
      <div className="my-20 grow px-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold">مرحبا بك في أداء</h1>
          <p className="text-muted">برجاء ملئ البيانات المطلوبة لانشاء حسابك</p>
        </div>

        <div className="flex gap-4">
          <FormInput label="الاسم الاول" {...register('first_name')} error={errors.first_name?.message} />
          <FormInput label="الاسم الثاني" {...register('last_name')} error={errors.last_name?.message} />
        </div>

        <FormInput label="البريد الالكتروني" {...register('email')} error={errors.email?.message} />
        <FormInput label="رقم الهاتف" {...register('phone')} error={errors.phone?.message} />
        <FormInput label="العنوان البريدي" {...register('post')} error={errors.post?.message} />
        <FormInput label="كلمة المرور" type="password" {...register('password')} error={errors.password?.message} />
        <FormInput
          label="تأكيد كلمة المرور"
          type="password"
          {...register('password_confirmation')}
          error={errors.password_confirmation?.message}
        />
        <FormDropdown onChange={(value) => setValue('role', value)} values={authorities} selectLabel="أختر الصلاحية" />

        <div className="text-center">
          <ErrorMessage error={error} />
          <SubmitButton onClick={submitForm} className="mt-4" isLoading={isPending}>
            أنشئ حسابك الآن
          </SubmitButton>
        </div>
      </div>
      <img src={authImage} alt="Register Image" className="sticky top-0 hidden h-screen w-1/3 object-cover sm:block" />
    </div>
  );
}
