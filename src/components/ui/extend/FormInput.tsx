import type { InputHTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { Input } from '../input';
import ErrorMessage from './error-message';
import { cn } from '@/lib/utils';
import { Label } from '../label';

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
  label?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, className, error, id, ...props }, ref: ForwardedRef<HTMLInputElement>) => (
    <div className="w-full">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        ref={ref}
        className={cn(error ? 'border-destructive' : 'border-slate-300', className)}
        {...props}
      />
      <ErrorMessage error={error} />
    </div>
  )
);

FormInput.displayName = 'FormInput';

export default FormInput;
