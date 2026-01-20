'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/tw-merge.util';
import { useEffect, type PropsWithChildren } from 'react';

const LayoutContainer = ({ children }: PropsWithChildren<unknown>) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { isOpen, close, open } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        close();
      }
    }
  }, [isMobile, isOpen, open, close]);

  return (
    <main
      className={cn('mt-[75px] flex-1 px-8 py-5', isOpen ? 'ml-64' : 'ml-16')}
    >
      {children}
    </main>
  );
};

export default LayoutContainer;
