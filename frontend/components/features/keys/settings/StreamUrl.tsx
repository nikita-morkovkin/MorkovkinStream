import { Input } from '@/components/ui/common/Input';
import CardContainer from '@/components/ui/elements/CardContainer';
import CopyButton from '@/components/ui/elements/CopyButton';
import { useTranslations } from 'next-intl';

interface StreamUrlProps {
  value: string | null;
}

const StreamUrl = ({ value }: StreamUrlProps) => {
  const t = useTranslations('dashboard.keys.url');

  return (
    <CardContainer
      isRightContentFull={true}
      heading={t('heading')}
      rightContent={
        <div className='flex w-full items-center gap-x-4'>
          <Input placeholder={t('heading')} value={value ?? ''} disabled />
          <CopyButton value={value} />
        </div>
      }
    ></CardContainer>
  );
};

export default StreamUrl;
