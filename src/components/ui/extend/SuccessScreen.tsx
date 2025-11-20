import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import SubmitButton from '../submit-button';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  action?: { name: string; fn: () => void };
  onExit?: () => void;
  className?: string;
};

export default function SuccessScreen({ children, action, onExit, className }: Props) {
  useEffect(() => {
    if (onExit)
      setTimeout(() => {
        onExit?.();
      }, 2000);
  }, [onExit]);

  return (
    <div
      className={cn(
        'mx-auto flex h-[60vh] w-full max-w-2xl flex-col items-center justify-center space-y-10 px-4',
        className
      )}
    >
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
