import React from 'react';
import { Input } from '../input';
import { SearchIcon } from '../icons';
import { cn } from '@/lib/utils';

type Props = {
  placeholder?: string;
} & React.HTMLAttributes<HTMLInputElement>;

export default function SearchBar({ className, ...props }: Props) {
  return (
    <div className={cn('relative basis-3/6', className)}>
      <SearchIcon className="absolute start-4 top-4" width={18} height={18} />
      <Input className="border-primary placeholder:text-primary border-2 ps-10 placeholder:font-semibold" {...props} />
    </div>
  );
}
