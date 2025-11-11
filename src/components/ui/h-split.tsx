import { cn } from '@/lib/utils';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

export default function HSplit({ className, ...props }: Props) {
  return (
    <div className={cn('flex w-full items-center', className)} {...props}>
      <hr className="grow" />
    </div>
  );
}
