import type { Id } from '@/schemas/types';

/**
 * Base route path segments (without leading slash)
 * These are the single source of truth for all route definitions
 */
const PATH_SEGMENTS = {
  HOME: '',
  ADAA_SHIELD: 'درع-اداء',
  CERTIFICATES: 'شهادات-اداء',
  PODCAST: 'كرسي-اداء',
  TOOLS: 'ادوات-اداء',
  RELEASES: 'اصدارات-اداء',
  BLOG: 'مدونة-اداء',
  CONTACT: 'اتصل-بنا',
  ADAA_PLUS: 'اشتراك-اداء-المميز',
  ORGANIZATIONS: 'المنظمات',
  ASSESSMENT: 'تقييم',
  AUTH: {
    LOGIN: 'تسجيل-دخول',
    REGISTER: 'حساب-جديد',
    REGISTER_ORGANIZATION: 'تسجيل-منظمة',
    FORGOT_PASSWORD: 'نسيت-كلمة-المرور',
    RESET_PASSWORD: 'reset-password',
    VERIFIED: 'verified',
    VERIFY_EMAIL: 'تحقق-من-البريد-الالكتروني'
  }
} as const;

/**
 * Absolute route paths for navigation (Link, navigate, etc.)
 * Automatically generated from PATH_SEGMENTS
 */
export const ROUTES = {
  HOME: '/',

  ADAA_SHIELD: {
    INDEX: `/${PATH_SEGMENTS.ADAA_SHIELD}`,
    ORGANIZATIONS: `/${PATH_SEGMENTS.ADAA_SHIELD}/${PATH_SEGMENTS.ORGANIZATIONS}`,
    ASSESSMENT: `/${PATH_SEGMENTS.ADAA_SHIELD}/${PATH_SEGMENTS.ASSESSMENT}`
  },

  CERTIFICATES: {
    INDEX: `/${PATH_SEGMENTS.CERTIFICATES}`,
    ORGANIZATIONS: `/${PATH_SEGMENTS.CERTIFICATES}/${PATH_SEGMENTS.ORGANIZATIONS}`,
    ASSESSMENT: `/${PATH_SEGMENTS.CERTIFICATES}/${PATH_SEGMENTS.ASSESSMENT}`
  },

  PODCAST: {
    INDEX: `/${PATH_SEGMENTS.PODCAST}`,
    DETAILS: (id: Id) => `/${PATH_SEGMENTS.PODCAST}/${id}`
  },

  TOOLS: `/${PATH_SEGMENTS.TOOLS}`,
  RELEASES: `/${PATH_SEGMENTS.RELEASES}`,

  BLOG: {
    INDEX: `/${PATH_SEGMENTS.BLOG}`,
    DETAILS: (id: Id) => `/${PATH_SEGMENTS.BLOG}/${id}`
  },

  CONTACT: `/${PATH_SEGMENTS.CONTACT}`,
  ADAA_PLUS: `/${PATH_SEGMENTS.ADAA_PLUS}`,

  AUTH: {
    LOGIN: `/${PATH_SEGMENTS.AUTH.LOGIN}`,
    REGISTER: `/${PATH_SEGMENTS.AUTH.REGISTER}`,
    REGISTER_ORGANIZATION: `/${PATH_SEGMENTS.AUTH.REGISTER_ORGANIZATION}`,
    FORGOT_PASSWORD: `/${PATH_SEGMENTS.AUTH.FORGOT_PASSWORD}`,
    RESET_PASSWORD: `/${PATH_SEGMENTS.AUTH.RESET_PASSWORD}`,
    VERIFIED: `/${PATH_SEGMENTS.AUTH.VERIFIED}`,
    VERIFY_EMAIL: `/${PATH_SEGMENTS.AUTH.VERIFY_EMAIL}`
  }
} as const;

/**
 * Relative route paths for React Router definitions (createBrowserRouter)
 * Exported directly from PATH_SEGMENTS
 */
export const ROUTE_PATHS = PATH_SEGMENTS;

/**
 * Check if current path matches a route
 * @example isActiveRoute(location.pathname, ROUTES.HOME)
 */
export function isActiveRoute(currentPath: string, targetPath: string): boolean {
  if (targetPath === '/' && currentPath === '/') return true;
  return targetPath !== '/' && decodeURIComponent(currentPath) === targetPath;
}
