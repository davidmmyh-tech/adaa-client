import { useMutation } from '@tanstack/react-query';
import { submitSubscription } from '@/services/subscription';
import { toast } from 'react-toastify';
import { AxiosError, isAxiosError } from 'axios';
import type { SubscribeForm } from '@/schemas/validation';
import { useUserState } from '@/context/UserProvider';

type UseSubscriptionMutationOptions = {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
};

export default function useSubscriptionMutation({ onSuccess, onError }: UseSubscriptionMutationOptions = {}) {
  const { setFlags } = useUserState();
  return useMutation({
    mutationFn: (payload: SubscribeForm) => submitSubscription(payload),
    onSuccess: () => {
      onSuccess?.();
      setFlags((flags) => ({ ...flags, subscription_status: 'pending' }));
    },
    onError: (error) => {
      if (isAxiosError(error)) return onError?.(error);
      toast.error('حدث خطأ أثناء إرسال طلب الاشتراك');
    }
  });
}
