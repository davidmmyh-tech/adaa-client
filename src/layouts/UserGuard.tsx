import { useUserState } from '@/context/UserProvider';
import api from '@/services/api';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function UserGuard() {
  const { user } = useUserState();
  const navigate = useNavigate();

  useEffect(() => {
    let globalAuthErrorInterceptor: number;
    if (!user) {
      navigate('/تسجيل-دخول', { replace: true });
      return;
    }

    const initFn = () => {
      globalAuthErrorInterceptor = api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            navigate('/تسجيل-دخول', { replace: true });
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
