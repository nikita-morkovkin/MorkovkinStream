'use client';

import { type FindChannelByUsernameQuery } from '@/graphql/gql/graphql';
import { LIVEKIT_SERVER_URL } from '@/shared/constants/url.constants';
import { useStreamToken } from '@/shared/hooks/useStreamToken';
import { LiveKitRoom } from '@livekit/components-react';
interface StreamOverviewProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

const StreamOverview = ({ channel }: StreamOverviewProps) => {
  const { token, name, identity } = useStreamToken(channel.id);
  
  if (!token || !name || !identity) {
    <div>Loading...</div>
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={LIVEKIT_SERVER_URL}
      className='mx-auto grid max-w-screen-7xl gird-cols-1 gap-6 lg:grid-cols-7'
    >
      <div className='order-1 col-span flex flex-col lg:col-span-5'>Player</div>
      <div className='order-2 col-span-1 flex h-80 flex-col space-y-6 lg:col-span-2'>
        Span
      </div>
    </LiveKitRoom>
  );
};

export default StreamOverview;
