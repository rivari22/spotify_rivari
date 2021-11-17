import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getDetailPlaylist } from '../atoms/playerAtom';
import { spotifyAPI } from '../utils';
import TrackList from './TrackList';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

const PlaylistDetail = () => {
  const { data: session } = useSession();
  const [getDetailPlaylists] = useRecoilState(getDetailPlaylist);
  const [dataDetailPlaylist, setDataDetailPlaylist] = useState({
    title: '',
    description: '',
    id: '',
    image: '',
    snapshotId: '',
    tracks: null
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [uriTrackRemove, setUriTrackRemove] = useState<string>('');

  const fetchDetailPlaylist = useCallback(async () => {
    const result = await spotifyAPI.getPlaylist(getDetailPlaylists.id);
    const mapDetailplaylist = result.body.tracks.items.map((item) => {
      return {
        id: item.track.id,
        artists: item.track.artists[0].name,
        title: item.track.name,
        uri: item.track.uri,
        albumUrl: item.track.album.images[0].url,
        popularity: item.track.popularity
      };
    });
    setDataDetailPlaylist({
      title: result.body.name,
      description: result.body.description,
      id: result.body.id,
      snapshotId: result.body.snapshot_id,
      image: result.body.images[0].url,
      tracks: mapDetailplaylist
    });
  }, [getDetailPlaylists.id]);

  const handleRemoveTrack = async () => {
    try {
      const res = await spotifyAPI.removeTracksFromPlaylist(
        dataDetailPlaylist.id,
        [{ uri: uriTrackRemove }],
        {
          snapshot_id: dataDetailPlaylist.snapshotId
        }
      );
      if (res.statusCode === 200) {
        fetchDetailPlaylist();
      }
    } catch (err) {
      toast.error(`${err.body.error.message}, gagal menghapus lagu`);
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!session.accessToken) return;
    spotifyAPI.setAccessToken(session.accessToken);
  }, [session.accessToken]);

  useEffect(() => {
    if (getDetailPlaylists.isGetDetailPlaylist) {
      fetchDetailPlaylist();
    }
  }, [getDetailPlaylists]);

  return (
    <div className="ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5 xl:w-[1150px]">
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        contentLabel="Example Modal"
        className="flex items-center w-[320px] h-[100px] bg-black ml-[40%] mt-[10%] text-white rounded-lg z-50">
        <div className="ml-3 text-center space-y-4">
          <h2 className="text-center"> Apakah anda yakin mau menghapusnya?</h2>
          <div className="flex justify-around">
            <button onClick={handleRemoveTrack}>Ya</button>
            <button onClick={() => setIsModalOpen(false)}>Tidak</button>
          </div>
        </div>
      </Modal>
      <div className="flex items-center space-x-2">
        <img src={dataDetailPlaylist.image} className="w-[80px] h-[80px] rounded-md" alt="" />
        <h2 className="text-white font-bold text-lg">{dataDetailPlaylist.title}</h2>
        <p>{dataDetailPlaylist.description}</p>
      </div>
      <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-[525px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[1000px]">
        {dataDetailPlaylist.tracks?.map((track, index) => (
          <TrackList
            key={index}
            track={track}
            isPlaylist
            handleRemoveTrack={(uri) => {
              setUriTrackRemove(uri);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetail;
