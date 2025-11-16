import DataWrapper from '@/layouts/DataWrapper';
import InnerHTML from '@/components/ui/extend/InnerHTML';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getPodcastDetails } from '@/services/podcasts';
import MorePodcastsSection from '@/components/sections/podcast/MorePodcasts';
import PodcastHeader from '@/components/sections/podcast/PodcastHeader';
import PodcastVideoSection from '@/components/sections/podcast/Video';

export default function PodcastDetailsPage() {
  const params = useParams<{ id: string }>();

  const { data: podcast, isLoading } = useQuery({
    queryKey: ['podcastDetails', params.id],
    queryFn: () => getPodcastDetails(params.id!).then((res) => res.data.podcast),
    throwOnError: true
  });

  return (
    <DataWrapper isPending={isLoading}>
      <div className="mt-32 space-y-12">
        <PodcastHeader
          audioUrl={podcast?.audio_url || ''}
          title={podcast?.title || ''}
          image={podcast?.image || ''}
          shortDescription={podcast?.short_description || ''}
        />

        <article className="container">
          <InnerHTML content={podcast?.description} />
        </article>

        <PodcastVideoSection thumbnail={podcast?.image || ''} videoUrl={podcast?.video_url || ''} />

        <MorePodcastsSection />
      </div>
    </DataWrapper>
  );
}
