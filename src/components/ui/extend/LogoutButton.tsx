import { useMutation, useQueryClient } from '@tanstack/react-query';
import SubmitButton from '../submit-button';
import { logoutUser } from '@/services/auth';
import { useUserState } from '@/context/UserProvider';
import { TEMP_FLAGS } from '@/constants/data';
import { useNavigate } from 'react-router';
import { removeSessionEmail } from '@/lib/storage';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { user, setUser, setFlags, setOrganization } = useUserState();
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setUser(null);
      setOrganization(null);
      setFlags(TEMP_FLAGS);
      navigate('/login');
      removeSessionEmail();
      queryClient.clear();
    }
  });

  if (user)
    return (
      <SubmitButton className="h-10" onClick={() => logout()}>
        تسجيل خروج
      </SubmitButton>
    );
}
