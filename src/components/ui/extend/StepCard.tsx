import { howToJoinSteps } from '@/assets/images';
import { cn } from '@/lib/utils';

type Props = {
  step: number;
  title: string;
  description: string;
};

const stepsImages = [howToJoinSteps.step1, howToJoinSteps.step2, howToJoinSteps.step3, howToJoinSteps.step4];

export default function StepCard({ description, title, step }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-end gap-4 pt-10 text-center md:flex-row',
        step % 2 === 0 ? 'md:flex-row-reverse md:pe-8 md:text-end' : 'md:ps-8 md:text-start'
      )}
    >
      <div className="flex w-full shrink-0 justify-center md:w-auto">
        <div className="relative w-fit">
          <p
            className={cn(
              'text-outline step-number-text font-gilroy absolute -top-10 z-10 h-16 font-bold',
              step % 2 === 0 ? '-end-8' : '-start-8'
            )}
          >
            {step}
          </p>
          <img
            src={stepsImages[step - 1]}
            alt={`step ${step}`}
            className={cn(
              'h-40 w-64 rounded-lg object-cover shadow-md',
              step === 1 ? 'brightness-125' : 'scale-x-[-1]'
            )}
          />
        </div>
      </div>
      <div className="pb-8">
        <p className="text-lg">{title}</p>
        <p className="text-muted font-light">{description}</p>
      </div>
    </div>
  );
}
