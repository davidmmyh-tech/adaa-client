import { useMutation } from '@tanstack/react-query';
import { submitSubscription } from '@/services/subscription';
import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';
import type { SubscribeForm } from '@/schemas/validation';

type UseSubscriptionMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
};

export default function useSubscriptionMutation({ onSuccess, onError }: UseSubscriptionMutationOptions = {}) {
  return useMutation({
    mutationFn: (payload: SubscribeForm) => submitSubscription(payload),
    onSuccess: () => onSuccess?.(),
    onError: (error) => {
      if (isAxiosError(error)) return onError?.(error);
      toast.error('حدث خطأ أثناء إرسال طلب الاشتراك');
    }
  });
}
