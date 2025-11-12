import { getToken } from '@/lib/storage';
import type { User } from '@/schemas/types';
import { currentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';

type Props = {
  onSuccess?: (user: User) => void;
};

export default function useCurrentUserQuery({ onSuccess }: Props) {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () =>
      currentUser()
        .then((res) => {
          onSuccess?.({
            first_name: res.data.user.name,
            last_name: '',
            id: res.data.user.id,
            organization: res.data.user.organization
          });
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
