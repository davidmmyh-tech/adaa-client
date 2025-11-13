import LinkButton from '@/components/ui/extend/LinkButton';
import UserStateButton from '@/components/ui/extend/UserStateButton';

type Props = {
  title: string;
  subtitle: string;
  isHome?: boolean;
};

export default function CertificatesHeroSection({ title, subtitle, isHome }: Props) {
  return (
    <header
      className="main-hero-background flex h-screen max-h-[650px] items-center justify-center"
      style={{ backgroundPositionY: 'bottom' }}
    >
      <div className="container flex h-full flex-col items-center justify-center space-y-12 px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>

        <p className="text-lg md:text-xl">{subtitle}</p>

        {isHome && (
          <div className="space-x-4">
            <UserStateButton to="/شهادات-اداء/تقييم" variant="secondary" className="w-40">
              أبداء الآن
            </UserStateButton>
            <LinkButton to="#" variant="outline" className="w-40 border-2">
              تعرف علي الجوائز
            </LinkButton>
          </div>
        )}
      </div>
    </header>
  );
}
