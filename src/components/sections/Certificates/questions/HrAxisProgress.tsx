type Props = {
  currentAxisIndex: number;
  axies: { name: string; title: string }[];
};

export default function HrAxisProgress({ currentAxisIndex, axies }: Props) {
  return (
    <div className="no-scrollbar max-w-full overflow-auto">
      <div className="w-fit min-w-full space-y-4">
        <div className="text-muted flex w-fit min-w-full justify-between text-center text-sm font-semibold">
          {axies.map((axisItem, i) => (
            <div
              key={axisItem.name}
              className={`w-48 space-y-2 transition-colors duration-500 ${i === currentAxisIndex ? 'text-secondary' : ''}`}
            >
              <p>{axisItem.name}</p>
              <p>{axisItem.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted relative mb-1 h-1 w-full">
          <div
            className="bg-secondary absolute -top-0.5 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentAxisIndex + 1) * 100) / axies.length}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
