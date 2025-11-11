import * as React from 'react';
import { cn } from '@/lib/utils';

export type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  onFileChange?: (file: File | null) => void;
};

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ children, className, id, onFileChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onFileChange?.(file);
      onChange?.(e);
    };

    return (
      <label htmlFor={id} className={cn('border-primary block cursor-pointer rounded-md border p-4', className)}>
        <input type="file" id={id} ref={ref} className="hidden" onChange={handleChange} {...props} />
        <div>{children}</div>
      </label>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };
