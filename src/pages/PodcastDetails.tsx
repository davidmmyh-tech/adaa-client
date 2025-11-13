import DetailsCard from '@/components/ui/extend/DetailsCard';
import Img from '@/components/ui/extend/Img';
import useGetPodcastsQuery from '@/hooks/queries/useGetPodcastsQuery';
import useWaveSurfer from '@/hooks/useWaveSurfer';
import useAudioVisualizer from '@/hooks/useAudioVisualizer';
import DataWrapper from '@/layouts/DataWrapper';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackwardIcon, ForwardIcon } from '@/components/ui/icons';
import LinkButton from '@/components/ui/extend/LinkButton';
import InnerHTML from '@/components/ui/extend/InnerHTML';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getPodcastDetails } from '@/services/podcasts';
import Video from '@/components/ui/extend/Video';

export default function PodcastDetailsPage() {
  const params = useParams<{ id: string }>();
  const { podcasts, isError, isRefetching, refetch } = useGetPodcastsQuery({
    params: { page: 1, limit: 4 }
  });

  const { data: podcast } = useQuery({
    queryKey: ['podcastDetails', params.id],
    queryFn: () => getPodcastDetails(params.id!).then((res) => res.data.podcast),
    throwOnError: true
  });

  //Audio player and visualizer hooks
  const {
    waveformRef,
    isPlaying,
    togglePlay,
    skipForward,
    skipBackward,
    audioElement,
    isError: audioIsError
  } = useWaveSurfer({
    src: podcast?.audio_url
  });
  const { canvasRef } = useAudioVisualizer({ isPlaying, audioElement });

  return (
    <div className="mt-32 space-y-12">
      <header className="container space-y-8">
        <h1 className="text-2xl font-semibold">{podcast?.title}</h1>
        <p>{podcast?.short_description}</p>
        <div className="relative space-y-4">
          {audioIsError && (
            <div className="bg-background/80 absolute inset-0 z-20 mb-0 flex items-center justify-center">
              <p className="text-red-500">حدث خطأ في تحميل الصوت.</p>
            </div>
          )}
          {/* Animated frequency bars */}
          <canvas ref={canvasRef} className="w-full" style={{ height: '80px' }} />

          {/* Static progress */}
          <div ref={waveformRef} className="w-full"></div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8">
            <ForwardIcon size={30} onClick={skipForward} className="cursor-pointer transition-all hover:rotate-12" />
            <Button variant="link" onClick={togglePlay} className="border-primary h-12 w-12 rounded-full border-2 p-4">
              {isPlaying ? <Play className="fill-primary stroke-0" /> : <Pause className="fill-primary stroke-0" />}
            </Button>
            <BackwardIcon size={30} onClick={skipBackward} className="cursor-pointer transition-all hover:-rotate-12" />
          </div>
        </div>

        <Img src={podcast?.image} alt={'podcast hero'} className="max-h-96 w-full rounded-xl object-cover" />
      </header>

      <article className="container">
        <InnerHTML content={podcast?.description} />
      </article>

      <section className="container space-y-8">
        <h2 className="mb-6 text-xl font-semibold">تابعنا علي قناة حقق</h2>
        <div className="flex justify-center">
          <Video src={podcast?.video_url || ''} placeholderImage={podcast?.image || ''} />
        </div>
        <div className="flex justify-center">
          <LinkButton to="haqqeq.com" variant="secondary">
            تابعنا علي قناة حقق
          </LinkButton>
        </div>
      </section>

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
                to="#"
              />
            ))}
          </div>
        </DataWrapper>
      </section>
    </div>
  );
}
