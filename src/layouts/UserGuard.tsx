import { useUserState } from '@/context/UserProvider';
import api from '@/services/api';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function UserGuard() {
  const { user } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/تسجيل-دخول', { replace: true });
    }

    let globalAuthErrorInterceptor: number;
    const initFn = () => {
      globalAuthErrorInterceptor = api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            navigate('/تسجيل-دخول', { replace: true });
            toast.error('انتهت جلسة تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى.');
          }
          return Promise.reject(error);
        }
      );
    };

    const ejectFn = () => {
      api.interceptors.response.eject(globalAuthErrorInterceptor);
    };

    initFn();

    return () => {
      ejectFn();
    };
  }, []);

  if (user) return <Outlet />;
}
