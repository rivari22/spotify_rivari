import React, { useState } from 'react';
import { ITrack } from './Content';
import { ImHeadphones } from 'react-icons/im';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { playingTrackState, playState } from '../atoms/playerAtom';

interface Props {
  track: ITrack;
  key: number;
}

const TrackList = (props: Props) => {
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const handleClickPlay = () => {
    setPlay(false);
    setPlayingTrack(props.track);
    if (props.track.uri === playingTrack.uri) setPlay(!play);
  };

  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <img src={props.track.albumUrl} alt="" className="rounded-xl h-12 w-12 object-cover mr-3" />
        <div>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {props.track.title}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
            {props.track.artist}
          </p>
        </div>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="text-white flex space-x-1 text-sm font-semibold">
          <ImHeadphones className="text-lg" />
          {/* FIXME POPULARITY */}
          <h4>{props.track.popularity}</h4>
        </div>
        <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <AiFillHeart
            className={`text-xl ml-3 iconCustom ${hasLiked ? 'text-[#1ed760]' : 'text-[#868686]'}`}
            // TODO POST TO LIKED SONG SPOTIFY
            onClick={() => setHasLiked(!hasLiked)}
          />
          {props.track.uri === playingTrack.uri && play ? (
            <div
              className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
              onClick={handleClickPlay}>
              <BsFillPauseFill className="text-white text-xl" />
            </div>
          ) : (
            <div
              className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
              onClick={handleClickPlay}>
              <BsFillPlayFill className="text-white text-xl ml-[1px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackList;
