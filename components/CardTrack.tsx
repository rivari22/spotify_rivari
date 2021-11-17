import React from 'react';
import { ITrack } from './Content';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

interface ICardProps {
  track: ITrack;
  key: number;
}

const CardTrack = (props: ICardProps) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handleClickPlay = () => {
    setPlay(false);
    setPlayingTrack(props.track);
    if (props.track.uri === playingTrack.uri) setPlay(!play);
  };

  return (
    <div
      className="w-[250px] h-[350px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
      key={props.key}
      onClick={handleClickPlay}>
      <img
        src={props.track.albumUrl}
        alt="pict-card-track"
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
          {props.track.uri === playingTrack.uri && play ? (
            <BsFillPauseFill className="text-xl" />
          ) : (
            <BsFillPlayFill className="text-xl ml-[1px]" />
          )}
        </div>

        <div className="text-[15px]">
          <h4 className="font-extrabold truncate max-w-[180px]">{props.track.title}</h4>
          <h6 className="font-extrabold truncate max-w-[180px]">{props.track.artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default CardTrack;
