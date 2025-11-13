import Logo from '@/components/ui/extend/Logo';
import { useUserState } from '@/context/UserProvider';
import { AnimatePresence, motion } from 'motion/react';
import { Outlet } from 'react-router';

export default function UserInitRequiredGuard() {
  const { isLoading } = useUserState();
  if (isLoading)
    return (
      <AnimatePresence>
        <motion.div
          key="userguard-loading"
          className="bg-background fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Logo isLoading className="h-56 w-56" />
          <p className="text-secondary text-3xl font-bold">جاري التاكد من الهوية . . . </p>
        </motion.div>
      </AnimatePresence>
    );

  return <Outlet />;
}
