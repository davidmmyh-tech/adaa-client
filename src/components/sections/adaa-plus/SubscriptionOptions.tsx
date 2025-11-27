import HSplit from '@/components/ui/h-split';
import { CrownIcon } from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const PAYMENT_PLANS = [
  {
    id: '1',
    title: 'اشتراك الشهري',
    price: '150',
    duration: 'شهريا'
  },
  {
    id: '2',
    title: 'اشتراك سنوي',
    price: '50',
    duration: 'شهريا'
  }
];

const BENEFITS = [
  'صلاحية كاملة نموذج قياس الأداء المؤسسي.',
  'صلاحية كاملة لتصميم لوحات الداشبورد لمنظمتك.',
  'صلاحية كاملة نماذج Power BI لقياس وتحليل الأداء.',
  'إرشادات استخدام الأدوات كاملة.'
];

type Props = {
  selected: string;
  onChange: (id: '1' | '2') => void;
};

export default function SubscriptionOptionsSection({ selected, onChange }: Props) {
  return (
    <div className="bg-primary flex h-full w-full flex-col gap-6 rounded-2xl p-4 py-8 sm:p-8">
      <div className="space-y-2 text-white">
        <h2 className="text-2xl font-semibold">خطط الأشتراك</h2>
      </div>

      <RadioGroup
        dir="rtl"
        value={selected}
        onValueChange={(value) => onChange(value as '1' | '2')}
        className="flex flex-col gap-4"
      >
        {PAYMENT_PLANS.map((planItem) => (
          <Label
            key={planItem.id.toString()}
            htmlFor={planItem.id.toString()}
            className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 bg-[#E8F3F5] px-8 py-2 transition-all ${
              selected === planItem.id ? 'border-[#B4A200] shadow-lg' : 'border-transparent'
            }`}
          >
            <RadioGroupItem
              value={planItem.id.toString()}
              id={planItem.id.toString()}
              className="h-5 w-5 shrink-0 text-white data-[state=checked]:border-[#B4A200] data-[state=checked]:bg-[#B4A200] [&_svg]:size-2 [&_svg]:fill-white"
            />
            <div className="flex w-full items-center justify-between">
              <div>
                <h3 className="font-semibold">{planItem.title}</h3>
                <span className="text-muted text-sm">
                  {planItem.price} ريال / {planItem.duration} / للعضو
                </span>
              </div>

              {planItem.id === '2' && (
                <div className="shrink-0 rounded-md bg-[#B4A200] px-4 py-1">
                  <span className="text-sm text-white">وفر 70%</span>
                </div>
              )}
            </div>
          </Label>
        ))}
      </RadioGroup>

      <HSplit className="border-t-2 border-t-white" />

      <div className="flex w-full justify-between text-white">
        <h3 className="text-xl font-semibold">المميزات</h3>
        <span>{`${PAYMENT_PLANS[parseInt(selected) - 1].price} ريال / ${PAYMENT_PLANS[parseInt(selected) - 1].duration}`}</span>
      </div>
      <ul className="space-y-6 font-semibold">
        {BENEFITS.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-white">
            <CrownIcon /> {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
