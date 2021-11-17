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
    <SpotifyPlayer
      styles={{
        activeColor: '#fff',
        bgColor: '#181818',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        height: '70px',
        sliderTrackColor: '#535353',
        sliderTrackBorderRadius: '4px',
        sliderHandleColor: '#fff',
        errorColor: '#fff'
      }}
      token={accessToken}
      uris={[playingTrack.uri]}
      play={play}
      showSaveIcon
      magnifySliderOnHover={true}
      callback={(state) => {
        setPlay(state.isPlaying);
      }}
    />
  );
};

export default MediaPlayer;
