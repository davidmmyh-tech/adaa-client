import Img from '@/components/ui/extend/Img';
import usePrefetchBlogDetails from '@/hooks/prefetch/usePrefetchBlogDetails';
import useGetLatestBlogQuery from '@/hooks/queries/useGetLatestBlogQuery';
import DataWrapper from '@/layouts/DataWrapper';
import { ROUTES } from '@/routes';
import { Link } from 'react-router';

export default function LatestBlogSection() {
  const { handlePrefetchBlog } = usePrefetchBlogDetails();
  const { data, isLoading, refetch, isRefetching } = useGetLatestBlogQuery();

  return (
    <section className="container my-12">
      <h2 className="mb-8 text-2xl font-bold">المقالات الجديدة</h2>

      <DataWrapper isPending={isLoading} isEmpty={!data} retry={refetch} isRefetching={isRefetching}>
        <div
          className="flex flex-col items-start gap-8 lg:flex-row"
          onMouseEnter={() => data?.id && handlePrefetchBlog(data.id)}
        >
          <Link to={ROUTES.BLOG.DETAILS(data?.id || '')} className="w-full lg:w-lg">
            <Img src={data?.image} alt={data?.title} className="aspect-video w-full rounded-lg object-cover lg:w-lg" />
          </Link>
          <div>
            <h3 className="mb-4 text-3xl font-bold">{data?.title}</h3>
            <p className="text-lg text-gray-700">{data?.description}</p>
          </div>
        </div>
      </DataWrapper>
    </section>
  );
}
