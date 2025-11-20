import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput from '@/components/ui/extend/FormInput';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SubmitButton from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { sponsorshipSchema, type SponsorshipForm } from '@/schemas/validation';
import { sponsorship } from '@/services/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SponsorshipSubmissionForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<SponsorshipForm>({
    resolver: zodResolver(sponsorshipSchema),
    defaultValues: {
      entity_name: '',
      entity_type: '',
      email: '',
      phone: '',
      name: '',
      message: ''
    }
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['sponsorship-form'],
    mutationFn: (payload: SponsorshipForm) => sponsorship(payload),
    onSuccess: () => setSuccess(true)
  });

  if (success)
    return (
      <SuccessScreen className="h-[500px]">
        <p className="text-2xl font-semibold">تم إرسال رسالتك بنجاح. سنتواصل معك قريباً!</p>
      </SuccessScreen>
    );

  return (
    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
        <FormInput label="اسم الجهة" {...register('entity_name')} className="" />
        <div>
          <Label>نوع الجهة</Label>
          <RadioGroup className="mt-3 w-full" onValueChange={(value) => setValue('entity_type', value)} dir="rtl">
            <div className="flex gap-12">
              <Label htmlFor="company" className="flex items-center gap-2">
                <RadioGroupItem id="company" value="company" className="h-4 w-4 shrink-0" />
                شركة
              </Label>
              <Label htmlFor="individual" className="flex items-center gap-2">
                <RadioGroupItem id="individual" value="individual" className="h-4 w-4 shrink-0" />
                فرد
              </Label>
              <Label htmlFor="organization" className="flex items-center gap-2">
                <RadioGroupItem id="organization" value="organization" className="h-4 w-4 shrink-0" />
                مؤسسة
              </Label>
            </div>
          </RadioGroup>
        </div>

        <FormInput label="اسم الممثل" {...register('name')} />
        <FormInput label="البريد الالكتروني" {...register('email')} />

        <FormInput label="رقم الهاتف" {...register('phone')} />

        <div className="col-span-2">
          <Label htmlFor="message">المجالات المطلوب تقديم الرعاية بها </Label>
          <Textarea id="message" className="h-28" {...register('message')} />
          <ErrorMessage error={errors.message?.message} />
        </div>
      </div>

      <div className="flex justify-center">
        <SubmitButton className="mt-8 w-32" isLoading={isPending}>
          إرسال
        </SubmitButton>
      </div>
    </form>
  );
}
