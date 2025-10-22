
import React, { useState, useEffect } from 'react';
import type { Track } from '../types';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from './icons';

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isPlaying && currentTrack) {
      interval = window.setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    setProgress(0);
  }, [currentTrack]);


  if (!currentTrack) {
    return <div className="h-24 bg-zinc-800 border-t border-zinc-700"></div>;
  }

  return (
    <div className="h-24 bg-zinc-800 border-t border-zinc-700 text-white grid grid-cols-3 items-center px-4">
      <div className="flex items-center gap-4">
        <img src={currentTrack.coverArt} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover" />
        <div>
          <p className="font-semibold">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <button onClick={onPrev} className="text-gray-400 hover:text-white transition-colors">
            <SkipBackIcon className="w-6 h-6" />
          </button>
          <button
            onClick={onPlayPause}
            className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 pl-1" />}
          </button>
          <button onClick={onNext} className="text-gray-400 hover:text-white transition-colors">
            <SkipForwardIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full max-w-lg mt-2 flex items-center gap-2 text-xs text-gray-400">
           <span>0:{Math.floor(progress * (300/100)).toString().padStart(2, '0')}</span>
            <div className="w-full bg-zinc-600 rounded-full h-1 group">
                <div className="bg-white group-hover:bg-teal-400 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span>{currentTrack.duration}</span>
        </div>
      </div>
      
      <div>{/* Volume controls could go here */}</div>
    </div>
  );
};

export default Player;
