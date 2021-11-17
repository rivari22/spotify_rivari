import { useRecoilState } from 'recoil';
import {
  playingTrackState,
  playState,
  getDetailPlaylist,
  addTrackToPlaylist
} from '../atoms/playerAtom';
import { HiPlusCircle } from 'react-icons/hi';
import { ITrack } from './Content';

interface trackPlaylist extends ITrack {
  description: string;
  image: string;
  totalTracks: number;
}

interface ICardProps {
  track: trackPlaylist;
  key: number;
  isAddTrackPlaylist?: boolean;
}

const PlaylistBar = (props: ICardProps) => {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [_, setGetDetailPlaylists] = useRecoilState(getDetailPlaylist);
  const [addTrack, setAddTrack] = useRecoilState(addTrackToPlaylist);

  const handleClickPlay = () => {
    setPlay(false);
    setPlayingTrack(props.track);
    if (props.track.uri === playingTrack.uri) setPlay(!play);
  };

  const handleGetDetailPlaylist = () => {
    setGetDetailPlaylists({
      id: props.track.id,
      isGetDetailPlaylist: true
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src={props.track.image}
          className="rounded-full w-[52px] h-[52px] cursor-pointer"
          onClick={handleClickPlay}
        />
        <div onClick={handleGetDetailPlaylist}>
          <h4 className="text-white text-[13px] mb-0.5 font-semibold hover:underline cursor-pointer truncate max-w-[150px]">
            {props.track.title}
          </h4>
          <p className="text-xs text-[#686868] font-semibold cursor-pointer hover:underline">
            {props.track.totalTracks} songs
          </p>
        </div>
      </div>
      {props.isAddTrackPlaylist && (
        <div>
          <HiPlusCircle
            className="text-xl ml-3 iconCustom text-[#868686] cursor-pointer"
            onClick={() =>
              setAddTrack({
                ...addTrack,
                idPlaylist: props.track.id
              })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PlaylistBar;
