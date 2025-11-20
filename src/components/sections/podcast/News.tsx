import DetailsCard from '@/components/ui/extend/DetailsCard';
import Logo from '@/components/ui/extend/Logo';
import useGetNews from '@/hooks/queries/useGetNews';

export default function NewsSection() {
  const { data, isPending } = useGetNews();

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container space-y-4 py-6">
        {isPending ? (
          <div className="flex h-[448px] justify-center 2xl:h-52">
            <Logo isLoading variant="light" />
          </div>
        ) : (data?.data.data.length ?? 0) === 0 ? (
          <div className="flex h-[448px] items-center justify-center text-4xl font-semibold 2xl:h-60">
            لا توجد أخبار حالياً
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">أخبار أداء</h2>
            <div className="grid gap-8 2xl:grid-cols-2">
              {data?.data.data.map((item) => (
                <DetailsCard
                  key={item.id}
                  date={item.publish_date}
                  title={item.title}
                  description={item.content}
                  image={item.image}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
