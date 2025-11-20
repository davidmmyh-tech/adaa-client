import { bronzeIcon, diamondIcon, goldIcon, silverIcon } from '@/assets/icons';
import { useMemo } from 'react';

export default function CertificatesClassesSection() {
  const certificateClasses = useMemo(
    () => [
      {
        title: 'شهادة أداء ماسية',
        scoreRange: '86-100%',
        description: 'تهنئ الجمعية بتحقيق مستوى تميز مؤسسي عالي جدًا',
        icon: diamondIcon,
        bgColorClass: 'diamond-gradient'
      },
      {
        title: 'شهادة أداء ذهبية',
        scoreRange: '76-85%',
        description: 'تؤكد التميز في تطبيق الممارسات المؤسسية',
        icon: goldIcon,
        bgColorClass: 'gold-gradient'
      },
      {
        title: 'شهادة أداء فضية',
        scoreRange: '66-75%',
        description: 'تشير إلى جاهزية مؤسسية قوية وتطبيق جيد',
        icon: silverIcon,
        bgColorClass: 'silver-gradient'
      },
      {
        title: 'شهادة أداء برونزية',
        scoreRange: '55-65%',
        description: 'تعكس الالتزام بالممارسات الأساسية للتحسين المستمر',
        icon: bronzeIcon,
        bgColorClass: 'bronze-gradient'
      }
    ],
    []
  );

  return (
    <section className="container space-y-6">
      <h2 className="text-2xl font-semibold">انواع الشهادات</h2>
      <div className="grid grid-cols-1 gap-8 text-center font-semibold md:grid-cols-2 xl:grid-cols-4">
        {certificateClasses.map((c, index) => (
          <div
            key={index + c.title}
            className={`${c.bgColorClass} flex w-full flex-col items-center gap-8 rounded-xl p-10`}
          >
            <img
              src={c.icon}
              alt="gold medal"
              className={`${c.icon === diamondIcon ? 'h-32 w-20' : 'h-32 w-36'} object-contain`}
            />
            <p className="text-xl">{c.title}</p>
            <p className="text-2xl">{c.scoreRange}</p>
            <p className="font-medium">{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
