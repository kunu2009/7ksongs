
import React from 'react';
import type { Track } from '../types';
import { PlayIcon, PauseIcon, ClockIcon } from './icons';

interface TrackListProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onPlayTrack, currentTrack, isPlaying }) => {
  return (
    <div className="px-8 text-gray-400">
      <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 border-b border-zinc-700 pb-2 mb-4 text-sm font-light">
        <div className="text-center">#</div>
        <div>Title</div>
        <div>Album</div>
        <div><ClockIcon className="w-4 h-4" /></div>
      </div>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-[2rem_1fr_1fr_auto] items-center gap-4 p-2 rounded-md group hover:bg-white/10 transition-colors"
            onDoubleClick={() => onPlayTrack(track)}
          >
            <div className="relative flex items-center justify-center">
              <span className={`group-hover:hidden ${currentTrack?.id === track.id ? 'hidden' : 'block'}`}>{index + 1}</span>
               <button onClick={() => onPlayTrack(track)} className={`absolute text-white ${currentTrack?.id === track.id ? 'block' : 'hidden group-hover:block'}`}>
                  {currentTrack?.id === track.id && isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
               </button>
            </div>
            <div className="flex items-center gap-4">
              <img src={track.coverArt} alt={track.title} className="w-10 h-10 rounded-md object-cover" />
              <div>
                <p className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-teal-400' : 'text-white'}`}>{track.title}</p>
                <p className="text-sm">{track.artist}</p>
              </div>
            </div>
            <div className="truncate">{track.album}</div>
            <div>{track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
