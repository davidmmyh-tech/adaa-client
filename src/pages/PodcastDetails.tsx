import DataWrapper from '@/layouts/DataWrapper';
import InnerHTML from '@/components/ui/extend/InnerHTML';
import { useParams } from 'react-router';
import MorePodcastsSection from '@/components/sections/podcast/MorePodcasts';
import PodcastDetailsHeader from '@/components/sections/podcast/PodcastDetailsHeader';
import PodcastVideoSection from '@/components/sections/podcast/PodcastVideo';
import useGetPodcastDetailsQuery from '@/hooks/queries/useGetPodcastDetailsQuery';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function PodcastDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: podcast, isLoading } = useGetPodcastDetailsQuery({ id: Number(id) });

  useDocumentHead({
    title: podcast?.title ? `${podcast.title} - كرسي أداء` : 'كرسي أداء',
    description: podcast?.short_description || 'استمع إلى حلقات كرسي أداء البودكاست',
    ogTitle: podcast?.title || 'كرسي أداء',
    ogDescription: podcast?.short_description || 'بودكاست التميز المؤسسي',
    ogImage: podcast?.image
  });

  return (
    <DataWrapper isPending={isLoading}>
      <div className="mt-32 space-y-12">
        <PodcastDetailsHeader
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
