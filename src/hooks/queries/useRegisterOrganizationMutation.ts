import type { Organization } from '@/schemas/types';
import type { RegisterOrganizationForm } from '@/schemas/validation';
import { registerOrganization } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

export default function useRegisterOrganizationMutation({
  onSuccess,
  onError
}: {
  onSuccess?: (data: Organization) => void;
  onError?: (error: AxiosError) => void;
}) {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register-organization'],
    mutationFn: (form: RegisterOrganizationForm) => registerOrganization(form),
    onSuccess: (data) => {
      onSuccess?.(data.data.organization);
      navigate('/درع-اداء');
      // toast.success('تم ارسال طلبك بنجاح، سوف يتم مراجعة طلبك قريبا');
    },
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
