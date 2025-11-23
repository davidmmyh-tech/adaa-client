import { TEMP_FLAGS } from '@/constants/data';
import { useUserState } from '@/context/UserProvider';
import { setSessionEmail, setToken } from '@/lib/storage';
import { ROUTES } from '@/routes';
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
  const { setUser, setFlags, setOrganization } = useUserState();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (form: LoginForm) => loginUser(form),
    onSuccess: async (data) => {
      const flags = data.data.flags || TEMP_FLAGS;
      setToken(data.data.token);
      setUser(data.data.user);
      setFlags(flags);
      setOrganization(data.data.organization);
      onSuccess?.(data.data.user);

      if (flags.has_organization) navigate(ROUTES.HOME);
      else navigate(ROUTES.AUTH.REGISTER_ORGANIZATION);
    },
    onError: (err, { email }) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 403) {
          setSessionEmail(email);
          navigate(ROUTES.AUTH.VERIFY_EMAIL);
        }
        onError?.(err);
      }
    }
  });
}
