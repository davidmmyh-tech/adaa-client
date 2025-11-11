import Skeleton from 'react-loading-skeleton';

export default function QuestionsLoading() {
  return (
    <div className="space-y-4">
      <div className="text-muted flex w-full text-center text-sm font-semibold">
        <div className={`me-8 basis-1/4 space-y-4`}>
          <Skeleton width={140} height={20} className="mb-2" />
          <Skeleton height={20} />
        </div>
        <div className={`me-8 basis-1/4 space-y-4`}>
          <Skeleton width={140} className="mb-2" />
          <Skeleton />
        </div>
        <div className={`me-8 basis-1/4 space-y-4`}>
          <Skeleton width={140} className="mb-2" />
          <Skeleton />
        </div>
        <div className={`basis-1/4 space-y-4`}>
          <Skeleton width={140} className="mb-2" />
          <Skeleton />
        </div>
      </div>

      <Skeleton className="h-2" />

      <div className="mt-8 flex">
        <form className="w-full shrink-0 space-y-12">
          <p className="text-lg font-semibold">
            <Skeleton height={30} />
          </p>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <p className="font-semibold">
                  <Skeleton height={30} />
                </p>
                <div className="mt-4">
                  <div className="me-20 inline-block">
                    <Skeleton height={30} width={100} />
                  </div>
                  <div className="inline-block">
                    <Skeleton height={30} width={100} />
                  </div>
                </div>
              </div>
            ))}
          <p className="font-semibold">المرفقات</p>
          <div className="grid w-full gap-8 md:grid-cols-3">
            <Skeleton height={130} />
            <Skeleton height={130} />
            <Skeleton height={130} />
          </div>
        </form>
      </div>
    </div>
  );
}
