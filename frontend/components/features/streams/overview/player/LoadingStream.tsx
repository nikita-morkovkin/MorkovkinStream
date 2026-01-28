import { Card } from '@/components/ui/common/Card';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

const LoadingStream = () => {
  const t = useTranslations('stream.video');

  return (
    <Card className='relative h-full flex flex-col items-center justify-center'>
      <Loader className='size-12 animate-spin text-muted-foreground' />
      <p className='mt-3 text-lg text-muted-foreground'>{t('loading')}</p>
    </Card>
  );
};

export default LoadingStream;
