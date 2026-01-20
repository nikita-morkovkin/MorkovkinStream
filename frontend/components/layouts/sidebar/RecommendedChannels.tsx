'use client';

import { Separator } from '@/components/ui/common/Separator';
import { FindRecommendedChannelsDocument } from '@/graphql/gql/graphql';
import { useSidebar } from '@/hooks/useSidebar';
import { useQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import ChannelItem from './ChannelItem';

const RecommendedChannels = () => {
  const t = useTranslations('recommended');
  const { isOpen } = useSidebar();
  const { data, loading: isLoadingRecommended } = useQuery(
    FindRecommendedChannelsDocument,
  );

  const channels = data?.findRecommendedChannels || [];

  return (
    <div>
      <Separator className='mb-3' />
      {isOpen && (
        <h2 className='text-lg mb-2 px-2 font-semibold text-foreground'>
          {t('heading')}
        </h2>
      )}
      {isLoadingRecommended ? (
        <div></div>
      ) : (
        channels.map((channel, index) => (
          <ChannelItem key={index} channel={channel} />
        ))
      )}
    </div>
  );
};

export default RecommendedChannels;
