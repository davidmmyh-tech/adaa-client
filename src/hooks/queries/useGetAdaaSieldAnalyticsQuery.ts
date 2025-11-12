import { getShieldAnalytics, type AnalyticsResponse } from '@/services/shield';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (data: AnalyticsResponse) => void;
  onError?: (error: any) => void;
};

export default function useGetAdaaSieldAnalytics({ onSuccess }: Props) {
  return useQuery({
    queryFn: () =>
      getShieldAnalytics().then((res) => {
        onSuccess?.(res.data);
        return res.data;
      }),
    queryKey: ['adaa-shield-analytics']
  });
}
