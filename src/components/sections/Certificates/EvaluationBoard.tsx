import { humanResourcesIcon, operationalIcon, stratigicIcon } from '@/assets/icons';
import { Table, TBody, THead, TRow } from '@/components/ui/extend/TableItems';
import { TEMP_SUMMARY } from '@/constants/data';
import TracksTableRow from './TrackTableRow';
import { useQuery } from '@tanstack/react-query';
import { userSummary } from '@/services/certificates/certificates-data';

export default function EvaluationBoardSection() {
  const { data } = useQuery({
    queryKey: ['user-certificate-tracks-states'],
    queryFn: () => userSummary(),
    placeholderData: (data) => data
  });
  const pathsSummary = data?.data.data.paths || TEMP_SUMMARY.data.paths;

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

            <TracksTableRow
              title="الأداء الاستراتيجي"
              icon={stratigicIcon}
              trackName="strategic"
              summary={pathsSummary?.strategic}
            />

            <TracksTableRow
              title="الأداء التشغيلي"
              icon={operationalIcon}
              trackName="operational"
              summary={pathsSummary?.operational}
            />

            <TracksTableRow
              title="الموارد البشرية"
              icon={humanResourcesIcon}
              trackName="hr"
              summary={pathsSummary?.hr}
            />
          </TBody>
        </Table>
      </div>
    </section>
  );
}
