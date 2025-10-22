
import React from 'react';
import { HomeIcon, SearchIcon, LibraryIcon } from './icons';
import type { Playlist } from '../types';

interface SidebarProps {
  playlists: Playlist[];
  onSelectPlaylist: (playlist: Playlist) => void;
  selectedPlaylistId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, onSelectPlaylist, selectedPlaylistId }) => {
  return (
    <div className="bg-black text-gray-300 w-64 p-2 space-y-2 flex flex-col h-full">
      <div className="bg-zinc-900 rounded-lg p-2 space-y-4">
        <NavItem Icon={HomeIcon} label="Home" />
        <NavItem Icon={SearchIcon} label="Search" />
      </div>
      <div className="bg-zinc-900 rounded-lg flex-grow p-2">
        <div className="flex items-center gap-4 px-4 pb-2 text-gray-300">
          <LibraryIcon className="w-6 h-6" />
          <span className="font-bold">Your Library</span>
        </div>
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedPlaylistId === playlist.id
                  ? 'bg-zinc-700 text-white'
                  : 'hover:bg-zinc-800'
              }`}
            >
              <img src={playlist.coverArt} alt={playlist.name} className="w-12 h-12 rounded-md object-cover" />
              <div>
                <p className="font-semibold text-white truncate">{playlist.name}</p>
                <p className="text-sm text-gray-400">Playlist ・ {playlist.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  Icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, label }) => (
  <a href="#" className="flex items-center gap-4 px-4 py-2 text-gray-300 hover:text-white font-bold transition-colors duration-200">
    <Icon className="w-6 h-6" />
    <span>{label}</span>
  </a>
);

export default Sidebar;
