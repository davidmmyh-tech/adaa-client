import React from 'react';
import LinkButton, { type LinkButtonProps } from './LinkButton';
import { useUserState } from '@/context/UserProvider';

type Props = {
  children?: React.ReactNode;
} & LinkButtonProps;

export default function UserStateButton({ children, variant, className, ...props }: Props) {
  const { user } = useUserState();
  if (user) return <LinkButton {...props}>{children}</LinkButton>;
  return (
    <LinkButton to="/تسجيل-دخول" variant={variant} className={className}>
      سجّل الآن
    </LinkButton>
  );
}
