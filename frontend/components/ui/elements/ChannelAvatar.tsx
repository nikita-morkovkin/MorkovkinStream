import { FindCurrentProfileQuery } from '@/graphql/gql/graphql';
import { getMediaSource } from '@/shared/utils/get-media-source.util';
import { cn } from '@/shared/utils/tw-merge.util';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '../common/Avatar';

const avatarSizes = cva('', {
  variants: {
    size: {
      sm: 'size-7',
      default: 'size-9',
      large: 'size-14',
      xl: 'size-32',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarSizes> {
  channel: Pick<
    FindCurrentProfileQuery['findCurrentProfile'],
    'username' | 'avatar'
  >;
  isLive?: boolean;
}

const ChannelAvatar = ({
  channel,
  size,
  isLive = false,
}: ChannelAvatarProps) => {
  return (
    <div className='relative'>
      <Avatar
        className={cn(avatarSizes({ size }), isLive && 'ring-2 ring-rose-500')}
      >
        <AvatarImage
          src={getMediaSource(channel.avatar)}
          className='object-cover'
        />
        <AvatarFallback
          className={cn(
            'flex items-center justify-center',
            size === 'xl' && 'text-5xl',
          )}
        >
          <p
            className={cn(
              'font-semibold mb-1',
              size === 'xl' && 'mb-2',
              size === 'sm' && 'mb-0',
            )}
          >
            {channel.username?.[0]}
          </p>
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ChannelAvatar;
