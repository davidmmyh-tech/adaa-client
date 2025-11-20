import type { Id } from '@/schemas/types';
import { getPodcastDetails } from '@/services/podcasts';
import { useQuery } from '@tanstack/react-query';

type Props = {
  id: Id;
};

export default function useGetPodcastDetailsQuery({ id }: Props) {
  return useQuery({
    queryKey: ['podcastDetails', id],
    queryFn: () => getPodcastDetails(id).then((res) => res.data.podcast),
    throwOnError: true
  });
}
