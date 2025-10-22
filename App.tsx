
import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import Player from './components/Player';
import SearchView from './components/SearchView';
import { INITIAL_PLAYLISTS } from './constants';
import type { Playlist, Track } from './types';

function App() {
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(playlists[0] || null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('home'); // 'home' or 'search'

  const currentTrackIndex = useMemo(() => {
    if (!selectedPlaylist || !currentTrack) return -1;
    return selectedPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
  }, [selectedPlaylist, currentTrack]);

  const allTracks = useMemo(() => playlists.flatMap(p => p.tracks), [playlists]);

  const filteredSidebarPlaylists = useMemo(() => {
    if (!searchQuery.trim()) {
      return playlists;
    }
    return playlists.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [playlists, searchQuery]);

  const handleSelectPlaylist = useCallback((playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setActiveView('home');
    setSearchQuery('');
  }, []);

  const handlePlayTrack = useCallback((track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(prev => !prev);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
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
    setActiveView('home');
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          playlists={filteredSidebarPlaylists}
          onSelectPlaylist={handleSelectPlaylist}
          selectedPlaylistId={selectedPlaylist?.id || null}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        {activeView === 'search' ? (
          <SearchView
            searchQuery={searchQuery}
            allPlaylists={playlists}
            allTracks={allTracks}
            onPlayTrack={handlePlayTrack}
            onSelectPlaylist={handleSelectPlaylist}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
          />
        ) : (
          <MainView 
            playlist={selectedPlaylist}
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlaylistGenerated={handlePlaylistGenerated}
          />
        )}
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
