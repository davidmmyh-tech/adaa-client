import type { ButtonHTMLAttributes } from 'react';
import LinkButton, { type LinkButtonProps } from './LinkButton';
import { useUserState } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import SubmitButton from '../submit-button';
import { Button } from '../button';
import { ROUTES } from '@/routes';

type UserStateButtonProps = {
  children?: React.ReactNode;
  useAdaaPlus?: boolean;
  isLoading?: boolean;
  variant?: LinkButtonProps['variant'];
  className?: string;
} & ({ to: string; onClick?: never } | { to?: never; onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] });

export default function UserStateButton({
  children,
  variant = 'secondary',
  to,
  className,
  useAdaaPlus = false,
  isLoading = false,
  onClick
}: UserStateButtonProps) {
  const { user, flags } = useUserState();

  // Adaa Plus subscription check
  if (useAdaaPlus && user) {
    if (!flags.subscription_status) {
      return (
        <LinkButton to={ROUTES.ADAA_PLUS} variant={variant} className={className}>
          اشترك الان
        </LinkButton>
      );
    }

    if (flags.subscription_status === 'pending') {
      return (
        <Button variant={variant} disabled className={cn('border-secondary w-56 opacity-100', className)}>
          جاري التحقق من الاشتراك ...
        </Button>
      );
    }
  }

  // Organization status: Approved
  if (flags.has_organization && flags.organization_status === 'approved') {
    if (to) {
      return (
        <LinkButton to={to} variant={variant} className={className}>
          {children}
        </LinkButton>
      );
    }

    return (
      <SubmitButton variant={variant} className={className} onClick={onClick} isLoading={isLoading}>
        {children}
      </SubmitButton>
    );
  }

  // Organization status: Pending
  if (user && flags.has_organization && flags.organization_status === 'pending') {
    return (
      <Button variant={variant} disabled className={cn('w-60 opacity-50', className)}>
        المنظمة تحت المراجعة
      </Button>
    );
  }

  // User not logged in or has no organization
  const redirectPath = user && !flags.has_organization ? ROUTES.AUTH.REGISTER : ROUTES.AUTH.LOGIN;

  return (
    <LinkButton to={redirectPath} variant={variant} className={className}>
      سجّل الآن
    </LinkButton>
  );
}
