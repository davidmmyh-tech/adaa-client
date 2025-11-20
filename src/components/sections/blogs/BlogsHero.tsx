export default function BlogsHeroSection() {
  return (
    <header className="bg-primary relative flex h-screen max-h-[650px] items-center justify-center">
      <div className="blogs-hero-background absolute inset-0 opacity-50"></div>
      <div className="z-20 container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">مدونة أداء</h1>
        <p className="text-lg md:text-xl">
          في مدونة أداء نوفر لكم معرفة موثوقة تدعم تطول القطاع غير الربحي و تسهم في رفع مستوى أداء منظمتكم و تدعم
          مسيرتها نحو التميز و الاستدامة
        </p>
      </div>
    </header>
  );
}
