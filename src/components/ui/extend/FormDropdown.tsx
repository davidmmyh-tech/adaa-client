import { Label } from '../label';
import ErrorMessage from './error-message';
import Dropdown from './Dropdown';

type Props = {
  onChange: (value: string) => void;
  values:
    | string[]
    | {
        value: string;
        label: string;
      }[];
  label?: string;
  selectLabel?: string;
  error?: string | null;
};

export function FormDropdown({ onChange, values, label, error, selectLabel }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Dropdown values={values} selectLabel={selectLabel} onValueChange={onChange} />
      <ErrorMessage error={error} />
    </div>
  );
}
