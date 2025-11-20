import React from 'react';
import LinkButton, { type LinkButtonProps } from './LinkButton';
import { useUserState } from '@/context/UserProvider';
import { cn } from '@/lib/utils';
import SubmitButton from '../submit-button';

type Props = {
  children?: React.ReactNode;
  useAdaaPlus?: boolean;
  isLoading?: boolean;
  to?: string;
} & LinkButtonProps;

export default function UserStateButton({ children, variant = 'secondary', className, useAdaaPlus, ...props }: Props) {
  const { user, flags } = useUserState();
  const Element = !props.to.length ? SubmitButton : LinkButton;

  if (useAdaaPlus && user && flags.has_active_subscription) {
    return (
      <LinkButton to={'/اشتراك-اداء-المميز'} variant={variant} className={cn('', className)}>
        اشتراك أداء بلس
      </LinkButton>
    );
  }

  if (flags.has_organization && flags.organization_status === 'approved') {
    if (Element === SubmitButton)
      return (
        <SubmitButton
          variant={variant}
          className={className}
          onClick={(e: React.MouseEvent) => props.onClick?.(e as React.MouseEvent<HTMLAnchorElement>)}
          isLoading={props.isLoading}
        >
          {children}
        </SubmitButton>
      );
    else
      return (
        <LinkButton variant={variant} className={className} {...props}>
          {children}
        </LinkButton>
      );
  }

  if (user && flags.has_organization && flags.organization_status === 'pending')
    return (
      <LinkButton
        to={'/تسجيل-دخول'}
        variant={variant}
        className={cn('pointer-events-none opacity-50', className, 'w-60')}
      >
        المنظمة تحت المراجعة
      </LinkButton>
    );

  return (
    <LinkButton
      to={user && !flags.has_organization ? '/تسجيل-منظمة' : '/تسجيل-دخول'}
      variant={variant}
      className={className}
    >
      سجّل الآن
    </LinkButton>
  );
}
