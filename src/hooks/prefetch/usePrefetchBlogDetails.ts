import { BLOG_DETAILS_QUERY_KEY } from '@/constants/query-keys';
import usePrefetch from './usePrefetch';
import { getBlogDetails } from '@/services/blogs';
import type { Id } from '@/schemas/types';

export default function usePrefetchBlogDetails() {
  const handlePrefetchBlog = usePrefetch({
    getKey: (id: Id) => [BLOG_DETAILS_QUERY_KEY, `${id}`],
    queryFn: (id: Id) => getBlogDetails(id)
  });

  return { handlePrefetchBlog };
}
