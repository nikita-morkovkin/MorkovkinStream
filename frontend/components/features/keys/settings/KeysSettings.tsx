'use client';

import Heading from '@/components/ui/elements/Heading';
import ToggleCardSkeleton from '@/components/ui/skeletons/ToggleCardSkeleton';
import { useCurrentProfile } from '@/shared/hooks/useCurrentProfile';
import { useTranslations } from 'next-intl';
import CreateIngressForm from './forms/CreateIngressForm';
import InstructionModal from './InstructionModal';
import StreamKey from './StreamKey';
import StreamUrl from './StreamUrl';

const KeysSettings = () => {
  const t = useTranslations('dashboard.keys.header');

  const { user, isLoadingProfile } = useCurrentProfile();

  return (
    <div className='lg:px-10'>
      <div className='flex items-center justify-between'>
        <div className='block items-center justify-between space-y-3 lg:flex lg:space-y-0'>
          <Heading
            title={t('heading')}
            description={t('description')}
            size={'large'}
          />
        </div>
        <div className='flex items-center gap-x-4'>
          <InstructionModal />
          <CreateIngressForm />
        </div>
      </div>
      <div className='mt-7 space-y-6'>
        {isLoadingProfile ? (
          Array.from({ length: 2 }).map((_, index) => (
            <ToggleCardSkeleton key={index} />
          ))
        ) : (
          <>
            <StreamUrl value={user?.stream?.serverUrl ?? ''} />
            <StreamKey value={user?.stream?.streamKey ?? ''} />
          </>
        )}
      </div>
    </div>
  );
};

export default KeysSettings;
