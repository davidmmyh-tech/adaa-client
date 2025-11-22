import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { StrictMode, lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';

import ErrorPage from './pages/Error';
import MainLayout from './layouts/Main';
import UserGuard from './layouts/UserGuard';
import HomePage from './pages/Home';
import AppWrapper from './layouts/AppWrapper';
import UserInitRequiredGuard from './layouts/UserInitRequiredGuard';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ForgetPasswordPage from './pages/ForgetPassword';
import AdaaShieldPage from './pages/AdaaShield';
import AdaaShieldInformatics from './pages/AdaaShieldInformatics';
import CertificatesPage from './pages/Certificates';
import UserProvider from './context/UserProvider';
import CertificatesInformaticsPage from './pages/CertificatesInformatics';
import Podcast from './pages/Podcast';
import AdaaToolsPage from './pages/AdaaTools';
import BlogsPage from './pages/Blogs';
import ContactUsPage from './pages/ContactUs';
import Logo from './components/ui/extend/Logo';
import OrganizationGuard from './layouts/OrganizationGuard';
import ReleasesPage from './pages/Releases';
import { ROUTES, ROUTE_PATHS } from './routes';

const AdaaPlusPage = lazy(() => import('./pages/AdaaPlus'));
const AdaaShieldAssessmentPage = lazy(() => import('./pages/AdaaShieldAssessment'));
const CertificatesAssessmentPage = lazy(() => import('./pages/CertificatesAssessment'));
const RegisterOrganizationPage = lazy(() => import('./pages/RegisterOrganization'));
const BlogDetailsPage = lazy(() => import('./pages/BlogDetails'));
const PodcastDetailsPage = lazy(() => import('./pages/PodcastDetails'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePassword'));
const VerifiedEmailPage = lazy(() => import('./pages/VerifiedEmail'));
const VerifyYourMail = lazy(() => import('./pages/VerifyYourMail'));

function FallbackScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Logo isLoading className="h-28 w-28" />
    </div>
  );
}

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
                path: ROUTE_PATHS.HOME,
                element: <HomePage />
              },
              {
                path: ROUTE_PATHS.ADAA_SHIELD,
                children: [
                  { index: true, element: <AdaaShieldPage /> },
                  { path: ROUTE_PATHS.ORGANIZATIONS, element: <AdaaShieldInformatics /> }
                ]
              },
              {
                path: ROUTE_PATHS.CERTIFICATES,
                children: [
                  { index: true, element: <CertificatesPage /> },
                  { path: ROUTE_PATHS.ORGANIZATIONS, element: <CertificatesInformaticsPage /> }
                ]
              },
              {
                path: ROUTE_PATHS.PODCAST,
                children: [
                  { index: true, element: <Podcast /> },
                  {
                    path: ':id',
                    element: (
                      <Suspense fallback={<FallbackScreen />}>
                        <PodcastDetailsPage />
                      </Suspense>
                    )
                  }
                ]
              },
              {
                path: ROUTE_PATHS.TOOLS,
                children: [{ index: true, element: <AdaaToolsPage /> }]
              },
              {
                path: ROUTE_PATHS.RELEASES,
                children: [{ index: true, element: <ReleasesPage /> }]
              },
              {
                path: ROUTE_PATHS.BLOG,
                children: [
                  { index: true, element: <BlogsPage /> },
                  {
                    path: ':id',
                    element: (
                      <Suspense fallback={<FallbackScreen />}>
                        <BlogDetailsPage />
                      </Suspense>
                    )
                  }
                ]
              },
              {
                path: ROUTE_PATHS.CONTACT,
                element: <ContactUsPage />
              }
            ]
          },

          //Protected Routes **********************
          {
            element: <UserInitRequiredGuard />,
            children: [
              {
                element: <UserGuard />,
                children: [
                  {
                    errorElement: <ErrorPage />, //handle pages error so keep the layout visable (error Boundry)
                    children: [
                      {
                        element: <OrganizationGuard />,
                        children: [
                          {
                            path: ROUTES.ADAA_SHIELD.ASSESSMENT,
                            element: (
                              <Suspense fallback={<FallbackScreen />}>
                                <AdaaShieldAssessmentPage />
                              </Suspense>
                            )
                          },
                          {
                            path: ROUTES.CERTIFICATES.ASSESSMENT,
                            element: (
                              <Suspense fallback={<FallbackScreen />}>
                                <CertificatesAssessmentPage />
                              </Suspense>
                            )
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      //Protected Routes without layout **********************
      {
        element: <UserInitRequiredGuard />,
        children: [
          {
            element: <UserGuard />,
            children: [
              {
                element: <OrganizationGuard />,
                children: [
                  {
                    path: ROUTES.ADAA_PLUS,
                    element: (
                      <Suspense fallback={<FallbackScreen />}>
                        <AdaaPlusPage />
                      </Suspense>
                    )
                  }
                ]
              }
            ]
          }
        ]
      },

      //Auth Routes without layout **********************
      {
        path: ROUTE_PATHS.AUTH.LOGIN,
        element: <LoginPage />
      },
      {
        path: ROUTE_PATHS.AUTH.REGISTER,
        element: <RegisterPage />
      },
      {
        path: ROUTE_PATHS.AUTH.REGISTER_ORGANIZATION,
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <RegisterOrganizationPage />
          </Suspense>
        )
      },
      {
        path: ROUTE_PATHS.AUTH.FORGOT_PASSWORD,
        element: <ForgetPasswordPage />
      },
      {
        path: ROUTE_PATHS.AUTH.RESET_PASSWORD,
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <ChangePasswordPage />
          </Suspense>
        )
      },
      {
        path: ROUTE_PATHS.AUTH.VERIFIED,
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <VerifiedEmailPage />
          </Suspense>
        )
      },
      {
        path: ROUTE_PATHS.AUTH.VERIFY_EMAIL,
        element: (
          <Suspense fallback={<FallbackScreen />}>
            <VerifyYourMail />
          </Suspense>
        )
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
