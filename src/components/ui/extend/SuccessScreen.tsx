import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import SubmitButton from '../submit-button';

export default function SuccessScreen({
  children,
  action,
  onExit
}: {
  children: React.ReactNode;
  action?: { name: string; fn: () => void };
  onExit?: () => void;
}) {
  useEffect(() => {
    if (onExit)
      setTimeout(() => {
        onExit?.();
      }, 2000);
  }, [onExit]);

  return (
    <div className="mx-auto flex h-[60vh] w-full max-w-2xl flex-col items-center justify-center space-y-10 px-4">
      <CheckCircle size={180} className="text-success drop-shadow-sm" />

      {children}

      {action && (
        <SubmitButton onClick={action.fn} className="mt-2 w-48 text-base">
          {action?.name}
        </SubmitButton>
      )}
    </div>
  );
}
