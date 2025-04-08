// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Playlist from './Playlist'; // Import component Playlist
import PlaylistDetail from './PlaylistDetail';
import { getAllPlaylists, getImageUrl } from '../apis/api_playlistcard';

const MainContent = ({
  showSingerInfo,
  isPlaying,
  setIsPlaying,
  currentPlayingCard,
  currentPlaylistId,
  handlePlayPause,
  onTrackSelect,
  onArtistSelect,
  currentSong,
  resetCurrentTime,
  selectedPlaylistFromLibrary,
  resetTrigger,
  searchResults,
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await getAllPlaylists();
        console.log('Playlists from API:', response.data);
        setPlaylists(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  useEffect(() => {
    if (selectedPlaylistFromLibrary) {
      setSelectedPlaylist(selectedPlaylistFromLibrary);
    }
  }, [selectedPlaylistFromLibrary]);

  useEffect(() => {
    setSelectedPlaylist(null);
  }, [resetTrigger]);

  const handleCardClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBack = () => {
    setSelectedPlaylist(null);
  };

  const handleTrackSelectWithTracks = (track, tracks, playlistId, cardIndex) => {
    resetCurrentTime();
    onTrackSelect(track, tracks, playlistId, cardIndex);
  };

  const createSearchPlaylist = (selectedTrackIndex) => {
    return {
      id: 'search-results',
      name: 'Search Results',
      songIds: searchResults.map((track) => track.songId),
      tracks: searchResults,
      selectedTrackIndex,
    };
  };

  if (loading) {
    return (
      <div className="bg-gray-800 p-5 text-white rounded-lg h-[calc(100vh-96px)] flex items-center justify-center">
        Loading playlists...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 p-5 text-white rounded-lg h-[calc(100vh-96px)] flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  const hasSearchResults = searchResults && searchResults.length > 0;

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>

      <div className="bg-gray-800 p-5 text-white rounded-lg h-[calc(100vh-96px)] overflow-y-auto custom-scrollbar">
        {selectedPlaylist ? (
          <PlaylistDetail
            playlist={selectedPlaylist}
            onBack={handleBack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onTrackSelect={handleTrackSelectWithTracks}
            onArtistSelect={onArtistSelect}
            currentSong={currentSong}
            currentPlaylistId={currentPlaylistId}
            resetCurrentTime={resetCurrentTime}
            cardIndex={playlists.findIndex((p) => p.id === selectedPlaylist.id)}
          />
        ) : hasSearchResults ? (
          <div className="p-5 text-white font-sans">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold uppercase">SEARCH RESULTS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {searchResults.map((track, index) => (
                <div
                  key={track.songId}
                  className="bg-gray-900 p-4 rounded-lg flex flex-col items-center"
                >
                  <img
                    src={'https://via.placeholder.com/150'}
                    alt={track.title}
                    className="w-32 h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">{track.title}</h3>
                  <p className="text-gray-400 text-sm text-center">{track.artist}</p>
                  <button
                    onClick={() => handlePlayPause(index, createSearchPlaylist(index))}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                  >
                    {isPlaying &&
                    currentPlayingCard === index &&
                    currentPlaylistId === 'search-results'
                      ? 'Pause'
                      : 'Play'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Playlist
            playlists={playlists}
            isPlaying={isPlaying}
            currentPlayingCard={currentPlayingCard}
            currentPlaylistId={currentPlaylistId}
            handlePlayPause={handlePlayPause}
            onCardClick={handleCardClick}
          />
        )}
      </div>
    </>
  );
};

export default MainContent;