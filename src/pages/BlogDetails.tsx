import Img from '@/components/ui/extend/Img';
import InnerHTML from '@/components/ui/extend/InnerHTML';
import { getBlogDetails } from '@/services/blogs';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import DataWrapper from '../layouts/DataWrapper';
import { BLOG_DETAILS_QUERY_KEY } from '@/constants/query-keys';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function BlogDetailsPage() {
  const { id = '' } = useParams<{ id: string }>();
  const { data, isPending, refetch, isRefetching } = useQuery({
    queryKey: [BLOG_DETAILS_QUERY_KEY, id],
    queryFn: () => getBlogDetails(id),
    throwOnError: true
  });
  const blog = data?.data.blog;

  useDocumentHead({
    title: blog?.title ? `${blog.title} - مدونة أداء` : 'مدونة أداء',
    description: blog?.content?.substring(0, 160).replace(/<[^>]*>/g, '') || 'اقرأ المزيد في مدونة أداء',
    ogTitle: blog?.title || 'مدونة أداء',
    ogDescription: blog?.content?.substring(0, 160).replace(/<[^>]*>/g, '') || 'مقالات التميز المؤسسي',
    ogImage: blog?.image
  });

  return (
    <DataWrapper isPending={isPending} retry={refetch} isRefetching={isRefetching}>
      <header className="container mt-28 space-y-12">
        <Img src={blog?.image} alt={blog?.title} className="h-80 w-full rounded-2xl object-cover" />
        <h1 className="text-2xl font-semibold">{blog?.title}</h1>
      </header>

      <article className="container my-12 space-y-6">
        <div className="bg-accent/10 border-accent/30 rounded-xl border p-8">
          <InnerHTML content={blog?.content || ''} />
        </div>
      </article>
    </DataWrapper>
  );
}
