import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { spotifyAPI } from '../utils';

const useSetAccessTokenSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session.accessToken) return;
    spotifyAPI.setAccessToken(session.accessToken);
  }, [session.accessToken]);

  return {
    session
  }
};

export default useSetAccessTokenSpotify;
