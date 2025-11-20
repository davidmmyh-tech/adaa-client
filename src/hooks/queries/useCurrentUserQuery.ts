import { getToken } from '@/lib/storage';
import type { Flags, Organization, User } from '@/schemas/types';
import { currentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (user: User, organization: Organization, flags: Flags) => void;
};

export default function useCurrentUserQuery({ onSuccess }: Props) {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () =>
      currentUser()
        .then((res) => {
          onSuccess?.(res.data.user, res.data.organization, res.data.flags);
          return res.data.user;
        })
        .catch(() => null),

    retry: false,
    retryOnMount: false,
    enabled: !!getToken(),
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
}
