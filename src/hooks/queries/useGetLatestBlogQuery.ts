import { getBlogs } from '@/services/blogs';
import { useQuery } from '@tanstack/react-query';

export default function useGetLatestBlogQuery() {
  return useQuery({
    queryKey: ['most-recent-blog'],
    queryFn: () => getBlogs({ page: 1, limit: 1 }).then((res) => res.data.blogs[0])
  });
}
