type Props = {
  axes: { name: string; title: string }[];
  currentIndex: number;
};

export default function AxisProgress({ axes, currentIndex }: Props) {
  return (
    <>
      <div className="text-muted flex w-full text-center text-sm font-semibold">
        {axes.map((axisItem, i) => (
          <div
            key={axisItem.name}
            className={`basis-1/4 space-y-2 transition-colors duration-500 ${i === currentIndex ? 'text-secondary' : ''}`}
          >
            <p>{axisItem.name}</p>
            <p>{axisItem.title} (25%)</p>
          </div>
        ))}
      </div>
      <div className="bg-muted relative h-1">
        <div
          className="bg-secondary absolute -top-0.5 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex + 1) * 25}%` }}
        ></div>
      </div>
    </>
  );
}
