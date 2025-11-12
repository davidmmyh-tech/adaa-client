import { states } from '@/constants/data';
import { useMemo } from 'react';

export default function EvaluationBoardSection() {
  const userTracksStates = useMemo(
    () => [
      {
        name: 'الأداء التشغيلي',
        state: 'completed',
        percentage: 100,
        certificateType: 'الشهادة الماسية'
      },
      {
        name: 'الأداء الاستراتيجي',
        state: 'in_review',
        percentage: 0,
        certificateType: ''
      },
      {
        name: 'الموارد البشرية',
        state: 'none',
        percentage: 0,
        certificateType: ''
      }
    ],
    []
  );

  return (
    <section className="bg-muted/10 container space-y-6 rounded-lg p-4">
      <h6 className="text-2xl font-semibold">لوحة التقييم</h6>
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-1 font-semibold md:grid-cols-5 lg:gap-4">
          <div className="flex h-12 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">المسار</div>
          <div className="flex h-12 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">الحالة</div>
          <div className="flex h-12 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">النسبة</div>
          <div className="flex h-12 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">نوع الشهادة</div>
        </div>

        {userTracksStates.map((t) => (
          <div key={t.name} className="grid grid-cols-5 gap-1 text-sm font-semibold md:grid-cols-5 lg:gap-4">
            <div className="flex items-center justify-center py-4">{t.name}</div>
            <div
              className="flex items-center justify-center py-4"
              style={{ color: states[t.state as keyof typeof states].color }}
            >
              {states[t.state as keyof typeof states].name}
            </div>
            <div
              className="flex items-center justify-center py-4"
              style={{ color: states[t.state as keyof typeof states].color }}
            >
              {t.percentage || '____'}
            </div>
            <div className="flex items-center justify-center py-4">{t.certificateType}</div>
            {states[t.state as keyof typeof states].Button}
          </div>
        ))}
      </div>
    </section>
  );
}
