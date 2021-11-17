import Head from 'next/head';
import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useRouter } from 'next/router';
import Loader from '../../components/Loader';

interface ILoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const login = ({ providers }: ILoginProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setTimeout(() => router.replace('/'), 3000);
      // router.replace('/')
    }
  }, [session]);

  if (session) return <Loader />;

  return (
    <div className="h-screen flex flex-col items-center pt-40 space-y-8">
      <Head>
        <title>Spotify - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="text-white py-4 px-6 rounded-full bg-[#1db954] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0db146]">
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers }
  };
}
