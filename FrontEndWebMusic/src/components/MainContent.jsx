// MainContent.js
import React, { useState, useEffect } from 'react';
import PlaylistCard from './PlaylistCard';
import PlaylistDetail from './PlaylistDetail';
import { getAllPlaylists, getImageUrl } from '../apis/api_playlist';

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
        setPlaylists(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  const handleCardClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBack = () => {
    setSelectedPlaylist(null);
  };

// MainContent.js
const handleTrackSelectWithTracks = (track, tracks, playlistId, cardIndex) => {
  resetCurrentTime(); // Reset thời gian phát về 0
  onTrackSelect(track, tracks, playlistId, cardIndex);
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
        ) : (
          <>
            <div className="p-5 text-white font-sans">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold uppercase">MADE FOR MANH NGUYEN</h2>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white hover:underline"
                >
                  SHOW ALL
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={playlist.id}
                    index={index}
                    image={
                      playlist.coverImageId
                        ? getImageUrl(playlist.coverImageId)
                        : 'https://via.placeholder.com/150'
                    }
                    title={playlist.name}
                    artists={playlist.description || 'No description available'}
                    onCardClick={() => handleCardClick(playlist)}
                    isPlaying={isPlaying && currentPlayingCard === index}
                    onPlayPause={() => handlePlayPause(index, playlist)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainContent;