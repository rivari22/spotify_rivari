import { useSession } from 'next-auth/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { playingTrackState } from '../atoms/playerAtom';
import Content from './Content';
import MediaPlayer from './MediaPlayer';
import Sidebar from './Sidebar';

interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  const { data: session } = useSession();
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  return (
    <main className="flex min-h-screen max-w-min lg:pb-24">
      <Sidebar />
      <Content />

      <div className="fixed bottom-0 right-0 left-0 z-50">
        <MediaPlayer accessToken={session.accessToken} />
      </div>
    </main>
  );
};

export default Dashboard;
