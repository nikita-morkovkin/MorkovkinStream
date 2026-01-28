import { AudioTrack, useTracks, VideoTrack } from '@livekit/components-react';
import { RemoteParticipant, Track } from 'livekit-client';
import { useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import FullScreenControl from './FullScreenControl';
import VolumeControl from './VolumeControl';

interface StreamParticipantProps {
  participant: RemoteParticipant;
}

const StreamPlayer = ({ participant }: StreamParticipantProps) => {
  const [volume, setVolume] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter(track => track.participant.identity === participant.identity);

  const videoTrack = tracks.find(track => track.source === Track.Source.Camera);
  const audioTrack = tracks.find(
    track => track.source === Track.Source.Microphone,
  );

  const toggleMuted = () => setIsMuted(!isMuted);
  const changeVolume = (value: number) => setVolume(value);

  const toggleFullScreen = () => {
    const playerElement = document.querySelector('[data-video-element]');
    if (!playerElement) return;

    if (isFullScreen) {
      document.exitFullscreen().catch(() => {});
    } else {
      playerElement.requestFullscreen().catch(() => {});
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;

    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener(
    'fullscreenchange' as keyof WindowEventMap,
    handleFullScreenChange,
  );

  return (
    <div className='relative flex h-full' data-video-element>
      {videoTrack && (
        <VideoTrack trackRef={videoTrack} className='h-full w-full' />
      )}
      <div className='absolute top-0 h-full opacity-0 hover:opacity-100'>
        <div className='absolute bottom-0 flex h-16 w-full items-center justify-between gap-x-4'>
          <VolumeControl
            onToggle={toggleMuted}
            onChange={changeVolume}
            value={volume}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
      {audioTrack && (
        <AudioTrack volume={volume} muted={isMuted} trackRef={audioTrack} />
      )}
    </div>
  );
};

export default StreamPlayer;
