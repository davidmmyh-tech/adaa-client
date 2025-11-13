import { heroImage } from '@/assets/images';
import DetailsCard from '@/components/ui/extend/DetailsCard';

export default function NewsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container space-y-4 py-6">
        <h2 className="text-2xl font-semibold">أخبار أداء</h2>
        <div className="grid gap-8 xl:grid-cols-2">
          <DetailsCard date="أكتوبر 2025" title="عنوان الخبر" description="وصف الخبر" image={heroImage} to="#" />
          <DetailsCard date="أكتوبر 2025" title="عنوان الخبر" description="وصف الخبر" image={heroImage} to="#" />
        </div>
      </div>
    </section>
  );
}
