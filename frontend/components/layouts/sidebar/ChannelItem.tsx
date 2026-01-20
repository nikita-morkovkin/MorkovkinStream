'use client';

import { Button } from '@/components/ui/common/Button';
import ChannelAvatar from '@/components/ui/elements/ChannelAvatar';
import ChannelVerified from '@/components/ui/elements/ChannelVerified';
import Hint from '@/components/ui/elements/Hint';
import LiveBadge from '@/components/ui/elements/LiveBadge';
import { FindRecommendedChannelsQuery } from '@/graphql/gql/graphql';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/utils/tw-merge.util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ChannelItemProps {
  channel: FindRecommendedChannelsQuery['findRecommendedChannels'][0];
}

const ChannelItem = ({ channel }: ChannelItemProps) => {
  const pathname = usePathname();
  const { isOpen } = useSidebar();

  const isActive = pathname === `/${channel.username}`;

  if (isOpen) {
    return (
      <Button
        asChild
        className={cn(
          'h-11 mt-2 w-full justify-start px-4',
          isActive && 'bg-accent',
        )}
        variant={'ghost'}
      >
        <Link
          href={`/${channel.username}`}
          className='flex w-full items-center'
        >
          <ChannelAvatar
            size={'sm'}
            channel={channel}
            isLive={channel.stream.isLive}
          />
          <h2 className='truncate pl-3 pb-1 pr-2'>{channel.username}</h2>
          {channel.isVerified && <ChannelVerified size={'sm'} />}
          {channel.stream.isLive && (
            <div className='absolute right-5'>
              <LiveBadge />
            </div>
          )}
        </Link>
      </Button>
    );
  }

  return (
    <Hint label={channel.username} side='right' asChild>
      <Button
        asChild
        className={cn(
          'h-11 w-full justify-center',
          isActive && 'bg-accent text-accent-foreground',
        )}
        variant={'ghost'}
      >
        <Link
          className='mt-3 flex w-full items-start'
          href={`/${channel.username}`}
        >
          <ChannelAvatar channel={channel} isLive={channel.stream.isLive} />
        </Link>
      </Button>
    </Hint>
  );
};

export default ChannelItem;
