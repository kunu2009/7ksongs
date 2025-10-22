
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
}

export interface Playlist {
  id: string;
  name: string;
  creator: string;
  coverArt: string;
  tracks: Track[];
}
