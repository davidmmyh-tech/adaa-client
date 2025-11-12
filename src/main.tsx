import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { StrictMode } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import ErrorPage from './pages/Error';
import MainLayout from './layouts/Main';
// import UserGuard from './layouts/UserGuard';
import HomePage from './pages/Home';
import AppWrapper from './layouts/AppWrapper';
import UserInitRequiredGuard from './layouts/UserInitRequiredGuard';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ForgetPasswordPage from './pages/ForgetPassword';
import ChangePasswordPage from './pages/ChangePassword';
import RegisterOrganizationPage from './pages/RegisterOrganization';
import AdaaShieldPage from './pages/AdaaShield';
import AdaaShieldAssessmentPage from './pages/AdaaShieldAssessment';
import AdaaShieldInformatics from './pages/AdaaShieldInformatics';
import VerifiedEmailPage from './pages/VerifiedEmail';
import VerifyYourMail from './pages/VerifyYourMail';
import CertificatesPage from './pages/Certificate';
import UserProvider from './context/UserProvider';

const router = createBrowserRouter([
  {
    //public routes **********************
    errorElement: <ErrorPage />, //if bug happend in the main layout (error Boundry)
    element: <AppWrapper />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            errorElement: <ErrorPage />, //handle pages error so keep the layout visable (error Boundry)
            children: [
              {
                path: '',
                element: <HomePage />
              },
              {
                path: 'درع-اداء',
                children: [
                  { index: true, element: <AdaaShieldPage /> },
                  { path: 'المنظمات', element: <AdaaShieldInformatics /> }
                ]
              },
              {
                path: 'شهادات-اداء',
                children: [{ index: true, element: <CertificatesPage /> }]
              }
            ]
          },

          //Protected Routes **********************
          {
            element: <UserInitRequiredGuard />,
            children: [
              {
                // element: <UserGuard />,
                children: [
                  {
                    errorElement: <ErrorPage />, //handle pages error so keep the layout visable (error Boundry)
                    children: [
                      {
                        path: 'درع-اداء',
                        children: [{ path: 'تقييم', element: <AdaaShieldAssessmentPage /> }]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      //Auth Routes **********************
      {
        path: 'تسجيل-دخول',
        element: <LoginPage />
      },
      {
        path: 'حساب-جديد',
        element: <RegisterPage />
      },
      {
        path: 'تسجيل-منظمة',
        element: <RegisterOrganizationPage />
      },
      {
        path: 'نسيت-كلمة-المرور',
        element: <ForgetPasswordPage />
      },
      {
        path: 'reset-password',
        element: <ChangePasswordPage />
      },
      {
        path: 'verified',
        element: <VerifiedEmailPage />
      },
      {
        path: 'تحقق-من-البريد-الالكتروني',
        element: <VerifyYourMail />
      }
    ]
  }
]);

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
