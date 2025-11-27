import { successSub } from '@/assets/images';
import { FileInput } from '@/components/ui/file-input';
import { UploadIcon } from '@/components/ui/icons';
import { useUserState } from '@/context/UserProvider';
import { subscribeSchema, type SubscribeForm } from '@/schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import FormInput from '@/components/ui/extend/FormInput';
import SubmitButton from '@/components/ui/submit-button';
import PaymentInfo from '@/components/sections/adaa-plus/PaymentInfo';
import ErrorMessage from '@/components/ui/extend/error-message';
import useSubscriptionMutation from '@/hooks/mutations/useSubscriptionMutation';
import SubscriptionOptionsSection from '@/components/sections/adaa-plus/SubscriptionOptions';

export default function AdaaPlusPage() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserState();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SubscribeForm>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      plan_id: '1'
    }
  });
  const plan_id = watch('plan_id');

  const { mutate: submitSubscription, isPending } = useSubscriptionMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => navigate('/ادوات-اداء'), 2000);
    }
  });

  const onSubmit = (data: SubscribeForm) => submitSubscription(data);
  const handleFileChange = (file: File | null) => file && setValue('attachment', file, { shouldValidate: true });
  const selectedFile = watch('attachment', undefined);

  useDocumentHead({
    title: 'أداء المميز - ترقية الاشتراك في منصة أداء',
    description:
      'قم بترقية اشتراكك إلى أداء المميز للاستفادة من جميع الأدوات والخدمات المتقدمة التي تقدمها منصة أداء للمنظمات غير الربحية.'
  });

  if (success)
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <img src={successSub} alt="Success" className="w-96" />
        <p className="text-3xl text-[#945D05]">لقد تم ترقيتك الى الأصدار المميز </p>
        <p className="mt-6 text-3xl">نتمنى لك وقتا سعيدا و تستمتع بجميع مميزاتنا</p>
        <p className="mt-4">جاري التحول لصفة الادوات...</p>
      </div>
    );

  return (
    <div className="relative mx-auto flex max-w-[1550px] flex-col-reverse lg:flex-row">
      <div className="basis-1/2 space-y-8 p-4 sm:p-8">
        <p className="text-secondary">أداء المميز</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">الترقية الى الأصدار المميز !</h1>
          <p>في حالة الاشتراك يتم التحويل بإسم"شركة ولادة حلم للاستشارات والأبحاث" حسب البیانات التالیة</p>
        </div>

        <PaymentInfo />

        <div className="space-y-2">
          <FormInput
            label="البريد الالكتروني"
            {...register('email')}
            error={errors.email?.message}
            disabled={isPending}
          />

          <FormInput label="رقم الجوال" {...register('phone')} error={errors.phone?.message} disabled={isPending} />

          <div>
            <FileInput
              id="attachment-subscription"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onFileChange={handleFileChange}
              disabled={isPending}
            >
              <div className="flex w-52 items-center gap-4">
                <div className="shrink-0">
                  <UploadIcon className="h-7 w-7" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="truncate font-semibold text-ellipsis">{selectedFile?.name || 'ارفع شاهد التحويل'}</p>
                  <p className="text-muted text-xs">PDF / Word / صورة (حد أقصى 10 MB)</p>
                </div>
              </div>
            </FileInput>
            <ErrorMessage error={errors.attachment?.message} />
          </div>
          <SubmitButton className="w-full" onClick={handleSubmit(onSubmit)} isLoading={isPending}>
            اشتراك
          </SubmitButton>
        </div>
      </div>

      <div className="static h-screen basis-1/2 p-4 pb-0 sm:p-8 lg:sticky lg:top-0 lg:min-h-[650px]">
        <SubscriptionOptionsSection selected={plan_id} onChange={(value) => setValue('plan_id', value)} />
      </div>
    </div>
  );
}
