import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, ScrollRestoration } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import UserProvider from '@/context/UserProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, //10 minutes
      gcTime: 1000 * 60 * 15, //15 minutes
      refetchOnWindowFocus: false,
      retry: 1
    },
    mutations: {
      onError: (error) => {
        if (isAxiosError(error)) return error;
        else toast.error('خطاء غير متوقع! ,حاول مرة اخرى');
      }
    }
  }
});

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ReactQueryDevtools />
        <ScrollRestoration />
        <ToastContainer position="bottom-left" theme="dark" />
        <Outlet />
      </UserProvider>
    </QueryClientProvider>
  );
}
