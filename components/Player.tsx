import React, { useState, useEffect, useRef } from 'react';
import type { Track } from '../types';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from './icons';

// Fix: Add type declarations for the YouTube IFrame Player API to the global window object.
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface PlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Player: React.FC<PlayerProps> = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) => {
  const playerRef = useRef<any>(null);
  const [isYTReady, setIsYTReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Load the YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsYTReady(true);
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = () => setIsYTReady(true);
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize the YouTube player
  useEffect(() => {
    if (isYTReady && !playerRef.current) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        playerVars: { playsinline: 1 },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onNext();
            }
          },
        },
      });
    }
  }, [isYTReady, onNext]);
  
  // Control playback (load video, play/pause)
  useEffect(() => {
    const player = playerRef.current;
    if (player && currentTrack) {
      player.loadVideoById(currentTrack.youtubeId);
    }
  }, [currentTrack]);

  useEffect(() => {
    const player = playerRef.current;
    if (player && player.getPlayerState) {
        if (isPlaying) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    }
  }, [isPlaying, currentTrack]);


  // Update progress bar
  useEffect(() => {
    let interval: number;
    const player = playerRef.current;
    if (isPlaying && player) {
      interval = window.setInterval(() => {
        const currentTime = player.getCurrentTime() || 0;
        const duration = player.getDuration() || 0;
        setCurrentTime(currentTime);
        setDuration(duration);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [currentTrack]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return <div className="h-24 bg-zinc-800 border-t border-zinc-700"></div>;
  }

  return (
    <div className="h-24 bg-zinc-800 border-t border-zinc-700 text-white grid grid-cols-3 items-center px-4 relative">
       <div id="youtube-player" className="absolute top-0 left-0 -z-10"></div>
      <div className="flex items-center gap-4">
        <img src={currentTrack.coverArt} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover" />
        <div>
          <p className="font-semibold truncate">{currentTrack.title}</p>
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
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6 pl-1" />}
          </button>
          <button onClick={onNext} className="text-gray-400 hover:text-white transition-colors">
            <SkipForwardIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full max-w-lg mt-2 flex items-center gap-2 text-xs text-gray-400">
           <span>{formatTime(currentTime)}</span>
            <div className="w-full bg-zinc-600 rounded-full h-1 group">
                <div className="bg-white group-hover:bg-teal-400 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div>{/* Volume controls could go here */}</div>
    </div>
  );
};

export default Player;