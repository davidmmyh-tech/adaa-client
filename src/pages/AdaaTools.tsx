import { heroImage } from '@/assets/images';
import Img from '@/components/ui/extend/Img';
import LinkButton from '@/components/ui/extend/LinkButton';
import HSplit from '@/components/ui/h-split';
import SubmitButton from '@/components/ui/submit-button';
import { cn } from '@/lib/utils';
import { Download, Eye } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

export default function AdaaToolsPage() {
  return (
    <div>
      <header className="bg-primary relative flex h-screen max-h-[650px] items-center justify-center">
        <div className="tools-hero-background absolute inset-0 z-0 opacity-60"></div>
        <div className="z-10 container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
          <h1 className="sr-only">ادوات اداء</h1>
          <p className="heading-gradient max-w-4xl rounded-lg p-8 text-lg md:text-xl" style={{ lineHeight: 1.8 }}>
            “في صفحة أدوات أداء، نقدم لك مجموعة من الأدوات المتقدمة التي تساعدك على قياس وتحليل الأداء المؤسسي بشكل
            فعّال. سواء كنت تبحث عن نماذج إكسل لقياس الأداء، تصاميم لوحات داش بورد لعرض البيانات، أو نماذج Power BI
            لتحليل المعلومات، ستجد هنا كل ما تحتاجه لتحسين الأداء في مؤسستك”
            <span className="block">اشترك الآن في أداء المميز لتصل لجميع أدوات أداء</span>
          </p>
          <div>
            <LinkButton to={'/اشتراك'} variant="secondary" className="w-40">
              اشترك الآن
            </LinkButton>
          </div>
        </div>
      </header>

      <section className="space-y-8 py-8">
        <div className="container space-y-4">
          <h2 className="text-2xl font-semibold">نماذج إكسل لقياس الأداء</h2>
          <p>
            تقدم هذه المجموعة من نماذج إكسل أدوات متقدمة لقياس الأداء المؤسسي. سواء كنت تبحث عن نموذج لتحديد مؤشرات
            الأداء الرئيسية (KPIs)، متابعة الميزانية، أو تحليل العوائد المالية، ستجد النموذج المناسب لاحتياجاتك.
          </p>
        </div>

        <div className="bg-primary py-14">
          <div className="text-primary-foreground container">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <ExcelCard key={index} index={index} />
              ))}
          </div>
          <div></div>
        </div>
        <div className="flex justify-center">
          <SubmitButton>
            <div className="flex items-center gap-2">
              عرض المزيد من النماذج
              <Eye />
            </div>
          </SubmitButton>
        </div>
      </section>

      <section className="bg-accent pt-8 pb-24">
        <div className="container space-y-12">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">تصاميم لوحات داش بورد لقياس الأداء</h1>
            <p>
              في هذا القسم، نقدم مجموعة من تصاميم لوحات الداش بورد التي تستخدم لعرض وتحليل مؤشرات الأداء بشكل مرئي. يمكن
              تخصيص هذه التصاميم لتناسب احتياجات مؤسستك، من خلال الرسومات البيانية والمخططات التفاعلية.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 gap-y-18 sm:grid-cols-2 lg:grid-cols-3">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <DashboardCard key={index} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardCard() {
  return (
    <div>
      <div className="space-y-6 rounded-3xl bg-white p-4 pb-12 shadow-md">
        <Img src={heroImage} alt="dashboard design" className="aspect-square w-full rounded-3xl object-cover" />
        <div className="space-y-4">
          <p className="font-semibold">لوحة داش بورد الأداء المؤسسي:</p>
          <p className="text-sm">لتقديم نظرة شاملة على أداء المنظمة باستخدام الرسوم البيانية والتقارير التفاعلية.</p>
        </div>
      </div>

      <div className="-mt-6 flex w-full justify-center">
        <SubmitButton className="border-secondary -mb-24 h-14">
          <div className="flex items-center gap-2">
            تحميل التصميم <Download />
          </div>
        </SubmitButton>
      </div>
    </div>
  );
}

function ExcelCard({ index }: { index: number }) {
  return (
    <Fragment>
      <div className={cn('flex flex-col gap-4 text-start lg:flex-row', index % 2 === 1 ? 'lg:flex-row-reverse' : '')}>
        <div className="flex w-full shrink-0 justify-center lg:w-auto">
          <div className="relative w-fit">
            <img src={heroImage} alt="s" className="h-60 w-96 rounded-lg object-cover" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">
            {index + 1}. نموذج قياس الأداء المؤسسي (Organizational Performance Measurement){' '}
          </p>
          <p className="font-light">
            هذا النموذج يساعد المنظمات غير الربحية على قياس الأداء العام باستخدام مؤشرات الأداء الرئيسية (KPIs). يشمل
            تقييم الأداء في مجالات متعددة مثل الأداء المالي، الأداء العملياتي، والنمو المؤسسي. يتيح هذا النموذج تحليل
            الأداء عبر الزمن ويساهم في تحديد نقاط القوة والضعف.
          </p>
          <div className={`flex h-full items-end ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
            <SubmitButton variant="secondary" className="border-secondary w-full sm:w-48">
              <div className="flex items-center gap-2">
                تحميل النموذج <Download />
              </div>
            </SubmitButton>
          </div>
        </div>
      </div>
      {index < 3 && <HSplit className="mt-6 mb-12 opacity-40" />}
    </Fragment>
  );
}
