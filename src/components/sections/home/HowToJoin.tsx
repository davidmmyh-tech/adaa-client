import StepCard from '@/components/ui/extend/StepCard';

const steps = [
  {
    title: 'تعبئة النموذج الإلكتروني:',
    description:
      'يتم تقديم الطلب بشكل إلكتروني من خلال الموقع الإلكتروني للمنصة هنا وتعبئة نموذج طلب قياس أداء المنظمة حسب المسار.'
  },
  {
    title: 'يقوم مستشاري الشركة بمراجعة وتدقيق الطلب',
    description: 'تتم مراجعة الطلب والتأكد من استكمال واستيفاء النموذج للمتطلبات.'
  },
  {
    title: 'استعراض ملف المنظمة من قبل اللجنة',
    description: 'في حال استيفاء كافة المعايير الرئيسية سيتم عرض الملف أمام اللجنة الاستشارية لاستخراج النتيجة.'
  },
  {
    title: 'نبارك لكم حصولكم على شهادة أداء',
    description:
      'حال اجتياز مقدم الطلب مرحلة العرض على اللجنة وتحديد المرتبة ؛ سيتم إبلاغ المنظمة بالنتيجة وإصدار الشهادة.'
  }
];

export default function HowToJoinSection() {
  return (
    <section className="container">
      <h4 className="text-center text-2xl font-semibold">كيف يمكنني الانضمام للمنصة والحصول على الشهاده</h4>
      <p className="text-center">4 خطوات للحصول على شهادة الاداء</p>
      <div className="xl:grid xl:grid-cols-2 xl:gap-8 2xl:gap-16">
        {steps.map((step, index) => (
          <StepCard key={index} description={step.description} title={step.title} step={index + 1} />
        ))}
      </div>
    </section>
  );
}
