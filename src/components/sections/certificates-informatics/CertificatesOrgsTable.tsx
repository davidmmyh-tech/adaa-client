import { Table, TBody, TCell, THead, TRow } from '@/components/ui/extend/TableItems';

export default function CertificatesOrgsTable() {
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

            <TRow>
              <TCell className="col-span-3">جمعية نماء الأهلية</TCell>
              <TCell className="col-span-2">⚙️ الأداء التشغيلي</TCell>
              <TCell className="col-span-2">شهادة ماسية</TCell>
              <TCell className="col-span-1">94%</TCell>
              <TCell className="col-span-3">
                <a href={'/#'} className="flex items-center justify-center text-blue-600 underline">
                  org.organization_website || 'n/a'
                </a>
              </TCell>
            </TRow>
          </TBody>
        </Table>
      </div>
    </div>
  );
}
