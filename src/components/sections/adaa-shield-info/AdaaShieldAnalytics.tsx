import { getShieldAnalytics } from '@/services/shield';
import { useQuery } from '@tanstack/react-query';

const initialData = {
  total_organizations_awarded: 0,
  highest_rate: 0,
  average_rate: 0,
  organizations_completed_ratio: 0
};

export default function AdaaShieldAnalytics() {
  const analyticsQuery = useQuery({
    queryFn: () => getShieldAnalytics(),
    queryKey: ['adaa-shield-analytics']
  });
  const analytics = analyticsQuery.data?.data ?? initialData;

  return (
    <div className="container space-y-8">
      <div className="bg-secondary text-secondary-foreground mx-auto max-w-sm rounded-2xl p-6 text-center text-2xl font-semibold shadow-lg">
        <h4>إجمالي الجمعيات المكرّمة</h4>
        <p>{analytics.total_organizations_awarded}</p>
      </div>
      <div className="bg-primary text-primary-foreground grid w-full grid-cols-1 gap-12 rounded-2xl p-8 text-center text-xl font-bold shadow-lg md:grid-cols-3 md:gap-4 [&>div]:space-y-6 [&>div>p]:text-6xl">
        <div>
          <p>{analytics.highest_rate}%</p>
          <span style={{ lineHeight: 1.5 }}>أعلى تقييم محقق</span>
        </div>
        <div>
          <p>{analytics.average_rate}%</p>
          <span style={{ lineHeight: 1.5 }}>متوسط الأداء العام</span>
        </div>
        <div>
          <p>{analytics.organizations_completed_ratio}%</p>
          <span style={{ lineHeight: 1.5 }}>نسبة الجمعيات التي أنهت استراتيجيتها</span>
        </div>
      </div>
    </div>
  );
}
