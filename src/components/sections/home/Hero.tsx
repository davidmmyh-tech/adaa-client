import LinkButton from '@/components/ui/extend/LinkButton';
import { useUserState } from '@/context/UserProvider';

export default function Hero() {
  const { user } = useUserState();

  return (
    <header className="main-hero-background flex h-screen max-h-[650px] items-center justify-center">
      <div className="container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">منصة أداء للمنظمات غير الربحية</h1>
        <p className="text-lg md:text-xl">نحو التميز المؤسسي للمنظمات غير الربحية</p>
        <p className="mb-8 text-lg md:text-xl"> معايير دقيقة ، أداء متميز ، أثر مستدام.</p>
        {user ? (
          <p className="text-primary text-xg font-semibold md:text-2xl">أحصل على شهادة أداء الان</p>
        ) : (
          <LinkButton to="/تسجيل-دخول" variant="secondary">
            تسجيل الدخول
          </LinkButton>
        )}
      </div>
    </header>
  );
}
