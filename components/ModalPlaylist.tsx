import React from 'react';
import PlaylistBar from './PlaylistBar';
import { AiFillCloseCircle } from 'react-icons/ai';

// TODO GIVE playlist PROPS
interface Props {
  playlist: any;
  isVisible: boolean;
  onPressClose: () => void;
}

const ModalPlaylist = (props: Props) => {
  return (
    <div
      className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 fixed z-40 sm:left-[30%] lg:left-[40%] top-[10%]"
      style={{ display: props.isVisible ? 'block' : 'none' }}>
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold text-sm">Playlist</h4>
        <AiFillCloseCircle className="text-[#686868] h-6 cursor-pointer" onClick={props.onPressClose} />
      </div>

      <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[450px] md:h-[500px] w-[300px] scrollbar-hide">
        {props.playlist?.map((track, index) => (
          <PlaylistBar key={index} track={track} isAddTrackPlaylist />
        ))}
      </div>
      <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
        View All
      </button>
    </div>
  );
};

export default ModalPlaylist;
