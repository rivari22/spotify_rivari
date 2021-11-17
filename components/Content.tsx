import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { spotifyAPI } from '../utils';
import CardTrack from './CardTrack';
import SearchBar from './SearchBar';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<ITrack>>([]);
  const [newReleases, setNewReleases] = useState<Array<ITrack>>([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyAPI.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (!searchValue) return setSearchResults([]);

    const searchTracks = async () => {
      try {
        const res = await spotifyAPI.searchTracks(searchValue, { limit: 4 });

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
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <SearchBar value={searchValue} handleChange={(e) => setSearchValue(e.target.value)} />
      {/* FIXME RESPONSIVE COLS MOBILE */}
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-x-4 gap-y-8 p-4">
        {searchResults.length === 0
          ? newReleases.slice(1, 5).map((track, index) => <CardTrack track={track} key={index} />)
          : searchResults.map((track, index) => <CardTrack track={track} key={index} />)}
      </div>
    </section>
  );
};

export default Content;
