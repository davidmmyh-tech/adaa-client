import { forgetPassword } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

type Props = {
  onSuccess?: (success: boolean) => void;
  onError?: (error: AxiosError) => void;
};

export default function useForgetPasswordMutation({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: (email: string) => forgetPassword(email),
    onSuccess: (data) => onSuccess?.(data.data.success),
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
