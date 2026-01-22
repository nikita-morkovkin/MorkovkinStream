'use client';

import { Button } from '@/components/ui/common/Button';
import Hint from '@/components/ui/elements/Hint';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const SidebarHeader = () => {
  const t = useTranslations('sidebarHeader');
  const { isOpen, open, close } = useSidebar();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const openWithMessage = () => {
    if (isMobile) {
      toast.error(t('errorMessage'));
    }

    open();
  };

  const label = isOpen ? t('collapse') : t('expand');

  return isOpen ? (
    <div className='mb-2 flex w-full items-center justify-between p-3 pl-4'>
      <h2 className='text-lg font-semibold text-foreground'>
        {t('navigation')}
      </h2>
      <Hint label={label} side='right' asChild>
        <Button onClick={close} variant={'ghost'} size={'icon'}>
          <ArrowLeftFromLine className='size-4' />
        </Button>
      </Hint>
    </div>
  ) : (
    <div className='mb-2 w-full items-center justify-center p-3 lg:flex'>
      <Hint label={label} side='right' asChild>
        <Button onClick={openWithMessage} variant={'ghost'} size={'icon'}>
          <ArrowRightFromLine className='size-4' />
        </Button>
      </Hint>
    </div>
  );
};

export default SidebarHeader;
