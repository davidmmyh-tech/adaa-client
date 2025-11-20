import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/components/ui/icons';

type MenuItem = {
  name: string;
  to?: string;
  subMenu?: MenuItem[];
};

export const lgMenuItems: MenuItem[] = [
  {
    name: 'كرسي اداء',
    to: '/كرسي-اداء'
  },
  {
    name: 'مدونة اداء',
    to: '/مدونة-اداء'
  },
  {
    name: 'الإصدارات',
    to: '/اصدارات-اداء'
  },
  {
    name: 'اتصل بنا',
    to: '/اتصل-بنا'
  }
];

export const xlMenuItems: MenuItem[] = [];

export const xxlMenuItems: MenuItem[] = [];

export const mdMenuItems: MenuItem[] = [
  {
    name: 'الصفحة الرئيسية',
    to: '/'
  },
  {
    name: 'ادوات اداء',
    to: '/ادوات-اداء'
  },
  {
    name: 'شهادة الاداء السنوي',
    subMenu: [
      {
        name: 'المنظمات الحاصلة على شهادة اداء',
        to: '/شهادات-اداء/المنظمات'
      },
      {
        name: 'كيفية الحصول على شهادة اداء',
        to: '/شهادات-اداء'
      }
    ]
  },
  {
    name: 'درع اداء الاستراتيجية',
    subMenu: [
      {
        name: 'المنظمات الحاصلة على درع اداء',
        to: '/درع-اداء/المنظمات'
      },
      {
        name: 'كيفية الحصول على درع اداء',
        to: '/درع-اداء'
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
