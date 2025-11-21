import { successSub } from '@/assets/images';
import PaymentInfo from '@/components/sections/adaa-plus/PaymentInfo';
import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput from '@/components/ui/extend/FormInput';
import { FileInput } from '@/components/ui/file-input';
import HSplit from '@/components/ui/h-split';
import { CrownIcon, UploadIcon } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SubmitButton from '@/components/ui/submit-button';
import { useUserState } from '@/context/UserProvider';
import useSubscriptionMutation from '@/hooks/mutations/useSubscriptionMutation';
import { subscribeSchema, type SubscribeForm } from '@/schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useDocumentHead } from '@/hooks/useDocumentHead';

const PAYMENT_PLANS = [
  {
    id: '1',
    title: 'اشتراك الشهري',
    price: '150',
    duration: 'شهريا'
  },
  {
    id: '2',
    title: 'اشتراك سنوي',
    price: '50',
    duration: 'سنويا'
  }
];

const BENEFITS = [
  'صلاحية كاملة نموذج قياس الأداء المؤسسي.',
  'صلاحية كاملة لتصميم لوحات الداشبورد لمنظمتك.',
  'صلاحية كاملة نماذج Power BI لقياس وتحليل الأداء.',
  'إرشادات استخدام الأدوات كاملة.'
];

export default function AdaaPlusPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      setTimeout(() => {
        navigate('/ادوات-اداء');
      }, 2000);
    }
  });

  const onSubmit = (data: SubscribeForm) => submitSubscription(data);
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) setValue('attachment', file, { shouldValidate: true });
  };

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
    <div className="relative container flex flex-col-reverse gap-12 p-2 sm:p-8 lg:h-screen lg:flex-row">
      <div className="basis-1/2 space-y-8">
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
            {errors.attachment && <ErrorMessage error={errors.attachment.message} />}
          </div>
          <SubmitButton className="w-full" onClick={handleSubmit(onSubmit)} isLoading={isPending}>
            اشتراك
          </SubmitButton>
        </div>
      </div>

      <div className="h-full basis-1/2">
        <div className="bg-primary flex h-full w-full flex-col gap-6 rounded-2xl p-4 py-8 sm:p-8">
          <div className="space-y-2 text-white">
            <h2 className="text-2xl font-semibold">خطط الأشتراك</h2>
          </div>

          <RadioGroup
            dir="rtl"
            value={plan_id.toString()}
            onValueChange={(value) => setValue('plan_id', value as '1' | '2')}
            className="flex flex-col gap-4"
          >
            {PAYMENT_PLANS.map((planItem) => (
              <Label
                key={planItem.id}
                htmlFor={planItem.id.toString()}
                className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 bg-[#E8F3F5] px-8 py-2 ${
                  plan_id === planItem.id ? 'border-[#B4A200] shadow-lg' : 'border-transparent'
                }`}
              >
                <RadioGroupItem
                  value={planItem.id.toString()}
                  id={planItem.id.toString()}
                  className="h-5 w-5 shrink-0 text-white data-[state=checked]:border-[#B4A200] data-[state=checked]:bg-[#B4A200] [&_svg]:size-2 [&_svg]:fill-white"
                />
                <div className="flex w-full items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{planItem.title}</h3>
                    <span className="text-muted text-sm">
                      {planItem.price} ريال / {planItem.duration} / للعضو
                    </span>
                  </div>

                  {planItem.id === '2' && (
                    <div className="shrink-0 rounded-md bg-[#B4A200] px-4 py-1">
                      <span className="text-sm text-white">وفر 70%</span>
                    </div>
                  )}
                </div>
              </Label>
            ))}
          </RadioGroup>

          <HSplit className="border-t-2 border-t-white" />

          <div className="flex w-full justify-between text-white">
            <h3 className="text-xl font-semibold">المميزات</h3>
            <span>{`${PAYMENT_PLANS[parseInt(plan_id) - 1].price} ريال / ${PAYMENT_PLANS[parseInt(plan_id) - 1].duration}`}</span>
          </div>
          <ul className="space-y-6 font-semibold">
            {BENEFITS.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-white">
                <CrownIcon /> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
