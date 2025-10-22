
import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import Player from './components/Player';
import { INITIAL_PLAYLISTS } from './constants';
import type { Playlist, Track } from './types';

function App() {
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(playlists[0] || null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentTrackIndex = useMemo(() => {
    if (!selectedPlaylist || !currentTrack) return -1;
    return selectedPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
  }, [selectedPlaylist, currentTrack]);

  const handleSelectPlaylist = useCallback((playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  }, []);

  const handlePlayTrack = useCallback((track: Track) => {
    // If it's the same track, toggle play/pause
    if (currentTrack?.id === track.id) {
      setIsPlaying(prev => !prev);
    } else {
      // If it's a new track, start playing it
      setCurrentTrack(track);
      setIsPlaying(true);
      // Ensure the playlist containing the track is selected
      const parentPlaylist = playlists.find(p => p.tracks.some(t => t.id === track.id));
      if (parentPlaylist) {
        setSelectedPlaylist(parentPlaylist);
      }
    }
  }, [currentTrack, playlists]);

  const handlePlayPause = useCallback(() => {
    if (currentTrack) {
      setIsPlaying(prev => !prev);
    }
  }, [currentTrack]);

  const handleNextTrack = useCallback(() => {
    if (!selectedPlaylist || currentTrackIndex === -1) return;
    const nextIndex = (currentTrackIndex + 1) % selectedPlaylist.tracks.length;
    setCurrentTrack(selectedPlaylist.tracks[nextIndex]);
    setIsPlaying(true);
  }, [selectedPlaylist, currentTrackIndex]);

  const handlePrevTrack = useCallback(() => {
    if (!selectedPlaylist || currentTrackIndex === -1) return;
    const prevIndex = (currentTrackIndex - 1 + selectedPlaylist.tracks.length) % selectedPlaylist.tracks.length;
    setCurrentTrack(selectedPlaylist.tracks[prevIndex]);
    setIsPlaying(true);
  }, [selectedPlaylist, currentTrackIndex]);

  const handlePlaylistGenerated = useCallback((newPlaylist: Playlist) => {
    setPlaylists(prev => [newPlaylist, ...prev]);
    setSelectedPlaylist(newPlaylist);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          playlists={playlists}
          onSelectPlaylist={handleSelectPlaylist}
          selectedPlaylistId={selectedPlaylist?.id || null}
        />
        <MainView 
          playlist={selectedPlaylist}
          onPlayTrack={handlePlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlaylistGenerated={handlePlaylistGenerated}
        />
      </div>
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
      />
    </div>
  );
}

export default App;
