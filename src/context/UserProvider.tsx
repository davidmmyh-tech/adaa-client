import { TEMP_FLAGS } from '@/constants/data';
import useCurrentUserQuery from '@/hooks/queries/useCurrentUserQuery';
import type { Flags, Organization, User } from '@/schemas/types';
import { createContext, useContext, useState, type Dispatch } from 'react';
import { toast } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

type ContextProvidedValues = {
  user: User | null;
  flags: Flags;
  organization: Organization | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  setFlags: Dispatch<React.SetStateAction<Flags>>;
  setOrganization: Dispatch<React.SetStateAction<Organization | null>>;
  isLoading: boolean;
};

const userContext = createContext<ContextProvidedValues | undefined>(undefined);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [flags, setFlags] = useState<Flags>(TEMP_FLAGS);
  const [organization, setOrganization] = useState<Organization | null>(null);

  const verifyQuery = useCurrentUserQuery({
    onSuccess: (user, organization, flags) => {
      setUser(user);
      setOrganization(organization);
      setFlags(flags || TEMP_FLAGS);
    },
    onError: (err) => {
      if (err.response?.status === 401 && user) {
        toast.error('انتهت جلسة تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى.');
        setUser(null);
        setFlags(TEMP_FLAGS);
        setOrganization(null);
      }
    }
  });
  const isLoading = verifyQuery.isPending && !user;

  return (
    <userContext.Provider value={{ user, setUser, flags, setFlags, organization, setOrganization, isLoading }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(userContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
