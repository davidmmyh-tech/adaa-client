import { chartIcon, databaseIcon, handTickIcon, toolsIcon } from '@/assets/icons';
import ServiceCard from '@/components/ui/extend/ServiceCard';

const services = [
  {
    title: 'ادوات قياس الاداء',
    description: 'نظام نقاط الاداء, تقرير تحليلية',
    icon: <img src={chartIcon} alt="Chart Icon" className="h-12 w-12 object-contain" />
  },
  {
    title: 'أتمتة العمليات',
    description: 'أتمتة تقييمات الأداء المؤسسي . جدولة مواعيد مراجعات الأداء',
    icon: <img src={handTickIcon} alt="Hand Tick Icon" className="h-12 w-12 object-contain" />
  },
  {
    title: 'إرشاد وتطوير',
    description: 'استشارات خاصة لتحسين الأداء تدريبات وورش عمل',
    icon: <img src={toolsIcon} alt="Tools Icon" className="h-12 w-12 object-contain" />
  },
  {
    title: 'قواعد بيانات',
    description: 'قاعدة بيانات مرجعية للمعايير العالمية . مكتبة موارد رقمية.',
    icon: <img src={databaseIcon} alt="Database Icon" className="h-12 w-12 object-contain" />
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-muted/10">
      <div className="illustration-background space-y-8 py-8">
        <h3 className="text-center text-3xl font-semibold">خدماتنا</h3>
        <div className="container grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              description={service.description}
              icon={service.icon}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
