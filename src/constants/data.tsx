import {
  bronzeIcon,
  diamondIcon,
  goldIcon,
  humanResourcesIcon,
  operationalIcon,
  silverIcon,
  stratigicIcon
} from '@/assets/icons';
import type { Flags } from '@/schemas/types';
import type { UserSummaryResponse } from '@/services/certificates/types';

export const authorities = ['مؤسس', 'مسؤول', 'داعم'];

// Generate years from 2020 to current year in Arabic format
const currentYear = new Date().getFullYear();
export const years = [
  { value: 'none', label: 'كل السنوات' },
  ...Array.from({ length: currentYear - 2020 + 1 }, (_, i) => {
    const year = 2020 + i;
    return {
      value: year.toString(),
      label: year.toLocaleString('ar-EG').replace('٬', '')
    };
  }).reverse()
];

export const grades = [
  { value: 'none', label: 'كل المستويات' },
  { value: 'excellent', label: 'ممتاز' },
  { value: 'very_good', label: 'جيد جداً' },
  { value: 'good', label: 'جيد' },
  { value: 'acceptable', label: 'مقبول' }
];

export const gradesMap: Record<string, string> = {
  excellent: 'ممتاز',
  very_good: 'جيد جداً',
  good: 'جيد',
  acceptable: 'مقبول',
  none: 'كل المستويات'
};

export const regions = [
  { value: 'none', label: 'كل المناطق' },
  { value: 'Riyadh', label: 'الرياض' },
  { value: 'Makkah', label: 'مكة المكرمة' },
  { value: 'Al Madinah', label: 'المدينة المنورة' },
  { value: 'Al Qassim', label: 'القصيم' },
  { value: 'Eastern Province', label: 'المنطقة الشرقية' },
  { value: 'Asir', label: 'عسير' },
  { value: 'Tabuk', label: 'تبوك' },
  { value: 'Hail', label: 'حائل' },
  { value: 'Northern Borders', label: 'الحدود الشمالية' },
  { value: 'Jazan', label: 'جازان' },
  { value: 'Najran', label: 'نجران' },
  { value: 'Al Bahah', label: 'الباحة' },
  { value: 'Al Jawf', label: 'الجوف' }
];

export const certificateClasses = {
  diamond: {
    id: 'diamond',
    title: 'شهادة أداء ماسية',
    name: 'شهادة ماسية',
    scoreRange: '86-100%',
    description: 'تهنئ الجمعية بتحقيق مستوى تميز مؤسسي عالي جدًا',
    icon: diamondIcon,
    bgColorClass: 'diamond-gradient'
  },
  gold: {
    id: 'gold',
    title: 'شهادة أداء ذهبية',
    name: 'شهادة ذهبية',
    scoreRange: '76-85%',
    description: 'تؤكد التميز في تطبيق الممارسات المؤسسية',
    icon: goldIcon,
    bgColorClass: 'gold-gradient'
  },
  silver: {
    id: 'silver',
    title: 'شهادة أداء فضية',
    name: 'شهادة فضية',
    scoreRange: '66-75%',
    description: 'تشير إلى جاهزية مؤسسية قوية وتطبيق جيد',
    icon: silverIcon,
    bgColorClass: 'silver-gradient'
  },
  bronze: {
    id: 'bronze',
    title: 'شهادة أداء برونزية',
    name: 'شهادة برونزية',
    scoreRange: '55-65%',
    description: 'تعكس الالتزام بالممارسات الأساسية للتحسين المستمر',
    icon: bronzeIcon,
    bgColorClass: 'bronze-gradient'
  }
};

export const certificateTracks = {
  operational: { label: 'الأداء التشغيلي', icon: operationalIcon },
  strategic: { label: 'الأداء الاستراتيجي', icon: stratigicIcon },
  hr: { label: 'الموارد البشرية', icon: humanResourcesIcon }
};

export const tempFlgs: Flags = {
  email_verified: true,
  has_organization: false,
  organization_status: null,
  can_access_features: false,
  has_active_subscription: false,
  completed_shield: false,
  completed_strategic_certificate: false,
  completed_hr_certificate: false,
  completed_operational_certificate: false,
  subscription_status: null
};

export const tempSummary: UserSummaryResponse = {
  success: true,
  data: {
    paths: {
      strategic: {
        name_ar: 'الأداء الاستراتيجي',
        name_en: 'Strategic Performance',
        status: 'لم يبدأ بعد',
        progress: {
          answered: 0,
          total: 5,
          percentage: 0
        },
        score: 0,
        completed: false,
        submitted: 0
      },
      operational: {
        name_ar: 'الأداء التشغيلي',
        name_en: 'Operational Performance',
        status: 'لم يبدأ بعد',
        progress: {
          answered: 0,
          total: 3,
          percentage: 0
        },
        score: 0,
        completed: false,
        submitted: 0
      },
      hr: {
        name_ar: 'الموارد البشرية',
        name_en: 'Human Resources',
        status: 'لم يبدأ بعد',
        progress: {
          answered: 0,
          total: 35,
          percentage: 0
        },
        score: 0,
        completed: false,
        submitted: 0
      }
    }
  }
};
