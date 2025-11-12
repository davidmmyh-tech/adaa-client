import { inquiry } from '@/services/contact';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

type Props = {
  onSuccess?: (success: boolean) => void;
  onError?: (error: AxiosError) => void;
};

export default function useSubmitInquiryMutation({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: (content: string) => inquiry(content),
    onSuccess: (data) => onSuccess?.(data.data.success),
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
