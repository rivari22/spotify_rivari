import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { addTrackToPlaylist, playlistTrack } from '../atoms/playerAtom';
import { spotifyAPI } from '../utils';
import CardTrack from './CardTrack';
import ModalPlaylist from './ModalPlaylist';
import SearchBar from './SearchBar';
import TrackList from './TrackList';
import { ToastContainer, toast } from 'react-toastify';

interface IContentProps {}

export interface ITrack {
  id: string;
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
  popularity?: number;
}

const Content = (props: IContentProps) => {
  const {
    data: { accessToken }
  } = useSession();
  const [playlist, setPlaylist] = useRecoilState(playlistTrack);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<ITrack>>([]);
  const [newReleases, setNewReleases] = useState<Array<ITrack>>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [addTrack, setAddTrack] = useRecoilState(addTrackToPlaylist);

  const getPlaylist = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (addTrack.idPlaylist && addTrack.idTrack) {
      spotifyAPI
        .addTracksToPlaylist(addTrack.idPlaylist, [addTrack.idTrack])
        .then((res) => {
          toast.success('Berhasil menambahkan lagu');
          getPlaylist();
        })
        .catch((err) =>
          toast.error(
            `${err.body.error.message}, yang anda masukan bukan lagu, coba search lalu tambahkan melalui kolom tracks`
          )
        )
        .finally(() => setIsModalVisible(false));
    }
  }, [addTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyAPI.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!searchValue) return setSearchResults([]);

    const searchTracks = async () => {
      try {
        const res = await spotifyAPI.searchTracks(searchValue);

        const valueTracks: Array<ITrack> = res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artists: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity
          };
        });
        setSearchResults(valueTracks);
      } catch (error) {}
    };
    searchTracks();
  }, [searchValue, accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const getNewReleases = async () => {
      try {
        const res = await spotifyAPI.getNewReleases();
        const valueTracks: Array<ITrack> = res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            popularity: track.popularity
          };
        });
        setNewReleases(valueTracks);
      } catch (error) {}
    };
    getNewReleases();
  }, [accessToken]);

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5 xl:w-[1150px]">
      <ToastContainer />
      <ModalPlaylist
        isVisible={isModalVisible}
        playlist={playlist}
        onPressClose={() => setIsModalVisible(false)}
      />
      <SearchBar value={searchValue} handleChange={(e) => setSearchValue(e.target.value)} />
      {/* FIXME RESPONSIVE COLS MOBILE */}
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases.slice(1, 5).map((track, index) => <CardTrack track={track} key={index} />)
          : searchResults
              .slice(0, 4)
              .map((track, index) => <CardTrack track={track} key={index} />)}
      </div>

      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Genres */}
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            <div className="genreCustom">Classic</div>
            <div className="genreCustom">House</div>
            <div className="genreCustom">Minimal</div>
            <div className="genreCustom">Hip-hop</div>
            <div className="genreCustom">Electronic</div>
            <div className="genreCustom">Chillout</div>
            <div className="genreCustom">Blues</div>
            <div className="genreCustom">Country</div>
            <div className="genreCustom">Techno</div>
            <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
              All Genres
            </button>
          </div>
        </div>

        {/* Tracks */}
        <div>
          <h2 className="text-white font-bold mb-3">
            {searchResults.length === 0 ? 'New Releases Album' : 'Tracks'}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {searchResults.length === 0
              ? newReleases.slice(4, newReleases.length).map((track, index) => (
                  <TrackList
                    key={index}
                    track={track}
                    handleAddTrack={(uri) => {
                      setIsModalVisible(true);
                      setAddTrack({ idTrack: uri, idPlaylist: '' });
                    }}
                  />
                ))
              : searchResults.map((track, index) => (
                  <TrackList
                    key={index}
                    track={track}
                    handleAddTrack={(uri) => {
                      setIsModalVisible(true);
                      setAddTrack({ idTrack: uri, idPlaylist: '' });
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
