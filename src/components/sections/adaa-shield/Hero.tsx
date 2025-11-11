import { adaaShieldImage } from '@/assets/images';
import LinkButton from '@/components/ui/extend/LinkButton';
import { Check } from 'lucide-react';

const advantages = [
  'تعزيز الأداء الاستراتيجي من خلال التخطيط المبدع',
  'تحقيق الأثر الاجتماعي من خلال البرامج الفعالة.',
  'الاستدامة المالية كجزء أساسي من التقييم.'
];

export default function AdaaShieldHeroSection() {
  return (
    <header>
      <div className="cup-hero-background h-[920px] items-center pt-52 md:h-[850px] lg:h-[750px]">
        <div className="container flex flex-col items-center space-y-12 px-4 text-center text-white">
          <h1 className="max-w-5xl text-4xl font-bold md:text-5xl" style={{ lineHeight: 1.5 }}>
            “مرحبًا بك في جائزة درع أداء – تكريم التميز الاستراتيجي والابتكار الاجتماعي”
          </h1>
          <p className="text-lg md:text-xl">
            تعد جائزة درع أداء واحدة من أهم الجوائز التي تهدف إلى تكريم المنظمات غير الربحية التي تُظهر التميز في الأداء
            الاستراتيجي و التأثير الاجتماعي. من خلال هذه الجائزة، نحتفل بالجهود المستمرة لتطوير المجتمع المحلي وتعزيز
            الاستدامة الاجتماعية.
          </p>
        </div>
      </div>

      {/* Hero Illustration Section */}
      <div className="container -mt-52">
        <div className="bg-primary rounded-2xl md:me-8">
          <div className="illustration-background text-primary-foreground flex flex-col-reverse items-center justify-between gap-8 p-8 md:flex-row md:pe-0">
            <div className="space-y-8">
              <h2 className="mb-4 text-2xl font-bold">عن جائزة درع أداء</h2>
              <p>
                تسعى مسرعة أثر وريادة إلى تكريم المنظمات غير الربحية التي تُظهر تميزًا في الأداء الاستراتيجي وتنفيذ
                برامج مبتكرة تُحدث فرقًا حقيقيًا في المجتمع. تهدف الجائزة إلى تسليط الضوء على المنظمات التي تعمل بجد
                لتحقيق الأثر الاجتماعي المستدام، وتعزيز الاستدامة المالية والابتكار في العمليات.
              </p>
              <ul className="space-y-4">
                {advantages.map((advantage, index) => (
                  <li key={index} className="flex gap-4">
                    <Check />
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <LinkButton to="/درع-اداء/تقييم" variant="secondary" className="w-auto md:w-32">
                  سجل الان
                </LinkButton>
                <LinkButton to="/" variant="outline" className="w-auto md:w-40">
                  تعرف على الجوائز
                </LinkButton>
              </div>
            </div>

            {/* Illustration */}
            <img
              src={adaaShieldImage}
              alt="Description of image"
              className="-mt-24 -mb-4 h-60 object-contain sm:-me-52 sm:-mb-16 sm:h-80 md:-me-8 md:mt-0 md:mb-0 md:h-96"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
