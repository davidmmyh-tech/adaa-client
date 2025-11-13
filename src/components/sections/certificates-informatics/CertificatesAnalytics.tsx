import { bronseIcon, diamondIcon, goldIcon, silverIcon } from '@/assets/icons';
import { useMemo } from 'react';

export default function CertificatesAnalyticsSection() {
  const certificateClasses = useMemo(
    () => [
      {
        title: 'عدد الجمعيات الماسية',
        icon: diamondIcon,
        bgColorClass: 'diamond-gradient',
        count: 0
      },
      {
        title: 'عدد الجمعيات الذهبية',
        icon: goldIcon,
        bgColorClass: 'gold-gradient',
        count: 0
      },
      {
        title: 'عدد الجمعيات الفضية',
        icon: silverIcon,
        bgColorClass: 'silver-gradient',
        count: 0
      },
      {
        title: 'عدد الجمعيات البرونزية',
        icon: bronseIcon,
        bgColorClass: 'bronse-gradient',
        count: 0
      }
    ],
    []
  );

  return (
    <section className="container space-y-4">
      <div className="flex justify-center gap-4">
        <div className="bg-secondary text-secondary-foreground max-w-sm rounded-2xl p-6 text-center text-2xl font-semibold shadow-lg">
          <h4>عدد الجمعيات المشاركه</h4>
          <p>0</p>
        </div>
        <div className="bg-secondary text-secondary-foreground max-w-sm rounded-2xl p-6 text-center text-2xl font-semibold shadow-lg">
          <h4>عدد شهادات الأداء الممنوحة</h4>
          <p>0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 text-center font-semibold md:grid-cols-2 xl:grid-cols-4">
        {certificateClasses.map((c, index) => (
          <div
            key={index + c.title}
            className={`${c.bgColorClass} flex w-full flex-col items-center gap-4 rounded-xl p-4 pb-14`}
          >
            <img src={c.icon} alt="gold medal" className="h-14 object-contain" />
            <p className="text-xl">{c.title}</p>
            <p className="text-2xl font-semibold">{c.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
