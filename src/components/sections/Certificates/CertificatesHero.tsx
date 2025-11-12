import LinkButton from '@/components/ui/extend/LinkButton';
import { useUserState } from '@/context/UserProvider';

export default function CertificatesHeroSection() {
  const { user } = useUserState();

  return (
    <header
      className="main-hero-background flex h-screen max-h-[650px] items-center justify-center"
      style={{ backgroundPositionY: 'bottom' }}
    >
      <div className="container flex h-full flex-col items-center justify-center space-y-12 px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl"> احصل على شهادة الأداء المؤسسي لعام 2025</h1>

        <p className="text-lg md:text-xl">
          منصة إلكترونية لقياس وتقييم أداء الجمعيات في ثلاثة مسارات مستقلة، مع إصدار شهادة أداء رقمية معتمدة لكل مسار
          يتم تقييمه.
        </p>

        <div className="space-x-4">
          {user ? (
            <LinkButton to="/تسجيل-دخول" variant="secondary" className="w-40">
              أبداء الان
            </LinkButton>
          ) : (
            <LinkButton to="/تسجيل-دخول" variant="secondary" className="w-40">
              سجّل الآن
            </LinkButton>
          )}
          <LinkButton to="#" variant="outline" className="w-40 border-2">
            تعرف علي الجوائز
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
