import { podcastCoverImage } from '@/assets/images';
import DetailsCard from '@/components/ui/extend/DetailsCard';
import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/submit-button';
import useGetPodcastsQuery from '@/hooks/queries/useGetPodcastsQuery';
import useDebounce from '@/hooks/useDebounce';
import DataWrapper from '@/layouts/DataWrapper';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router';

export default function AdaaPodcastsSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const {
    podcasts,
    isPending,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isMounted,
    hasNextPage
  } = useGetPodcastsQuery({
    params: { query, page: 1, limit: 6 }
  });

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams, { preventScrollReset: true });
  };

  const handleQueryChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParam('query', e.target.value);
  }, 400);

  return (
    <section className="container mt-12 space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h3 className="text-2xl font-semibold">كرسي أداء</h3>
        <div className="relative flex grow items-center justify-end gap-6">
          <SearchIcon className="absolute end-3 top-3.5" size={18} />
          {isFetching && <Loader2 className="spinner text-muted/60" />}
          <Input className="bg-primary/6 w-full pe-10 md:max-w-xl" onChange={handleQueryChange} />
        </div>
      </div>

      <div className="flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={podcastCoverImage}
          className="block aspect-square h-52 w-52 shrink-0 rounded-xl object-cover"
          alt="كرسي أداء"
        />
        <div className="w-full space-y-4">
          <h4 className="block text-2xl font-semibold">ماهو كرسي اداء </h4>
          <p>
            “كرسي أداء” هو برنامج يهدف إلى تعزيز الأداء الاستراتيجي والتشغيلي للمنظمات غير الربحية في السعودية. من خلال
            استضافة الجمعيات، يناقش البرنامج تحسين الأداء في مجالات الإعلام، المالية، والعمليات التشغيلية، ويقدم منصة
            لتبادل الخبرات والاستراتيجيات الفعّالة لتحقيق الاستدامة والكفاءة.
          </p>
        </div>
      </div>

      <DataWrapper
        isPending={isPending && !isMounted}
        isError={isError}
        isRefetching={isRefetching}
        isEmpty={!podcasts.length && !isFetching}
        retry={refetch}
      >
        <div className="grid grid-cols-2 gap-8">
          {podcasts.map((podcast) => (
            <DetailsCard
              key={podcast.id}
              date={podcast.published_at}
              title={podcast.title}
              description={podcast.short_description}
              image={podcast.image}
              to={`/كرسي-اداء/${podcast.id}`}
            />
          ))}
        </div>

        {hasNextPage && (
          <div className="my-14 flex justify-center">
            <SubmitButton
              variant="secondary"
              className="w-40 font-semibold"
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
            >
              عرض المزيد
            </SubmitButton>
          </div>
        )}
      </DataWrapper>
    </section>
  );
}
