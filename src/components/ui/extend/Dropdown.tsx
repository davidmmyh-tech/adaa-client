import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../select';
import type { SelectProps } from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';

type Props = SelectProps & {
  values:
    | string[]
    | {
        value: string;
        label: string;
      }[];
  selectLabel?: string;
  className?: string;
  variant?: keyof typeof variants;
};

const variants = {
  default: '',
  secondary: 'border-secondary border-2 font-semibold '
};

export default function Dropdown({ values, selectLabel, className, variant = 'default', ...props }: Props) {
  return (
    <Select {...props} dir="rtl">
      <SelectTrigger
        className={cn(`w-full justify-between bg-transparent py-6`, variants[variant], className)}
        style={{ color: variant === 'secondary' ? 'var(--secondary)' : undefined }}
      >
        <SelectValue placeholder={selectLabel} />
        <ChevronDown size={25} className="text-secondary order-3" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-muted">{selectLabel}</SelectLabel>
          {values.map((value) => (
            <SelectItem
              key={typeof value === 'string' ? value : value.value}
              value={typeof value === 'string' ? value : value.value}
              className="[&_svg]:stroke-primary text-primary"
            >
              {typeof value === 'string' ? value : value.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
