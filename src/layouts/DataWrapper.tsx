import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import { cn } from '@/lib/utils';
import { BadgeX, Brackets } from 'lucide-react';
import { useEffect, useState } from 'react';

type Variant = 'light' | 'default';
type Props = {
  isError?: boolean;
  isEmpty?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  LoadingFallback?: React.ComponentType;
  retry?: () => void;
  variant?: Variant;
};

function ErrorFetchingResource({
  retry,
  isRetrying,
  variant
}: {
  retry: () => void;
  isRetrying: boolean;
  variant: Variant;
}) {
  return (
    <div
      className={cn(
        'text-muted flex h-96 flex-col items-center justify-center gap-4 text-center text-4xl font-bold',
        variant === 'light' && 'text-primary-foreground'
      )}
    >
      <BadgeX size={120} className={`stroke-primary ${variant === 'light' ? 'stroke-primary-foreground' : ''}`} />
      <span>خطاء في الحصول علي المحتوي !</span>
      <SubmitButton
        isLoading={isRetrying}
        className="mt-4 block font-medium"
        variant={variant === 'light' ? 'secondary' : 'default'}
        onClick={retry}
      >
        إعادة المحاولة
      </SubmitButton>
    </div>
  );
}

function NoResourceAvilable({
  retry,
  isRetrying,
  variant
}: {
  retry: () => void;
  isRetrying: boolean;
  variant: Variant;
}) {
  return (
    <div
      className={cn(
        'text-muted flex h-96 flex-col items-center justify-center gap-8 text-center text-4xl font-bold',
        variant === 'light' && 'text-primary-foreground'
      )}
    >
      <Brackets size={80} className={`stroke-primary ${variant === 'light' ? 'stroke-primary-foreground' : ''}`} />
      <p>لا يوجد محتوي متاح للعرض</p>
      <SubmitButton
        isLoading={isRetrying}
        className="block font-medium"
        variant={variant === 'light' ? 'secondary' : 'default'}
        onClick={retry}
      >
        إعادة المحاولة
      </SubmitButton>
    </div>
  );
}

function DefaultLoading({ theme }: { theme?: Variant }) {
  return (
    <div className="flex h-96 items-center justify-center">
      <Logo isLoading className="h-24 w-24" variant={theme} />
    </div>
  );
}

export default function DataWrapper({
  children,
  isError,
  isLoading,
  LoadingFallback = DefaultLoading,
  retry,
  isEmpty,
  variant = 'default'
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<boolean | undefined>(isError);
  const [empty, setEmpty] = useState<boolean | undefined>(isEmpty);

  useEffect(() => {
    if (!isLoading && !isMounted) setIsMounted(true);

    if (isError) setError(true);
    if (!isLoading && !isError) setError(false);

    if (isEmpty && !isError && !isLoading) setEmpty(true);
    if (!isEmpty) setEmpty(false);
  }, [isEmpty, isError, isLoading]);

  if (!isMounted && isLoading)
    return LoadingFallback === DefaultLoading ? <DefaultLoading theme={variant} /> : <LoadingFallback />;
  if (error) return <ErrorFetchingResource retry={() => retry?.()} isRetrying={!!isLoading} variant={variant} />;
  if (empty) return <NoResourceAvilable retry={() => retry?.()} isRetrying={!!isLoading} variant={variant} />;
  return children;
}
