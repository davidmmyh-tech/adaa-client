import DetailsCard from '@/components/ui/extend/DetailsCard';
import usePrefetchPodcastDetails from '@/hooks/prefetch/usePrefetchPodcastDetails';
import useGetPodcastsQuery from '@/hooks/queries/useGetPodcastsQuery';
import DataWrapper from '@/layouts/DataWrapper';

export default function MorePodcastsSection() {
  const { handlePrefetchPodcast } = usePrefetchPodcastDetails();
  const { podcasts, isError, isRefetching, refetch } = useGetPodcastsQuery({
    params: { page: 1, limit: 4 }
  });

  return (
    <section className="container space-y-12">
      <h3 className="text-xl font-semibold">استكشف المزيد من حلقات كرسي اداء</h3>
      <DataWrapper isError={isError} isEmpty={podcasts.length === 0} retry={refetch} isRefetching={isRefetching}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {podcasts.map((podcast) => (
            <DetailsCard
              key={podcast.id}
              title={podcast.title}
              description={podcast.short_description}
              date={podcast.published_at}
              image={podcast.image}
              handlePrefetch={() => handlePrefetchPodcast(podcast.id)}
              to={`/كرسي-اداء/${podcast.id}`}
            />
          ))}
        </div>
      </DataWrapper>
    </section>
  );
}
