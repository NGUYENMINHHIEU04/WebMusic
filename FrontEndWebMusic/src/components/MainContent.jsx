// src/components/MainContent.js
import React, { useState, useEffect } from 'react';
import Playlist from './Playlist';
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

        const updatedPlaylists = await Promise.all(
          response.data.map(async (playlist) => {
            let imageUrl = 'https://via.placeholder.com/150';
            if (playlist.coverImageId) {
              try {
                const url = await getImageUrl(playlist.coverImageId);
                imageUrl = url;
              } catch (err) {
                console.error(`Failed to fetch image for playlist ${playlist.id}:`, err);
              }
            }
            return { ...playlist, imageUrl };
          })
        );

        setPlaylists(updatedPlaylists);
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
                  className="bg-gray-900 p-4 rounded-lg flex flex-col items-start"
                >
                  {/* Remove the image since the UI doesn't show it */}
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <span className="text-gray-400 text-sm">♪</span> {/* Placeholder icon for music */}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{track.title}</h3>
                      <p className="text-gray-400 text-sm">{track.artist || 'Unknown Artist'}</p>
                    </div>
                  </div>
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