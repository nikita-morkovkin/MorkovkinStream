import { Button } from '@/components/ui/common/Button';
import { Input } from '@/components/ui/common/Input';
import CardContainer from '@/components/ui/elements/CardContainer';
import CopyButton from '@/components/ui/elements/CopyButton';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface StreamUrlProps {
  value: string | null;
}

const StreamKey = ({ value }: StreamUrlProps) => {
  const t = useTranslations('dashboard.keys.key');
  const [isShow, setIsShow] = useState<boolean>(false);

  const Icon = isShow ? Eye : EyeOff;

  return (
    <CardContainer
      isRightContentFull={true}
      heading={t('heading')}
      rightContent={
        <div className='flex w-full items-center gap-x-4'>
          <Input
            type={isShow ? 'text' : 'password'}
            placeholder={t('heading')}
            value={value ?? ''}
            disabled
          />
          <CopyButton value={value} />
          <Button
            variant={'ghost'}
            size={'lgIcon'}
            onClick={() => setIsShow(!isShow)}
          >
            <Icon className='size-5' />
          </Button>
        </div>
      }
    ></CardContainer>
  );
};

export default StreamKey;
