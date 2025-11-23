import { useMutation } from '@tanstack/react-query';
import SubmitButton from '../submit-button';
import { logoutUser } from '@/services/auth';
import { useUserState } from '@/context/UserProvider';
import { TEMP_FLAGS } from '@/constants/data';

export default function LogoutButton() {
  const { setUser, setFlags, setOrganization } = useUserState();
  const { mutate: logout } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setUser(null);
      setOrganization(null);
      setFlags(TEMP_FLAGS);
    }
  });
  return (
    <SubmitButton className="h-10" onClick={() => logout()}>
      تسجيل خروج
    </SubmitButton>
  );
}
