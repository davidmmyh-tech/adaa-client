type Props = {
  title: string;
  description: string;
};

export default function AdaaShieldHeroSection({ title, description }: Props) {
  return (
    <header className="cup-hero-background mb-12 flex h-[550px] items-center justify-center">
      <div className="container flex flex-col items-center space-y-12 px-4 text-center text-white">
        <h1 className="max-w-5xl text-4xl font-bold md:text-5xl" style={{ lineHeight: 1.5 }}>
          {title}
        </h1>
        <p className="text-lg md:text-xl">{description}</p>
      </div>
    </header>
  );
}
