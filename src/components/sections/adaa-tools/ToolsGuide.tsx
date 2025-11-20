import { heroImage } from '@/assets/images';
import Video from '@/components/ui/extend/Video';

export default function ToolsGuideSection() {
  return (
    <section className="container space-y-12">
      <div className="space-y-4">
        <h5 className="text-2xl font-semibold">إرشادات استخدام الأدوات</h5>
        <p>
          يقدم هذا القسم توجيهات واضحة حول كيفية استخدام الأدوات المتوفرة بشكل فعال، ويشمل نصائح خطوة بخطوة لضمان
          الاستخدام الأمثل.
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-lg font-semibold">يمكنك مشاهدة فيديو توجيهي قصير يشرح كيفية استخدام الأدوات بشكل فعال</p>
        <ul className="list-disc ps-24">
          <li>
            <p>
              <span className="text-lg font-semibold">إرشادات لتحميل الأدوات:</span> كيفية تحميل النماذج، التصاميم،
              وملفات Power BI.
            </p>
          </li>
          <li>
            <p>
              <span className="text-lg font-semibold">رشادات لاستخدام الأدوات:</span>شرحكيفية تعديل النماذج حسب
              احتياجاتك الخاصة، وكيفية قراءة وتحليل النتائج.
            </p>
          </li>
          <li>
            <p>
              <span className="text-lg font-semibold">نصائح للتخصيص:</span> كيفية تخصيص الأدوات واللوحات لتتناسب مع
              احتياجات المنظمة.
            </p>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <Video placeholderImage={heroImage} className="max-w-3xl" />
      </div>
    </section>
  );
}
