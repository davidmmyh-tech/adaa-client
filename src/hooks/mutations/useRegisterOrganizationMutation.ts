import { useUserState } from '@/context/UserProvider';
import type { Organization } from '@/schemas/types';
import type { RegisterOrganizationForm } from '@/schemas/validation';
import { registerOrganization } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';
import { useNavigate } from 'react-router';

type Props = {
  onSuccess?: (data: Organization) => void;
  onError?: (error: AxiosError) => void;
};

export default function useRegisterOrganizationMutation({ onSuccess, onError }: Props) {
  const navigate = useNavigate();
  const { setFlags } = useUserState();
  return useMutation({
    mutationKey: ['register-organization'],
    mutationFn: (form: RegisterOrganizationForm) => registerOrganization(form),
    onSuccess: (data) => {
      onSuccess?.(data.data.organization);
      setFlags((flags) => ({ ...flags, has_organization: true, organization_status: 'pending' }));
      navigate('/درع-اداء');
      // toast.success('تم ارسال طلبك بنجاح، سوف يتم مراجعة طلبك قريبا');
    },
    onError: (error) => {
      if (isAxiosError(error)) onError?.(error);
    }
  });
}
