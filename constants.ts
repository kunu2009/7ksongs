import type { Playlist, Track } from './types';

const tracks: Track[] = [
  { id: 't1', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:04', coverArt: 'https://i.ytimg.com/vi/dX3k_QDnzHE/hqdefault.jpg', youtubeId: 'dX3k_QDnzHE' },
  { id: 't2', title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49', coverArt: 'https://i.ytimg.com/vi/MmZexg8sT0I/hqdefault.jpg', youtubeId: 'MmZexg8sT0I' },
  { id: 't3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '4:22', coverArt: 'https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg', youtubeId: '4NRXx6U8ABQ' },
  { id: 't4', title: 'Go Your Own Way', artist: 'Fleetwood Mac', album: 'Rumours', duration: '3:54', coverArt: 'https://i.ytimg.com/vi/6ul-cZyuYq4/hqdefault.jpg', youtubeId: '6ul-cZyuYq4' },
  { id: 't5', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', coverArt: 'https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg', youtubeId: 'fJ9rUzIMcZQ' },
  { id: 't6', title: 'Rolling in the Deep', artist: 'Adele', album: '21', duration: '3:48', coverArt: 'https://i.ytimg.com/vi/rYEDA3JcQqw/hqdefault.jpg', youtubeId: 'rYEDA3JcQqw' },
  { id: 't7', title: 'Get Lucky', artist: 'Daft Punk', album: 'Random Access Memories', duration: '4:08', coverArt: 'https://i.ytimg.com/vi/5NV6Rdv1a3I/hqdefault.jpg', youtubeId: '5NV6Rdv1a3I' },
  { id: 't8', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '4:38', coverArt: 'https://i.ytimg.com/vi/hTWKbfoikeg/hqdefault.jpg', youtubeId: 'hTWKbfoikeg' },
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Chill Vibes',
    creator: 'AuraBeat',
    coverArt: 'https://picsum.photos/seed/chill/400',
    tracks: [tracks[0], tracks[1], tracks[3]],
  },
  {
    id: 'p2',
    name: '80s Power Hits',
    creator: 'AuraBeat',
    coverArt: 'https://picsum.photos/seed/80s/400',
    tracks: [tracks[4], tracks[3], tracks[7]],
  },
  {
    id: 'p3',
    name: 'Modern Pop',
    creator: 'AuraBeat',
    coverArt: 'https://picsum.photos/seed/pop/400',
    tracks: [tracks[2], tracks[5], tracks[6]],
  },
];