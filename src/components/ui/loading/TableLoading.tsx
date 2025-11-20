import Skeleton from 'react-loading-skeleton';
import { TCell, TRow } from '../extend/TableItems';

export function TableLoading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <TRow key={index}>
          <TCell className="col-span-3">
            <div className="w-full">
              <Skeleton width="80%" height={20} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
            </div>
          </TCell>
          <TCell className="col-span-2">
            <div className="w-full">
              <Skeleton width="70%" height={20} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
            </div>
          </TCell>
          <TCell className="col-span-2">
            <div className="w-full">
              <Skeleton width="60%" height={20} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
            </div>
          </TCell>
          <TCell className="col-span-1">
            <Skeleton width={50} height={20} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
          </TCell>
          <TCell className="col-span-3">
            <div className="w-full">
              <Skeleton width="90%" height={20} baseColor="#e0e0e0" highlightColor="#f5f5f5" />
            </div>
          </TCell>
        </TRow>
      ))}
    </>
  );
}
