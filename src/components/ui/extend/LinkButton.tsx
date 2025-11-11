import { cn } from '@/lib/utils';
import { Link, type LinkProps } from 'react-router';

type Props = {
  variant?: keyof typeof variants;
} & LinkProps;

const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-secondary text-secondary'
};

export default function LinkButton({ children, className, variant = 'default', ...props }: Props) {
  return (
    <Link
      {...props}
      className={cn(
        variants[variant],
        'inline-flex h-14 w-fit items-center justify-center rounded-md px-4 font-bold',
        className
      )}
    >
      {children}
    </Link>
  );
}
