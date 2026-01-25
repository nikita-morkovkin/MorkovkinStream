'use client';

import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { cn } from '@/shared/utils/tw-merge.util';
import { type LucideIcon } from 'lucide-react';
import { type PropsWithChildren, type ReactNode } from 'react';
import { type IconType } from 'react-icons';
import { Card } from '../common/Card';

interface CardContainerProps {
  heading: string;
  description?: string;
  rightContent?: ReactNode;
  Icon?: IconType | LucideIcon;
  isRightContentFull?: boolean;
  isBetween?: boolean;
}

const CardContainer = ({
  heading,
  description,
  rightContent,
  Icon,
  children,
  isRightContentFull = false,
  isBetween = true,
}: PropsWithChildren<CardContainerProps>) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  return (
    <Card className='p-6'>
      <div
        className={cn(
          'flex items-center',
          isBetween ? 'justify-between' : 'justify-start gap-6',
        )}
      >
        {Icon && (
          <div className='rounded-full bg-foreground p-2.5'>
            <Icon className={'size-7 text-secondary'} />
          </div>
        )}
        <div className='space-y-1'>
          <h2 className='font-semibold tracking-wide'>{heading}</h2>
          <p
            className={cn(
              'text-sm text-muted-foreground',
              isMobile ? 'max-w-md' : 'max-w-xl',
            )}
          >
            {description}
          </p>
        </div>
        {rightContent && (
          <div className={cn(isRightContentFull && 'w-full ml-8')}>
            {rightContent}
          </div>
        )}
      </div>
      {children && <div className='mt-4'>{children}</div>}
    </Card>
  );
};

export default CardContainer;
