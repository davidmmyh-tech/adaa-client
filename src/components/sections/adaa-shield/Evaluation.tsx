import LinkButton from '@/components/ui/extend/LinkButton';
import ServiceCard from '@/components/ui/extend/ServiceCard';
import { CreativityIcon, FinanceIcon, PeopleIcon, StratigyIcon } from '@/components/ui/icons';

const evaluationPoints = [
  {
    title: 'الاستراتيجية:',
    description: 'وضوح الأهداف الاستراتيجية ومدى تحقيقها. تطبيق مؤشرات الأداء الرئيسية (KPIs).',
    icon: <StratigyIcon size={50} />
  },
  {
    title: 'الابتكار الاجتماعي:',
    description: 'القدرة على تقديم حلول مبتكرة لمشاكل المجتمع. قياس الأثر الاجتماعي.',
    icon: <CreativityIcon size={50} />
  },
  {
    title: 'الاستدامة المالية:',
    description: 'تنوع مصادر التمويل. قدرة المنظمة على تحقيق الاستدامة المالية.',
    icon: <FinanceIcon size={50} />
  },
  {
    title: 'التأثير الاجتماعي:',
    description: 'قياس الأثر الملموس على المستفيدين. آلية قياس رضا المستفيدين والتفاعل مع التغذية الراجعة.',
    icon: <PeopleIcon className="fill-primary" size={50} />
  }
];

export default function EvaluationSection() {
  return (
    <section className="bg-muted/10">
      <div className="illustration-background py-8">
        <div className="container space-y-8">
          <h4 className="text-center text-3xl font-semibold">معايير تقييم درع أداء</h4>
          <p className="text-semibold mx-auto max-w-2xl text-center">
            يتم تقييم المنظمات بناءً على معايير شاملة تشمل الأداء الاستراتيجي، الابتكار، التأثير الاجتماعي، والاستدامة
            المالية. إليك بعض من المعايير الرئيسية التي يتم أخذها في الاعتبار خلال عملية التقييم:
          </p>
          <div className="grid gap-8 md:grid-cols-2 md:gap-20 lg:grid-cols-2">
            {evaluationPoints.map((service) => (
              <ServiceCard
                key={service.title}
                description={service.description}
                icon={service.icon}
                title={service.title}
              />
            ))}
          </div>
          <LinkButton to="/" className="mx-auto flex h-14 w-52">
            سجّل الآن
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
