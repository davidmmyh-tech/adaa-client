import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput from '@/components/ui/extend/FormInput';
import { Label } from '@/components/ui/label';
import SubmitButton from '@/components/ui/submit-button';
import { Textarea } from '@/components/ui/textarea';
import { useUserState } from '@/context/UserProvider';
import type { ContactForm } from '@/schemas/validation';
import { contactUs } from '@/services/contact';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { contactSchema } from '@/schemas/validation';
import { useState } from 'react';
import SuccessScreen from '@/components/ui/extend/SuccessScreen';

export function ContactusForm() {
  const { user } = useUserState();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      subject: '',
      message: ''
    }
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['contact-us-form'],
    mutationFn: (payload: ContactForm) => contactUs(payload),
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
        <FormInput label="الاسم الكامل" {...register('name')} />
        <FormInput label="البريد الالكتروني" {...register('email')} />
        <FormInput label="رقم الهاتف" {...register('phone')} />
        <FormInput label="موضوع الرسالة" {...register('subject')} />
      </div>

      <Label htmlFor="message">نص الرسالة</Label>
      <Textarea id="message" className="h-28" {...register('message')} />
      <ErrorMessage error={errors.message?.message} />

      <div className="flex justify-center">
        <SubmitButton className="mt-8 w-32" isLoading={isPending}>
          إرسال
        </SubmitButton>
      </div>
    </form>
  );
}
