import DetailsCard from '@/components/ui/extend/DetailsCard';
import { getNews } from '@/services/podcasts';
import { useQuery } from '@tanstack/react-query';

export default function NewsSection() {
  const { data } = useQuery({
    queryKey: ['news'],
    queryFn: () => getNews()
  });
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container space-y-4 py-6">
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
      </div>
    </section>
  );
}
