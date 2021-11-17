import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getDetailPlaylist } from '../atoms/playerAtom';
import useSetAccessTokenSpotify from '../hooks/useSetAccessTokenSpotify';
import Content from './Content';
import MediaPlayer from './MediaPlayer';
import PlaylistDetail from './PlaylistDetail';
import RightSection from './RightSection';
import Sidebar from './Sidebar';


const Dashboard = () => {
  const [getDetailPlaylists] = useRecoilState(getDetailPlaylist);
  const { session } = useSetAccessTokenSpotify()

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
