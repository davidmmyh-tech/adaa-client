import { getPodcasts, type Podcast } from '@/services/podcasts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  onSuccess?: (data: Podcast[]) => void;
  params?: {
    query?: string;
    page?: number;
    limit?: number;
  };
};

export default function useGetPodcastsQuery({ params = {}, onSuccess }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  const query = useInfiniteQuery({
    queryKey: ['podcasts', params.query, params.limit],
    queryFn: ({ pageParam }) =>
      getPodcasts({ page: pageParam, query: params.query, limit: params.limit }).then((res) => {
        setIsMounted(true);
        onSuccess?.(res.data.podcasts);
        return res;
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _all, lastPageParam) => {
      if (lastPage?.data.meta.current_page < lastPage.data.meta.last_page) return lastPageParam + 1;
      else return undefined;
    },
    placeholderData: (previousData) => previousData
  });

  const podcasts = query.data?.pages.flatMap((p) => p.data.podcasts) || [];
  const isEmpty = query.data?.pages[0].data.podcasts.length === 0;

  return { ...query, podcasts, isEmpty, isMounted };
}
