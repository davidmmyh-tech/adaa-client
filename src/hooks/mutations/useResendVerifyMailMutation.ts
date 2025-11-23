import { getSessionEmail } from '@/lib/storage';
import { resendEmailVerification } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';

type Props = {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
};

export default function useResendVerifyMailMutation({ onError, onSuccess }: Props) {
  return useMutation({
    mutationFn: () => resendEmailVerification({ email: getSessionEmail() }),
    onSuccess: () => onSuccess?.(),
    onError: (err) => {
      if (isAxiosError(err)) return onError?.(err);
    }
  });
}
