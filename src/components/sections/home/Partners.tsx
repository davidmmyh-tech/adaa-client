import { partners } from '@/assets/images';

export default function PartnersSection() {
  return (
    <section className="container space-y-6">
      <h5 className="text-center text-2xl font-semibold">شركاؤنا</h5>
      <div className="no-scrollbar mx-auto w-fit max-w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-8">
          {partners.map((partner, index) => (
            <img key={index} src={partner} alt={`partner ${index + 1}`} className="h-32 w-32 shrink-0 object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
}
