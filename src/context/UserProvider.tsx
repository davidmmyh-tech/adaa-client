import useCurrentUserQuery from '@/hooks/queries/useCurrentUserQuery';
import type { User } from '@/schemas/types';
import { createContext, useContext, useState, type Dispatch } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextProvidedValues = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
};

const userContext = createContext<ContextProvidedValues | undefined>(undefined);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const verifyQuery = useCurrentUserQuery({ onSuccess: setUser });
  const isLoading = verifyQuery.isFetching;

  return <userContext.Provider value={{ user, setUser, isLoading }}>{children}</userContext.Provider>;
}

export function useUserState() {
  const context = useContext(userContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
