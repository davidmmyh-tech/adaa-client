import { useUserState } from '@/context/UserProvider';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function OrganizationGuard() {
  const { flags } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!flags.has_organization) navigate('/تسجيل-منظمة', { replace: true });
  }, []);

  if (flags.organization_status === 'pending')
    return <div className="flex h-[50vh] items-center justify-center text-4xl">المنظمة تحت المراجعة</div>;

  if (flags.has_organization) return <Outlet />;
}
