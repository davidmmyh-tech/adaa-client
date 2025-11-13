import { cn } from '@/lib/utils';
import { Link, type LinkProps } from 'react-router';

export type LinkButtonProps = {
  variant?: keyof typeof variants;
} & LinkProps;

const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-secondary text-secondary border-2 font-semibold'
};

export default function LinkButton({ children, className, variant = 'default', ...props }: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        variants[variant],
        'font-bold, inline-flex h-14 w-fit items-center justify-center rounded-md px-4 shadow-md transition-colors hover:opacity-90',
        className
      )}
    >
      {children}
    </Link>
  );
}
