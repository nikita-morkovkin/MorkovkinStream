'use client';

import { Button } from '@/components/ui/common/Button';
import Hint from '@/components/ui/elements/Hint';
import { Maximize, Minimize } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FullScreenProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

const FullScreenControl = ({ isFullScreen, onToggle }: FullScreenProps) => {
  const t = useTranslations('stream.video.player.fullscreen');

  const Icon = isFullScreen ? Minimize : Maximize;

  return (
    <div className='flex items-center justify-center gap-4'>
      <Hint label={isFullScreen ? t('exit') : t('open')} asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={onToggle}
          className='text-white hover:text-white/10'
        >
          <Icon className='size-6' />
        </Button>
      </Hint>
    </div>
  );
};

export default FullScreenControl;
