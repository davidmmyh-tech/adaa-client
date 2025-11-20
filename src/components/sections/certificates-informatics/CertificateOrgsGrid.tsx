import { certificateClasses } from '@/constants/data';
import type { CertificatesOrganization } from '@/services/certificates/types';

export function CertificateOrgsGrid({ orgs }: { orgs: CertificatesOrganization[] }) {
  return (
    <div className="container grid grid-cols-1 gap-8 text-center font-semibold md:grid-cols-2 xl:grid-cols-4">
      {orgs.map((o) => (
        <div
          key={`${o.path} + ${o.organization_id}`}
          className={`${certificateClasses[o.rank].bgColorClass} flex w-full flex-col items-center gap-8 rounded-xl p-4 pb-14`}
        >
          <img src={certificateClasses[o.rank].icon} alt="gold medal" className="h-14 object-contain" />
          <p className="text-xl">{o.rank_ar}</p>
          <p className="text-2xl font-semibold">{o.organization_name}</p>
          <p className="text-2xl font-semibold">{o.path_name_ar}</p>
          <p className="text-2xl font-semibold">{o.percentage ? `${o.percentage}%` : '___'}</p>
          <a href={o.website || '#'} className="text-2xl font-semibold">
            {o.website || 'n/a'}
          </a>
        </div>
      ))}
    </div>
  );
}
