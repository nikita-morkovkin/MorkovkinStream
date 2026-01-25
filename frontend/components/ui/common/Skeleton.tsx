import { cn } from '@/shared/utils/tw-merge.util';
import { type ComponentProps } from 'react';

function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-lg', className)}
      {...props}
    />
  );
}

export { Skeleton };
