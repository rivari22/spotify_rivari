import { HiOutlineShieldCheck } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';
import { ViewGridIcon } from '@heroicons/react/solid';
import Dropdown from "./Dropdown";
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PlaylistBar from './PlaylistBar';
import { spotifyAPI } from '../utils';
import { useRecoilState } from 'recoil';
import { playlistTrack } from '../atoms/playerAtom';

const RightSection = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [playlist, setPlaylist] = useRecoilState(playlistTrack);

  useEffect(() => {
    if (!accessToken) return;

    const getPlaylist = async () => {
      const res = await spotifyAPI.getUserPlaylists();
      const playlistMap = res.body.items.map((track) => {
        return {
          id: track.id,
          title: track.name,
          description: track.description,
          image: track.images[0]?.url,
          totalTracks: track.tracks.total,
          uri: track.uri
        };
      });
      setPlaylist(playlistMap);
    };
    getPlaylist();
  }, [accessToken]);

  return (
    <section className="p-4 space-y-11 pr-8 mt-[2px]">
      <div className="flex space-x-2 items-center justify-between">
        <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-14 py-3 px-4">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
        <Dropdown />
      </div>

      <div className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm">Playlist</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[250px] md:h-[400px] scrollbar-hide">
          {playlist?.map((track, index) => (
            <PlaylistBar key={index} track={track} />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
          View All
        </button>
      </div>
    </section>
  );
};

export default RightSection;
