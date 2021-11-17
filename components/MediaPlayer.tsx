import React, { useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

interface IMediaPlayerProps {
  accessToken: any;
}

const MediaPlayer = ({ accessToken }: IMediaPlayerProps) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    if (!accessToken) return;
    if (playingTrack.uri) {
      setPlay(true);
    }
  }, [playingTrack]);

  return (
    <div className="border-2 bg-white h-[80px]">
      <SpotifyPlayer
        token={accessToken}
        uris={[playingTrack.uri]}
        play={play}
        showSaveIcon
        callback={(state) => {
          setPlay(state.isPlaying);
        }}
      />
      ;
    </div>
  );
};

export default MediaPlayer;
