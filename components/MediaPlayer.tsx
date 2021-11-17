import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

interface IMediaPlayerProps {
  accessToken: any;
  trackUri: string;
}

const MediaPlayer = ({ accessToken, trackUri }: IMediaPlayerProps) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  useEffect(() => {
    if (!accessToken) return;
    if (trackUri) setPlay(true);
  }, [trackUri]);

  return <div className="border-2 bg-white h-[80px]"></div>;
};

export default MediaPlayer;
