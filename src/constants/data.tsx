import {
  bronzeIcon,
  diamondIcon,
  goldIcon,
  humanResourcesIcon,
  operationalIcon,
  silverIcon,
  stratigicIcon
} from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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
    title: 'شهادة أداء ماسية',
    scoreRange: '86-100%',
    description: 'تهنئ الجمعية بتحقيق مستوى تميز مؤسسي عالي جدًا',
    icon: diamondIcon,
    bgColorClass: 'diamond-gradient'
  },
  gold: {
    title: 'شهادة أداء ذهبية',
    scoreRange: '76-85%',
    description: 'تؤكد التميز في تطبيق الممارسات المؤسسية',
    icon: goldIcon,
    bgColorClass: 'gold-gradient'
  },
  silver: {
    title: 'شهادة أداء فضية',
    scoreRange: '66-75%',
    description: 'تشير إلى جاهزية مؤسسية قوية وتطبيق جيد',
    icon: silverIcon,
    bgColorClass: 'silver-gradient'
  },
  bronse: {
    title: 'شهادة أداء برونزية',
    scoreRange: '55-65%',
    description: 'تعكس الالتزام بالممارسات الأساسية للتحسين المستمر',
    icon: bronzeIcon,
    bgColorClass: 'bronse-gradient'
  }
};

export const certificateTracks = {
  operational: { label: 'الأداء التشغيلي', icon: operationalIcon },
  strategic: { label: 'الأداء الاستراتيجي', icon: stratigicIcon },
  human_resources: { label: 'الموارد البشرية', icon: humanResourcesIcon }
};

export const states = {
  completed: {
    name: 'مكتمل',
    color: '#078C43',
    Button: (
      <Button>
        <Download />
        تحميل الشهادة
      </Button>
    )
  },
  in_review: { name: 'قيد المراجعة', color: '#9D9615', Button: <Button variant="outline">⏳ قيد التقييم</Button> },
  none: { name: 'لم يبدأ بعد', color: '#B01D1D', Button: <Button variant="secondary">ابدأ الآن</Button> }
};
