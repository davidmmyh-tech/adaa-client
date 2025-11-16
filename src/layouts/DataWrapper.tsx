import Logo from '@/components/ui/extend/Logo';
import SubmitButton from '@/components/ui/submit-button';
import { BadgeX, Brackets } from 'lucide-react';

type Props = {
  isError?: boolean;
  isEmpty?: boolean | null;
  isPending?: boolean;
  isRefetching?: boolean;
  children: React.ReactNode;
  LoadingFallback?: React.ComponentType;
  retry?: () => void;
};

function ErrorFetchingResource({ retry, isRetrying }: { retry: () => void; isRetrying: boolean }) {
  return (
    <div className="text-muted flex h-96 flex-col items-center justify-center gap-4 text-center text-4xl font-bold">
      <BadgeX size={120} className="stroke-primary" />
      <span>خطاء في الحصول علي المحتوي !</span>
      <SubmitButton isLoading={isRetrying} className="mt-4 block font-medium" onClick={retry}>
        إعادة المحاولة
      </SubmitButton>
    </div>
  );
}

function NoResourceAvilable({ retry, isRetrying }: { retry: () => void; isRetrying: boolean }) {
  return (
    <div className="text-muted flex h-96 flex-col items-center justify-center gap-8 text-center text-4xl font-bold">
      <Brackets size={80} className="stroke-primary" />
      <p>لا يوجد محتوي للعرض</p>
      <SubmitButton isLoading={isRetrying} className="block font-medium" onClick={retry}>
        إعادة المحاولة
      </SubmitButton>
    </div>
  );
}

function DefaultLoading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <Logo isLoading className="h-24 w-24" />
    </div>
  );
}

export default function DataWrapper({
  children,
  isError,
  isPending,
  LoadingFallback = DefaultLoading,
  retry,
  isEmpty,
  isRefetching
}: Props) {
  if (isPending) return <LoadingFallback />;
  if (isError) return <ErrorFetchingResource retry={() => retry?.()} isRetrying={!!isRefetching} />;
  if (isEmpty) return <NoResourceAvilable retry={() => retry?.()} isRetrying={!!isRefetching} />;
  return children;
}
