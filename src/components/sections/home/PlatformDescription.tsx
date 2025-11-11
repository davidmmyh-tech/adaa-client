import { descriptionImage } from '@/assets/images';

export default function PlatformDescriptionSection() {
  return (
    <section className="container pb-12">
      <div className="relative">
        <div className="bg-primary rounded-2xl md:me-32">
          <div className="illustration-background text-primary-foreground space-y-4 p-4 md:p-8 md:pe-56">
            <img
              src={descriptionImage}
              alt="وصف منصة أداء"
              className="max-h-80 w-full rounded-lg object-cover md:hidden"
            />
            <h2 className="text-2xl font-semibold">ما هي منصة أداء للمنظمات الغير ربحية</h2>
            <p>
              أداء هي منصة متخصصة لقياس وتحسين أداء المنظمات غير الربحية، حيث تقدم حلولاً مبتكرة لتقييم الأداء على
              مستويين رئيسيين: الأداء الاستراتيجي والأداء التشغيلي. تهدف المنصة إلى تمكين المنظمات من تحقيق مستويات
              عالية من الكفاءة والتميز من خلال تقديم تقارير دقيقة ومهنية تعتمد على معايير احترافية.
            </p>
            <p>
              تُسهم منصة أداء في تعزيز الشفافية وتوفير أدوات لتحليل البيانات، مما يتيح للمنظمات تحديد نقاط القوة وفرص
              التحسين بوضوح. كما تُكرِّم الجمعيات المتميزة التي تحقق معايير الأداء المثلى.
            </p>
            <p className="text-xl font-semibold">أداء,</p>
            <p className="ms-12 text-xl font-semibold">بوصلتك لتحقيق النجاح المؤسسي </p>
          </div>
        </div>
        <img
          src={descriptionImage}
          alt="وصف منصة أداء"
          className="absolute end-0 top-12 hidden h-28 w-xs rounded-2xl object-cover shadow-lg md:block md:h-full"
        />
      </div>
    </section>
  );
}
