
import React, { useState, useCallback } from 'react';
import type { Playlist, Track } from '../types';
import TrackList from './TrackList';
import { generatePlaylist } from '../services/geminiService';
import { WandSparklesIcon } from './icons';

interface MainViewProps {
  playlist: Playlist | null;
  onPlayTrack: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlaylistGenerated: (playlist: Playlist) => void;
}

const PlaylistGenerator: React.FC<{ onPlaylistGenerated: (playlist: Playlist) => void }> = ({ onPlaylistGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        try {
            const newPlaylist = await generatePlaylist(prompt);
            onPlaylistGenerated(newPlaylist);
            setPrompt('');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, onPlaylistGenerated]);

    return (
        <div className="bg-gradient-to-br from-purple-800 to-teal-800 p-8 rounded-lg text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <WandSparklesIcon className="w-8 h-8"/> AI Playlist Generator
            </h2>
            <p className="text-purple-200 mb-6">Describe a mood, genre, or activity, and let AI create a custom playlist for you.</p>
            <div className="flex gap-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'lofi beats for studying'"
                    className="flex-grow bg-white/10 placeholder-purple-300 p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="bg-purple-500 hover:bg-purple-400 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-transform duration-200 transform hover:scale-105"
                >
                    {isLoading ? 'Generating...' : 'Create'}
                </button>
            </div>
            {error && <p className="text-red-300 mt-4">{error}</p>}
        </div>
    );
}

const MainView: React.FC<MainViewProps> = ({ playlist, onPlayTrack, currentTrack, isPlaying, onPlaylistGenerated }) => {
  return (
    <div className="flex-1 bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-900 text-white overflow-y-auto">
      <div className="p-8">
        <PlaylistGenerator onPlaylistGenerated={onPlaylistGenerated}/>
      </div>
      
      {playlist ? (
        <>
          <div className="flex items-end gap-6 p-8">
            <img src={playlist.coverArt} alt={playlist.name} className="w-48 h-48 rounded-lg shadow-2xl object-cover" />
            <div>
              <p className="text-sm">Playlist</p>
              <h1 className="text-6xl font-extrabold tracking-tighter">{playlist.name}</h1>
              <p className="mt-2 text-gray-400">Created by {playlist.creator}</p>
            </div>
          </div>
          <div className="bg-black/20 pb-24">
            <TrackList 
              tracks={playlist.tracks} 
              onPlayTrack={onPlayTrack}
              currentTrack={currentTrack}
              isPlaying={isPlaying}
            />
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-400">
            <h2 className="text-2xl font-bold">Welcome to AuraBeat</h2>
            <p>Select a playlist from the library or generate a new one with AI to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MainView;
