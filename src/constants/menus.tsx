import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/components/ui/icons';
import { ROUTES } from '@/routes';

type MenuItem = {
  name: string;
  to?: string;
  subMenu?: MenuItem[];
};

export const lgMenuItems: MenuItem[] = [
  {
    name: 'كرسي اداء',
    to: ROUTES.PODCAST.INDEX
  },
  {
    name: 'مدونة اداء',
    to: ROUTES.BLOG.INDEX
  },
  {
    name: 'الإصدارات',
    to: ROUTES.RELEASES
  },
  {
    name: 'اتصل بنا',
    to: ROUTES.CONTACT
  }
];

export const mdMenuItems: MenuItem[] = [
  {
    name: 'الصفحة الرئيسية',
    to: ROUTES.HOME
  },
  {
    name: 'ادوات اداء',
    to: ROUTES.TOOLS
  },
  {
    name: 'شهادة الاداء السنوي',
    subMenu: [
      {
        name: 'المنظمات الحاصلة على شهادة اداء',
        to: ROUTES.CERTIFICATES.ORGANIZATIONS
      },
      {
        name: 'كيفية الحصول على شهادة اداء',
        to: ROUTES.CERTIFICATES.INDEX
      }
    ]
  },
  {
    name: 'درع اداء الاستراتيجية',
    subMenu: [
      {
        name: 'المنظمات الحاصلة على درع اداء',
        to: ROUTES.ADAA_SHIELD.ORGANIZATIONS
      },
      {
        name: 'كيفية الحصول على درع اداء',
        to: ROUTES.ADAA_SHIELD.INDEX
      }
    ]
  }
];

export const socialsMenuItems = [
  {
    Icon: FacebookIcon,
    to: 'https://www.facebook.com/birthofdream'
  },
  {
    Icon: InstagramIcon,
    to: 'https://www.instagram.com/birthofdream'
  },
  {
    Icon: LinkedInIcon,
    to: 'https://www.linkedin.com/company/birthofdream'
  },
  {
    Icon: XIcon,
    to: 'https://www.x.com/birthofdream'
  }
];
