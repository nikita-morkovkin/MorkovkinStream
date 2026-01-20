'use client';

import { Button } from '@/components/ui/common/Button';
import Hint from '@/components/ui/elements/Hint';
import { useSidebar } from '@/hooks/useSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SidebarHeader = () => {
  const t = useTranslations('sidebarHeader');
  const { isOpen, open, close } = useSidebar();

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
        <Button onClick={open} variant={'ghost'} size={'icon'}>
          <ArrowRightFromLine className='size-4' />
        </Button>
      </Hint>
    </div>
  );
};

export default SidebarHeader;
