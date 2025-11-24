import { getSessionEmail } from '@/lib/storage';
import { resetPassword, type ResetPasswordPayload } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';

type Props = {
  onSuccess?: (success: boolean) => void;
  onError?: (error: AxiosError) => void;
};

export default function useResetPasswordMutation({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword({ ...payload, email: getSessionEmail() }),
    onSuccess: (data) => onSuccess?.(data.data.success),
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
