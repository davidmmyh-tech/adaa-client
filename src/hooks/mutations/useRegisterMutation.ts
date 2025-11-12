import { setSessionEmail } from '@/lib/storage';
import type { RegisterForm } from '@/schemas/validation';
import { register } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export default function useRegisterMutation({
  onSuccess,
  onError
}: {
  onSuccess?: (data: unknown) => void;
  onError?: (error: AxiosError) => void;
}) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (form: RegisterForm) => register(form),
    onSuccess: (data) => {
      onSuccess?.(data.data);
      setSessionEmail(data.data.user.email);
      navigate(`/تسجيل-دخول`);
    },
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
