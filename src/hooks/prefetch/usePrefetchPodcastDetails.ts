import { PODCAST_DETAILS_QUERY_KEY } from '@/constants/query-keys';
import usePrefetch from './usePrefetch';
import type { Id } from '@/schemas/types';
import { getPodcastDetails } from '@/services/podcasts';

export default function usePrefetchPodcastDetails() {
  const handlePrefetchPodcast = usePrefetch({
    getKey: (id: Id) => [PODCAST_DETAILS_QUERY_KEY, `${id}`],
    queryFn: (id: Id) => getPodcastDetails(id)
  });

  return { handlePrefetchPodcast };
}
