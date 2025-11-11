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
        <div className="grid grid-cols-7 gap-1 font-semibold md:grid-cols-8 lg:gap-4">
          <div className="col-span-2 flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">
            اسم الجمعية
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">المنطقة</div>
          <div className="hidden h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center md:flex">
            سنة التقييم
          </div>
          <div className="flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">مستوي الاداء</div>
          <div className="flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">نسبة الانجاز</div>
          <div className="col-span-2 flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center">
            الموقع الالكتروني
          </div>
        </div>

        {orgs.map((org, index) => (
          <div
            key={org.organization_name + index}
            className="grid grid-cols-7 gap-1 font-semibold md:grid-cols-8 lg:gap-4"
          >
            <div className="col-span-2 flex items-center justify-center py-4">{org.organization_name}</div>
            <div className="flex items-center justify-center py-4">{org.region || 'n/a'}</div>
            <div className="hidden items-center justify-center py-4 md:flex">{org.year}</div>
            <div className="flex items-center justify-center py-4">{gradesMap[org.grade]}</div>
            <div className="flex items-center justify-center py-4">{org.rate}%</div>
            <a
              href={org.organization_website || '#'}
              className="col-span-2 flex items-center justify-center text-blue-600 underline"
            >
              {org.organization_website || 'n/a'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
