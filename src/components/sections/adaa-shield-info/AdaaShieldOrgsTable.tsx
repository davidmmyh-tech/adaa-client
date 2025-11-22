import { Table, TBody, TCell, THead, TRow } from '@/components/ui/extend/TableItems';
import { TableLoading } from '@/components/ui/loading/TableLoading';
import { GRADES_MAP } from '@/constants/data';
import DataWrapper from '@/layouts/DataWrapper';
import type { ShieldOrganization } from '@/services/shield';

type Props = {
  orgs: ShieldOrganization[];
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  refetch: () => void;
};

export default function AdaaShieldOrgsTable({ orgs, isLoading, isEmpty, isError, refetch }: Props) {
  return (
    <div className="bg-muted/10">
      <div className="container space-y-6 py-4">
        <h3 className="text-2xl font-bold">الجمعيات الحاصلة على درع الأداء المؤسسي 2025</h3>

        <Table>
          <TBody>
            <TRow>
              <THead className="col-span-3">اسم الجمعية</THead>
              <THead className="col-span-2">المنطقة</THead>
              <THead className="col-span-2">سنة التقييم</THead>
              <THead className="col-span-2">مستوي الاداء</THead>
              <THead className="col-span-1">نسبة الانجاز</THead>
              <THead className="col-span-2">الموقع الالكتروني</THead>
            </TRow>

            <DataWrapper
              isLoading={isLoading}
              LoadingFallback={TableLoading}
              isEmpty={isEmpty}
              isError={isError}
              retry={refetch}
            >
              {orgs.map((org, index) => (
                <TRow key={org.organization_name + index}>
                  <TCell className="col-span-3">{org.organization_name}</TCell>
                  <TCell className="col-span-2">{org.region || 'n/a'}</TCell>
                  <TCell className="col-span-2">{org.year}</TCell>
                  <TCell className="col-span-2">{GRADES_MAP[org.grade]}</TCell>
                  <TCell className="col-span-1">{org.rate}%</TCell>
                  <TCell className="col-span-2">
                    <a href={org.organization_website || '#'} className="text-blue-600 underline">
                      {org.organization_website || 'n/a'}
                    </a>
                  </TCell>
                </TRow>
              ))}
            </DataWrapper>
          </TBody>
        </Table>
      </div>
    </div>
  );
}
