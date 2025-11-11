import { submitShieldQuestions, type AxisAnswers, type ShieldSubmitResponse } from '@/services/shield';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  onSuccess?: (data: ShieldSubmitResponse) => void;
  onError?: (error: AxiosError) => void;
  axisIndex: number;
};

export default function useSubmitAnswers({ onSuccess, axisIndex, onError }: Props) {
  return useMutation({
    mutationKey: ['shield-submit', axisIndex],
    mutationFn: (answers: AxisAnswers) => submitShieldQuestions(answers),
    onSuccess: (data) => onSuccess?.(data.data),
    onError: (err) => {
      if (isAxiosError(err)) onError?.(err);
      toast.error('حدث خطأ أثناء إرسال الإجابات. يرجى المحاولة مرة أخرى.');
    }
  });
}
