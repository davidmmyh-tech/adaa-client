import ErrorMessage from '@/components/ui/extend/error-message';
import FormInput from '@/components/ui/extend/FormInput';
import SubmitButton from '@/components/ui/submit-button';
import useSubmitInquiryMutation from '@/hooks/mutations/useSubmitInquiryMutation';
import { useRef, useState, type FormEventHandler } from 'react';

export default function InquiryForm() {
  const inquiryContentRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutate, isPending } = useSubmitInquiryMutation({
    onError: () => setError('حدث خطأ أثناء إرسال استفسارك. يرجى المحاولة مرة أخرى.')
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const value = inquiryContentRef.current?.value;
    if (!value) return setError('يرجى إدخال استفسارك');
    mutate(value);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-sm">هل لديك أي استفسار ؟</p>
      <div className="flex space-x-2">
        <FormInput
          className="bg-primary-foreground/40 placeholder:text-primary focus-visible:ring-primary-foreground/80 focus-visible:border-primary-foreground h-8 rounded-full font-medium"
          placeholder="سؤالك ..."
          ref={inquiryContentRef}
          onChange={() => setError(null)}
        />
        <SubmitButton
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-8 rounded-full px-8"
          isLoading={isPending}
        >
          أرسل لنا
        </SubmitButton>
      </div>
      <ErrorMessage error={error} className="-mt-8" />
    </form>
  );
}
