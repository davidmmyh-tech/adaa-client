import { Table, TBody, TCell, THead, TRow } from '@/components/ui/extend/TableItems';
import { gradesMap } from '@/constants/data';
import type { ShieldOrganization } from '@/services/shield';

type Props = {
  orgs: ShieldOrganization[];
};

export default function AdaaShieldOrgsTable({ orgs }: Props) {
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

            {orgs.map((org, index) => (
              <TRow key={org.organization_name + index}>
                <TCell className="col-span-3">{org.organization_name}</TCell>
                <TCell className="col-span-2">{org.region || 'n/a'}</TCell>
                <TCell className="col-span-2">{org.year}</TCell>
                <TCell className="col-span-2">{gradesMap[org.grade]}</TCell>
                <TCell className="col-span-1">{org.rate}%</TCell>
                <TCell className="col-span-2">
                  <a href={org.organization_website || '#'} className="text-blue-600 underline">
                    {org.organization_website || 'n/a'}
                  </a>
                </TCell>
              </TRow>
            ))}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
