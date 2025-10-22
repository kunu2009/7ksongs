
import type { Playlist, Track } from './types';

const tracks: Track[] = [
  { id: 't1', title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We\'re Dreaming', duration: '4:04', coverArt: 'https://picsum.photos/seed/mc/200' },
  { id: 't2', title: 'Electric Feel', artist: 'MGMT', album: 'Oracular Spectacular', duration: '3:49', coverArt: 'https://picsum.photos/seed/ef/200' },
  { id: 't3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', coverArt: 'https://picsum.photos/seed/bl/200' },
  { id: 't4', title: 'Go Your Own Way', artist: 'Fleetwood Mac', album: 'Rumours', duration: '3:43', coverArt: 'https://picsum.photos/seed/gyow/200' },
  { id: 't5', title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55', coverArt: 'https://picsum.photos/seed/br/200' },
  { id: 't6', title: 'Rolling in the Deep', artist: 'Adele', album: '21', duration: '3:48', coverArt: 'https://picsum.photos/seed/ritd/200' },
  { id: 't7', title: 'Get Lucky', artist: 'Daft Punk', album: 'Random Access Memories', duration: '6:09', coverArt: 'https://picsum.photos/seed/gl/200' },
  { id: 't8', title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', duration: '5:01', coverArt: 'https://picsum.photos/seed/slts/200' },
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
