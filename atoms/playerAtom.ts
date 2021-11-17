import { atom } from 'recoil';

export const playState = atom({
  key: 'playState',
  default: false
});

export const playingTrackState = atom({
  key: 'playingTrackState',
  default: {
    id: '',
    artist: '',
    title: '',
    uri: '',
    albumUrl: ''
  }
});

export const playlistTrack = atom({
  key: 'playlistTrack',
  default: null
});

export const getDetailPlaylist = atom({
  key: 'getDetailPlaylist',
  default: {
    id: '',
    isGetDetailPlaylist: false
  }
});

export const addTrackToPlaylist = atom({
  key: 'addTrackToPlaylist',
  default: {
    idPlaylist: '',
    idTrack: ''
  }
})
