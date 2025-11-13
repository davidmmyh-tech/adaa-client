import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function THead({ children, className, ...props }: Props) {
  return (
    <div
      className={cn('col-span-2 flex h-16 items-center justify-center rounded-lg bg-[#D4D4EC] text-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TCell({ children, className, ...props }: Props) {
  return (
    <div className={cn('col-span-2 flex items-center justify-center py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function TRow({ children, className, ...props }: Props) {
  return (
    <div className={cn('grid w-full grid-cols-12 gap-1 font-semibold md:grid-cols-12 lg:gap-4', className)} {...props}>
      {children}
    </div>
  );
}

export function Table({ children, className, ...props }: Props) {
  return (
    <div className={cn('max-w-full overflow-auto', className)} {...props}>
      {children}
    </div>
  );
}

export function TBody({ children, className, ...props }: Props) {
  return (
    <div className={cn('min-w-2xl', className)} {...props}>
      {children}
    </div>
  );
}
