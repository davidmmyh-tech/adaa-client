import LinkButton from '@/components/ui/extend/LinkButton';
import { useUserState } from '@/context/UserProvider';

export default function ToolsHeroSection() {
  const { user, flags } = useUserState();

  return (
    <header className="bg-primary relative flex h-screen max-h-[650px] items-center justify-center">
      <div className="tools-hero-background absolute inset-0 z-0 opacity-60"></div>
      <div className="z-10 container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
        <h1 className="sr-only">ادوات اداء</h1>
        <p className="heading-gradient max-w-4xl rounded-lg p-8 text-lg md:text-xl" style={{ lineHeight: 1.8 }}>
          “في صفحة أدوات أداء، نقدم لك مجموعة من الأدوات المتقدمة التي تساعدك على قياس وتحليل الأداء المؤسسي بشكل فعّال.
          سواء كنت تبحث عن نماذج إكسل لقياس الأداء، تصاميم لوحات داش بورد لعرض البيانات، أو نماذج Power BI لتحليل
          المعلومات، ستجد هنا كل ما تحتاجه لتحسين الأداء في مؤسستك”
          <span className="block">اشترك الآن في أداء المميز لتصل لجميع أدوات أداء</span>
        </p>

        <div>
          {user ? (
            !flags.has_active_subscription && (
              <LinkButton to={'/اشتراك-اداء-المميز'} variant="secondary" className="w-40">
                اشترك الآن
              </LinkButton>
            )
          ) : (
            <LinkButton to={'/تسجيل-الدخول'} variant="secondary" className="w-40">
              تسجيل الدخول
            </LinkButton>
          )}
        </div>
      </div>
    </header>
  );
}
