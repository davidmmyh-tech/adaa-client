import { Button } from '@/components/ui/button';
import Img from '@/components/ui/extend/Img';
import { BackwardIcon, ForwardIcon } from '@/components/ui/icons';
import useAudioVisualizer from '@/hooks/useAudioVisualizer';
import useWaveSurfer from '@/hooks/useWaveSurfer';
import { Pause, Play } from 'lucide-react';

type Props = {
  audioUrl: string;
  title: string;
  image: string;
  shortDescription: string;
};

export default function PodcastDetailsHeader({ audioUrl, title, image, shortDescription }: Props) {
  const { waveformRef, isPlaying, togglePlay, skipForward, skipBackward, audioElement, isError } = useWaveSurfer({
    src: audioUrl
  });

  const { visualizerRef } = useAudioVisualizer({ isPlaying, audioElement });

  return (
    <header className="container space-y-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p>{shortDescription}</p>
      <div className="relative space-y-4">
        {isError && (
          <div className="bg-background/80 absolute inset-0 z-20 mb-0 flex items-center justify-center">
            <p className="text-red-500">حدث خطأ في تحميل الصوت.</p>
          </div>
        )}
        {/* Animated frequency bars */}
        <canvas ref={visualizerRef} className="w-full" style={{ height: '80px' }} />

        {/* Static progress */}
        <div ref={waveformRef} className="h-2 w-full"></div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          <ForwardIcon size={30} onClick={skipForward} className="cursor-pointer transition-all hover:rotate-12" />
          <Button variant="link" onClick={togglePlay} className="border-primary h-12 w-12 rounded-full border-2 p-4">
            {isPlaying ? <Play className="fill-primary stroke-0" /> : <Pause className="fill-primary stroke-0" />}
          </Button>
          <BackwardIcon size={30} onClick={skipBackward} className="cursor-pointer transition-all hover:-rotate-12" />
        </div>
      </div>

      <Img src={image} alt={'podcast hero'} className="mx-auto aspect-video w-full max-w-3xl rounded-xl object-cover" />
    </header>
  );
}
