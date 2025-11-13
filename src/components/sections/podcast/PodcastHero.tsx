export default function PodcastHeroSection() {
  return (
    <header className="bg-primary relative flex h-screen max-h-[650px] items-center justify-center">
      <div className="podcast-hero-background absolute inset-0 z-0 opacity-60"></div>
      <div className="z-10 container flex h-full flex-col items-center justify-center space-y-14 px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">“مرحبًا بك في كرسي أداء</h1>
        <p className="max-w-4xl text-lg md:text-xl" style={{ lineHeight: 1.8 }}>
          تعد جائزة درع أداء واحدة من أهم الجوائز التي تهدف إلى تكريم المنظمات غير الربحية التي تُظهر التميز في الأداء
          الاستراتيجي و التأثير الاجتماعي. من خلال هذه الجائزة، نحتفل بالجهود المستمرة لتطوير المجتمع المحلي وتعزيز
          الاستدامة الاجتماعية.
        </p>
      </div>
    </header>
  );
}
