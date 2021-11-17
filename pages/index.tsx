import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Dashboard from '../components/Dashboard';
import Loader from '../components/Loader';

export default function Home() {
  const router = useRouter();
  const { status, data: session } = useSession({
    onUnauthenticated: () => {
      router.replace('/auth/login');
    },
    required: true
  });

  if (status === 'loading') return <Loader />;

  return (
    <div className="">
      <Head>
        <title>Spotify Rivari</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
}
