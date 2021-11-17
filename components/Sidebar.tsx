import React from 'react';
import Image from 'next/image';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { RiCompassFill } from 'react-icons/ri';
import { ChartBarIcon, ClockIcon, DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { getDetailPlaylist } from '../atoms/playerAtom';

const Sidebar = () => {
  const [getDetailPlaylists, setGetDetailPlaylists] = useRecoilState(getDetailPlaylist);

  const handleClick = () => {
    setGetDetailPlaylists({
      id: '',
      isGetDetailPlaylist: false
    });
  };
  return (
    <section className="fixed mt-2 top-0 z-40 p-4 flex flex-col items-center h-screen w-[90px] bg-black space-y-8">
      <Image
        src="https://rb.gy/xkacau"
        width={46}
        height={46}
        objectFit="contain"
        onClick={handleClick}
        className="cursor-pointer"
      />
      <div className="space-y-8">
        <HomeIcon
          className={`sidebarIcon ${
            getDetailPlaylists.isGetDetailPlaylist ? '' : 'text-white'
          } opacity-[0.85]`}
          onClick={handleClick}
        />
        <RiCompassFill className="sidebarIcon text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
      </div>
    </section>
  );
};

export default Sidebar;
