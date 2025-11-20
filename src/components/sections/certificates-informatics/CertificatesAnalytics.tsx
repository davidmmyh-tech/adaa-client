import { bronzeIcon, diamondIcon, goldIcon, silverIcon } from '@/assets/icons';
import { getAnalytics } from '@/services/certificates/certificates-data';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function CertificatesAnalyticsSection() {
  const { data } = useQuery({
    queryKey: ['certificates-analytics'],
    queryFn: () => getAnalytics()
  });

  const total =
    (data?.data.data.by_rank.bronze || 0) +
    (data?.data.data.by_rank.silver || 0) +
    (data?.data.data.by_rank.gold || 0) +
    (data?.data.data.by_rank.diamond || 0);

  const CERTIFICATE_CLASSES = useMemo(
    () => [
      {
        title: 'عدد الجمعيات الماسية',
        icon: diamondIcon,
        bgColorClass: 'diamond-gradient',
        count: data?.data.data.by_rank.diamond || 0
      },
      {
        title: 'عدد الجمعيات الذهبية',
        icon: goldIcon,
        bgColorClass: 'gold-gradient',
        count: data?.data.data.by_rank.gold || 0
      },
      {
        title: 'عدد الجمعيات الفضية',
        icon: silverIcon,
        bgColorClass: 'silver-gradient',
        count: data?.data.data.by_rank.silver || 0
      },
      {
        title: 'عدد الجمعيات البرونزية',
        icon: bronzeIcon,
        bgColorClass: 'bronze-gradient',
        count: data?.data.data.by_rank.bronze || 0
      }
    ],
    [data]
  );

  return (
    <section className="container space-y-4">
      <div className="flex justify-center gap-4">
        <div className="bg-secondary text-secondary-foreground max-w-sm rounded-2xl p-6 text-center text-2xl font-semibold shadow-lg">
          <h4>عدد الجمعيات المشاركه</h4>
          <p>{data?.data.data.total_organizations}</p>
        </div>
        <div className="bg-secondary text-secondary-foreground max-w-sm rounded-2xl p-6 text-center text-2xl font-semibold shadow-lg">
          <h4>عدد شهادات الأداء الممنوحة</h4>
          <p>{total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 text-center font-semibold md:grid-cols-2 xl:grid-cols-4">
        {CERTIFICATE_CLASSES.map((c, index) => (
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
