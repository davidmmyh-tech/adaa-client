import React from 'react';
import LinkButton, { type LinkButtonProps } from './LinkButton';
import { useUserState } from '@/context/UserProvider';

type Props = {
  children?: React.ReactNode;
} & LinkButtonProps;

export default function UserStateButton({ children, variant = 'secondary', className, ...props }: Props) {
  const { user } = useUserState();

  if (user)
    return (
      <LinkButton variant={variant} className={className} {...props}>
        {children}
      </LinkButton>
    );
  return (
    <LinkButton to="/تسجيل-دخول" variant={variant} className={className}>
      سجّل الآن
    </LinkButton>
  );
}
