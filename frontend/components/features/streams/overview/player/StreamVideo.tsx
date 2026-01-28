import { type FindChannelByUsernameQuery } from '@/graphql/gql/graphql';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { JSX } from 'react';
import LoadingStream from './LoadingStream';
import OfflineStream from './OfflineStream';
import StreamPlayer from './StreamPlayer';

interface StreamVideoProps {
  channel: FindChannelByUsernameQuery['findChannelByUsername'];
}

const StreamVideo = ({ channel }: StreamVideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(channel.id);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(track => track.participant.identity === channel.id);

  let content: JSX.Element;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineStream channel={channel} />;
  }

  if (!participant || tracks.length === 0) {
    content = <LoadingStream />;
  } else {
    content = <StreamPlayer participant={participant} />;
  }
  

  return (
    <div className='group relative mb-6 aspect-video rounded-lg'>{content}</div>
  );
};

export default StreamVideo;
