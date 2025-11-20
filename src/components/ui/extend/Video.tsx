import { useState, type VideoHTMLAttributes } from 'react';
import { VideoIcon } from '../icons';
import Img from './Img';
import { cn } from '@/lib/utils';

type Props = {
  placeholderImage: string;
} & VideoHTMLAttributes<HTMLVideoElement>;

export default function Video({ src, placeholderImage, className }: Props) {
  const [startVideo, setStartVideo] = useState(false);

  return startVideo ? (
    <video
      src={src}
      controls
      autoPlay
      className={cn('aspect-video w-full max-w-3xl rounded-xl object-cover', className)}
    />
  ) : (
    <div
      className={cn('relative aspect-video w-full max-w-3xl cursor-pointer', className)}
      onClick={() => setStartVideo(true)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <VideoIcon size={60} />
      </div>

      <Img src={placeholderImage} alt="video placeholder" className="h-full w-full rounded-xl object-cover" />
    </div>
  );
}
