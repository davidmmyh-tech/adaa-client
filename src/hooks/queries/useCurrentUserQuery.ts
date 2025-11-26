import { getToken } from '@/lib/storage';
import type { Flags, Organization, User } from '@/schemas/types';
import { currentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError, type AxiosError } from 'axios';

type Props = {
  onSuccess?: (user: User, organization: Organization, flags: Flags) => void;
  onError?: (err: AxiosError) => void;
};

export default function useCurrentUserQuery({ onSuccess, onError }: Props) {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () =>
      currentUser()
        .then((res) => {
          onSuccess?.(res.data.user, res.data.organization, res.data.flags);
          return res.data.user;
        })
        .catch((err) => {
          if (isAxiosError(err)) onError?.(err);
        }),

    refetchInterval: 1000 * 60 * 15, // 15 minutes
    retry: false,
    retryOnMount: false,
    enabled: !!getToken(),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}
