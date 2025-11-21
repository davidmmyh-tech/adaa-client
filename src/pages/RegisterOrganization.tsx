import BackgroundElement1, { BackgroundElement2 } from '@/components/ui/extend/BackgroundElements';
import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput, { type FormInputProps } from '@/components/ui/extend/FormInput';
import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import useRegisterOrganizationMutation from '@/hooks/mutations/useRegisterOrganizationMutation';
import { registerOrganizationSchema, type RegisterOrganizationForm } from '@/schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function RegisterOrganizationPage() {
  const [error, setError] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterOrganizationForm>({
    resolver: zodResolver(registerOrganizationSchema)
  });

  const { mutate, isPending } = useRegisterOrganizationMutation({
    onError: (error) => {
      if (error.response?.status === 405) return setError('الرخصة تم تسجيلها من قبل');
      if (error.response?.status === 422) return setError('البيانات تمم استخدامها من قبل او غير صحيحة');
      setError('خطاء غير معروف حاول لاحقا');
    }
  });

  useDocumentHead({
    title: 'تسجيل منظمة - أداء',
    description:
      'سجّل منظمتك غير الربحية في منصة أداء للحصول على التقييمات والشهادات المعتمدة والاستفادة من الخدمات المتخصصة.'
  });

  const submitForm = handleSubmit((form: RegisterOrganizationForm) => mutate(form));
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
          “شكرًا لانضمامك إلى منصة اداء . يرجى تفعيل حسابك من خلال الرابط المرسل لبريدك.”
        </h1>

        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-2xl">
          <div className="flex gap-4">
            <CustomeFormInput placeholder="اسم المنظمة" {...register('name')} error={errors.name?.message} />
            <CustomeFormInput
              placeholder="اسم المدير التنفيذي"
              {...register('executive_name')}
              error={errors.executive_name?.message}
            />
          </div>

          <div className="flex gap-4">
            <CustomeFormInput placeholder="البريد الالكتروني" {...register('email')} error={errors.email?.message} />
            <CustomeFormInput placeholder="رقم الهاتف" {...register('phone')} error={errors.phone?.message} />
          </div>

          {/* <CustomeFormInput placeholder="العنوان" {...register('address')} error={errors.address?.message} /> */}

          <div className="grid grid-cols-2 gap-4">
            <CustomeFormInput
              placeholder="رقم الرخصة"
              {...register('license_number')}
              error={errors.license_number?.message}
            />
            {/* <CustomeFormInput
              placeholder="الموقع الالكتروني"
              {...register('website')}
              error={errors.website?.message}
            /> */}
          </div>

          <div className="text-end">
            <ErrorMessage error={error} />
            <SubmitButton onClick={submitForm} className="mt-2 w-full" isLoading={isPending}>
              تاكيد التفعيل
            </SubmitButton>
          </div>
        </div>
      </div>
    </>
  );
}

function CustomeFormInput(props: FormInputProps) {
  return (
    <FormInput
      {...props}
      className="border-b-secondary rounded-none border-0 border-b p-1 focus-visible:border-0 focus-visible:border-b focus-visible:ring-0"
    />
  );
}
