import DetailsCard from '@/components/ui/extend/DetailsCard';
import Logo from '@/components/ui/extend/Logo';
import usePrefetchPodcastDetails from '@/hooks/prefetch/usePrefetchPodcastDetails';
import useGetPodcastsQuery from '@/hooks/queries/useGetPodcastsQuery';
import DataWrapper from '@/layouts/DataWrapper';
import { ROUTES } from '@/routes';

export default function MorePodcastsSection() {
  const { handlePrefetchPodcast } = usePrefetchPodcastDetails();
  const { podcasts, isError, refetch, isFetching } = useGetPodcastsQuery({
    params: { page: 1, limit: 4 }
  });

  return (
    <section className="container space-y-12">
      <h3 className="text-xl font-semibold">استكشف المزيد من حلقات كرسي اداء</h3>
      <DataWrapper isError={isError} isEmpty={podcasts.length === 0} isLoading={isFetching} retry={refetch}>
        <div className="relative mt-8">
          {isFetching && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
              <Logo isLoading className="h-20 w-20" />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {podcasts.map((podcast) => (
              <DetailsCard
                key={podcast.id}
                title={podcast.title}
                description={podcast.short_description}
                date={podcast.published_at}
                image={podcast.image}
                handlePrefetch={() => handlePrefetchPodcast(podcast.id)}
                to={ROUTES.PODCAST.DETAILS(podcast.id)}
              />
            ))}
          </div>
        </div>
      </DataWrapper>
    </section>
  );
}
