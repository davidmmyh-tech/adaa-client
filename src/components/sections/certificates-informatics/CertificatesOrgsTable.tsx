import { Table, TBody, TCell, THead, TRow } from '@/components/ui/extend/TableItems';
import { TableLoading } from '@/components/ui/loading/TableLoading';
import { CERTIFICATE_CLASSES, CERTIFICATE_TRACKS } from '@/constants/data';
import type { CertificatesOrganization } from '@/services/certificates/types';

type Props = {
  orgs: CertificatesOrganization[];
  isLoading?: boolean;
};

export default function CertificatesOrgsTable({ orgs, isLoading = false }: Props) {
  return (
    <div className="bg-muted/10">
      <div className="container space-y-6 py-4">
        <h3 className="text-2xl font-bold">الجمعيات الحاصلة على شهادة اداء</h3>
        <Table>
          <TBody>
            <TRow>
              <THead className="col-span-3">اسم الجمعية</THead>
              <THead className="col-span-2">نوع المسار</THead>
              <THead className="col-span-2">نوع الشهادة</THead>
              <THead className="col-span-1">النسبة</THead>
              <THead className="col-span-3">الموقع الالكتروني</THead>
            </TRow>

            {isLoading ? (
              <TableLoading />
            ) : (
              orgs.map((org) => (
                <TRow key={org.organization_id + org.path}>
                  <TCell className="col-span-3">{org.organization_name}</TCell>
                  <TCell className="col-span-2 flex items-center gap-2">
                    <img src={CERTIFICATE_TRACKS[org.path].icon} alt={org.path_label} className="w-6" />
                    {org.path_label}
                  </TCell>
                  <TCell className="col-span-2">
                    {CERTIFICATE_CLASSES[org.rank].name}
                    <img
                      src={CERTIFICATE_CLASSES[org.rank].icon}
                      alt={CERTIFICATE_CLASSES[org.rank].name}
                      className="w-6"
                    />
                  </TCell>
                  <TCell className="col-span-1">{org.percentage ? `${org.percentage}%` : '___'}</TCell>
                  <TCell className="col-span-3">
                    {org.website ? (
                      <a href={org.website} className="flex items-center justify-center text-blue-600 underline">
                        {org.website}
                      </a>
                    ) : (
                      'لا يوجد'
                    )}
                  </TCell>
                </TRow>
              ))
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
