import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getDetailPlaylist, playingTrackState } from '../atoms/playerAtom';
import { spotifyAPI } from '../utils';
import Content from './Content';
import MediaPlayer from './MediaPlayer';
import PlaylistDetail from './PlaylistDetail';
import RightSection from './RightSection';
import Sidebar from './Sidebar';
import TrackList from './TrackList';

interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  const { data: session } = useSession();
  const [getDetailPlaylists, setGetDetailPlaylists] = useRecoilState(getDetailPlaylist);
  const [dataDetailPlaylist, setDataDetailPlaylist] = useState({
    title: '',
    description: '',
    id: '',
    image: '',
    tracks: null
  });

  useEffect(() => {
    if (!session.accessToken) return;
    spotifyAPI.setAccessToken(session.accessToken);
  }, [session.accessToken]);

  return (
    <main className="flex min-h-screen max-w-min lg:pb-24">
      <Sidebar />
      {getDetailPlaylists.isGetDetailPlaylist ? <PlaylistDetail /> : <Content />}
      <RightSection />

      <div className="fixed bottom-0 right-0 left-0 z-50">
        <MediaPlayer accessToken={session.accessToken} />
      </div>
    </main>
  );
};

export default Dashboard;
