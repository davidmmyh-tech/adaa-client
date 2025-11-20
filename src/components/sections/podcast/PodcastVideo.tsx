import LinkButton from '@/components/ui/extend/LinkButton';
import Video from '@/components/ui/extend/Video';

type Props = {
  thumbnail: string;
  videoUrl?: string;
};

export default function PodcastVideoSection({ thumbnail, videoUrl }: Props) {
  return (
    <section className="container space-y-8">
      <h2 className="mb-6 text-xl font-semibold">تابعنا علي قناة حقق</h2>
      <div className="flex justify-center">
        <Video src={videoUrl} placeholderImage={thumbnail} />
      </div>
      <div className="flex justify-center">
        <LinkButton to="haqqeq.com" variant="secondary">
          تابعنا علي قناة حقق
        </LinkButton>
      </div>
    </section>
  );
}
