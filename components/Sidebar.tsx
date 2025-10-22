
import React from 'react';
import { HomeIcon, SearchIcon, LibraryIcon } from './icons';
import type { Playlist } from '../types';

interface SidebarProps {
  playlists: Playlist[];
  onSelectPlaylist: (playlist: Playlist) => void;
  selectedPlaylistId: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: string;
  setActiveView: (view: 'home' | 'search') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  playlists,
  onSelectPlaylist,
  selectedPlaylistId,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setActiveView('search');
    }
  };
  
  const handleSearchFocus = () => {
    setActiveView('search');
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveView('home');
  };

  return (
    <div className="bg-black text-gray-300 w-64 p-2 space-y-2 flex flex-col h-full">
      <div className="bg-zinc-900 rounded-lg p-2 space-y-2">
        <NavItem
          Icon={HomeIcon}
          label="Home"
          isActive={activeView === 'home'}
          onClick={handleHomeClick}
        />
        <div 
          className={`flex items-center w-full gap-4 px-4 py-2 font-bold transition-colors duration-200 rounded-md cursor-text ${activeView === 'search' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          onClick={() => document.getElementById('sidebar-search')?.focus()}
        >
          <SearchIcon className="w-6 h-6 flex-shrink-0" />
          <input
            id="sidebar-search"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className="bg-transparent focus:outline-none w-full placeholder-gray-400"
          />
        </div>
      </div>
      <div className="bg-zinc-900 rounded-lg flex-grow p-2 flex flex-col">
        <div className="flex items-center gap-4 px-4 pb-2 text-gray-300">
          <LibraryIcon className="w-6 h-6" />
          <span className="font-bold">Your Library</span>
        </div>
        <div className="space-y-1 overflow-y-auto flex-grow pr-2">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist)}
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                selectedPlaylistId === playlist.id && activeView === 'home'
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
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full gap-4 px-4 py-2 font-bold transition-colors duration-200 rounded-md ${
      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span>{label}</span>
  </button>
);

export default Sidebar;
