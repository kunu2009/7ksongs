
import React from 'react';
import type { Playlist, Track } from '../types';
import { PlayIcon, PauseIcon } from './icons';

interface SearchViewProps {
  searchQuery: string;
  allPlaylists: Playlist[];
  allTracks: Track[];
  onPlayTrack: (track: Track) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

const SearchView: React.FC<SearchViewProps> = ({
  searchQuery,
  allPlaylists,
  allTracks,
  onPlayTrack,
  onSelectPlaylist,
  currentTrack,
  isPlaying,
}) => {
  const lowercasedQuery = searchQuery.toLowerCase();

  const filteredPlaylists = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allPlaylists.filter(p => p.name.toLowerCase().includes(lowercasedQuery));
  }, [allPlaylists, lowercasedQuery, searchQuery]);

  const filteredTracks = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allTracks.filter(t => 
      t.title.toLowerCase().includes(lowercasedQuery) ||
      t.artist.toLowerCase().includes(lowercasedQuery) ||
      t.album.toLowerCase().includes(lowercasedQuery)
    );
  }, [allTracks, lowercasedQuery, searchQuery]);

  if (!searchQuery.trim()) {
    return (
        <div className="flex-1 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 text-white p-8 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Search AuraBeat</h2>
                <p className="text-gray-400">Find your favorite songs, artists, or playlists.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 text-white overflow-y-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Results for "{searchQuery}"</h2>
      
      {filteredPlaylists.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Playlists</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPlaylists.map(playlist => (
              <div 
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist)}
                className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer group"
              >
                 <img src={playlist.coverArt} alt={playlist.name} className="w-full h-auto rounded-md mb-3 aspect-square object-cover shadow-lg" />
                 <p className="font-semibold truncate text-white">{playlist.name}</p>
                 <p className="text-sm text-gray-400">By {playlist.creator}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredTracks.length > 0 && (
        <div className="pb-24">
          <h3 className="text-xl font-bold mb-4">Songs</h3>
          <div className="space-y-1">
             {filteredTracks.map((track, index) => (
                <div
                  key={`${track.id}-${index}`}
                  className="grid grid-cols-[2rem_1fr_1fr_auto] items-center gap-4 p-2 rounded-md group hover:bg-white/10 transition-colors"
                  onDoubleClick={() => onPlayTrack(track)}
                >
                  <div className="relative flex items-center justify-center text-gray-400">
                    <span className={`group-hover:hidden ${currentTrack?.id === track.id ? 'hidden' : 'block'}`}>{index + 1}</span>
                    <button onClick={() => onPlayTrack(track)} className={`absolute text-white ${currentTrack?.id === track.id ? 'block' : 'hidden group-hover:block'}`}>
                        {currentTrack?.id === track.id && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={track.coverArt} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <p className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-teal-400' : 'text-white'}`}>{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </div>
                  <div className="truncate text-gray-400">{track.album}</div>
                  <div className="text-gray-400">{track.duration}</div>
                </div>
             ))}
          </div>
        </div>
      )}

      {filteredPlaylists.length === 0 && filteredTracks.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
            <p className="font-bold text-lg">No results found for "{searchQuery}"</p>
            <p className="mt-2">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default SearchView;
