import { certificateClasses, certificateTracks } from '@/constants/data';
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
          <p className="text-xl">{certificateClasses[o.rank].name}</p>
          <p className="text-2xl font-semibold">{o.organization_name}</p>
          <p className="text-2xl font-semibold">{certificateTracks[o.path].label}</p>
          <p className="text-2xl font-semibold">{o.percentage ? `${o.percentage}%` : '___'}</p>
          {o.website ? (
            <a href={o.website} className="flex items-center justify-center text-blue-600 underline">
              {o.website}
            </a>
          ) : (
            <p>لا يوجد</p>
          )}
        </div>
      ))}
    </div>
  );
}
