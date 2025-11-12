import { useUserState } from '@/context/UserProvider';
import { setToken } from '@/lib/storage';
import type { User } from '@/schemas/types';
import type { LoginForm } from '@/schemas/validation';
import { loginUser } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';
import { useNavigate } from 'react-router';

type Props = {
  onSuccess?: (data: User) => void;
  onError?: (error: AxiosError) => void;
};

export default function useLoginMutation({ onSuccess, onError }: Props) {
  const { setUser } = useUserState();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (form: LoginForm) => loginUser(form),
    onSuccess: async (data) => {
      setToken(data.data.token);
      setUser(data.data.user);
      onSuccess?.(data.data.user);
      navigate('/');
    },
    onError: (err) => {
      if (isAxiosError(err)) onError?.(err);
    }
  });
}
