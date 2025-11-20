import { getNews } from '@/services/podcasts';
import { useQuery } from '@tanstack/react-query';

export default function useGetNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => getNews({ page: 1, limit: 2 })
  });
}
