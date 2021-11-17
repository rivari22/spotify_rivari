import SpotifyWebApi from 'spotify-web-api-node';

export const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID
});
