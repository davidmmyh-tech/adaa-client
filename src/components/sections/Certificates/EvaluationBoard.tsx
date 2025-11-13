import { Button } from '@/components/ui/button';
import { Table, TBody, TCell, THead, TRow } from '@/components/ui/extend/TableItems';
import { Download } from 'lucide-react';
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

  const states = useMemo(
    () => ({
      completed: {
        name: 'مكتمل',
        color: '#078C43',
        Button: (
          <Button className="w-full">
            <Download />
            تحميل الشهادة
          </Button>
        )
      },
      in_review: {
        name: 'قيد المراجعة',
        color: '#9D9615',
        Button: (
          <Button className="w-full" variant="outline">
            ⏳ قيد التقييم
          </Button>
        )
      },
      none: {
        name: 'لم يبدأ بعد',
        color: '#B01D1D',
        Button: (
          <Button className="w-full" variant="secondary">
            ابدأ الآن
          </Button>
        )
      }
    }),
    []
  );

  return (
    <section className="bg-muted/10 container space-y-6 rounded-lg p-4">
      <h6 className="text-2xl font-semibold">لوحة التقييم</h6>
      <div className="space-y-4">
        <Table>
          <TBody className="min-w-4xl">
            <TRow>
              <THead className="col-span-3">المسار</THead>
              <THead className="col-span-3">الحالة</THead>
              <THead className="col-span-1">النسبة</THead>
              <THead className="col-span-3">نوع الشهادة</THead>
            </TRow>

            {userTracksStates.map((t) => (
              <TRow key={t.name}>
                <TCell className="col-span-3">{t.name}</TCell>
                <TCell className="col-span-3" style={{ color: states[t.state as keyof typeof states].color }}>
                  {states[t.state as keyof typeof states].name}
                </TCell>
                <TCell className="col-span-1" style={{ color: states[t.state as keyof typeof states].color }}>
                  {t.percentage || '____'}
                </TCell>
                <TCell className="col-span-3">{t.certificateType}</TCell>
                <TCell>{states[t.state as keyof typeof states].Button}</TCell>
              </TRow>
            ))}
          </TBody>
        </Table>
      </div>
    </section>
  );
}
