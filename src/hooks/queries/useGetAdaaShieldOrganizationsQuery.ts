import { getShieldOrganizations } from '@/services/shield';
import { useQuery } from '@tanstack/react-query';

type Props = {
  params: {
    query?: string;
    grade?: string;
    region?: string;
    year?: number;
    page?: number;
    limit?: number;
  };
};

export default function useGetAdaaShieldOrganizationsQuery({ params }: Props) {
  return useQuery({
    queryKey: ['adaa-shield-organizations', ...Object.values(params)],
    queryFn: () => getShieldOrganizations(params)
  });
}
