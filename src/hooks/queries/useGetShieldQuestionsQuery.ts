import { getShieldQuestions, type ShieldQuestionsResponse } from '@/services/shield';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: ShieldQuestionsResponse) => void;
};

export default function useGetShieldQuestions({ onSuccess }: Props) {
  return useQuery({
    queryKey: ['shieldQuestions'],
    queryFn: () =>
      getShieldQuestions().then((res) => {
        onSuccess?.(res.data);
        return res.data;
      })
  });
}
