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
