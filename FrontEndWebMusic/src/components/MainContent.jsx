import React, { useState, useEffect, useContext } from 'react';
import Playlist from './Playlist';
import PlaylistDetail from './PlaylistDetail';
import { getAllPlaylists, getImageUrl } from '../apis/api_playlistcard';
import { getHistoryByUserId, addHistory, recordListen, rateSong } from '../apis/api_history';
import { getSongAudio } from '../apis/api_song';
import { getImage } from '../apis/api_image';
import { getRecommendations } from '../apis/api_recommendation';
import { AuthContext } from '../context/AuthContext';

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
  onNextTrack,
}) => {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [historyUpdated, setHistoryUpdated] = useState(0); // Sử dụng số để trigger cập nhật

  // Lấy danh sách playlists
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

  // Lấy lịch sử nghe
  useEffect(() => {
    const fetchHistory = async () => {
      if (!isLoggedIn || !userId) {
        setHistoryItems([]);
        return;
      }

      try {
        console.log(`Fetching history for user ${userId}...`);
        const historyData = await getHistoryByUserId(userId);
        console.log('History data:', historyData);

        const formattedHistory = await Promise.all(
          historyData.map(async (historyEntry, index) => {
            try {
              const songData = await getSongAudio(historyEntry.songId);
              let imageUrl = 'https://via.placeholder.com/150';
              if (songData.idImage) {
                try {
                  imageUrl = await getImage(songData.idImage);
                } catch (err) {
                  console.error(`Failed to fetch image for song ${historyEntry.songId}:`, err);
                }
              }

              return {
                id: `history-${index}`,
                title: songData.title || 'Unknown Title',
                artist: songData.artist || 'Unknown Artist',
                imageUrl,
                songId: historyEntry.songId,
                url: songData.audioUrl || '',
                artistIds: songData.artistIds || [],
                listenCount: historyEntry.listenCount || 0,
                rating: historyEntry.rating,
              };
            } catch (err) {
              console.error(`Failed to fetch song ${historyEntry.songId}:`, err);
              return null;
            }
          })
        );

        setHistoryItems(formattedHistory.filter((item) => item !== null));
      } catch (err) {
        console.error('Error fetching history:', err);
        setHistoryItems([]);
      }
    };

    fetchHistory();
  }, [isLoggedIn, userId, historyUpdated]);

  // Lấy gợi ý
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!isLoggedIn || !userId) {
        setRecommendedItems([]);
        return;
      }

      try {
        console.log(`Fetching recommendations for user ${userId} at timestamp ${new Date().toISOString()}...`);
        const recommendations = await getRecommendations(userId, { cache: false, timestamp: Date.now() }); // Thêm tham số để chống cache
        console.log('Recommendations:', recommendations);

        const formattedRecommendations = await Promise.all(
          recommendations.map(async (item, index) => {
            try {
              const songData = await getSongAudio(item.songId);
              let imageUrl = item.imageUrl || 'https://via.placeholder.com/150';
              if (songData.idImage) {
                try {
                  imageUrl = await getImage(songData.idImage);
                } catch (err) {
                  console.error(`Failed to fetch image for song ${item.songId}:`, err);
                }
              }

              return {
                id: `recommend-${index}`,
                songId: item.songId,
                title: songData.title || item.title || 'Unknown Title',
                artist: songData.artist || item.artist || 'Unknown Artist',
                imageUrl,
                url: songData.audioUrl || '',
                artistIds: songData.artistIds || [],
              };
            } catch (err) {
              console.error(`Failed to fetch song ${item.songId}:`, err);
              return null;
            }
          })
        );

        setRecommendedItems(formattedRecommendations.filter((item) => item !== null));
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setRecommendedItems([]);
      }
    };

    fetchRecommendations();
  }, [isLoggedIn, userId, historyUpdated]);

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

  const handleTrackSelectWithTracks = (track, tracks, playlistId, cardIndex, shouldResetTime = true) => {
    if (shouldResetTime) {
      resetCurrentTime();
    }
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

  const createHistoryPlaylist = (selectedTrackIndex) => {
    return {
      id: 'history-playlist',
      name: 'Listening History',
      songIds: historyItems.map((item) => item.songId),
      tracks: historyItems,
      selectedTrackIndex,
    };
  };

  const createRecommendationPlaylist = (selectedTrackIndex) => {
    return {
      id: 'recommendation-playlist',
      name: 'Recommended Songs',
      songIds: recommendedItems.map((item) => item.songId),
      tracks: recommendedItems,
      selectedTrackIndex,
    };
  };

  const handleRecommendationPlayPause = (index) => {
    const playlist = createRecommendationPlaylist(index);
    const selectedTrack = playlist.tracks[index];

    const isSameTrack =
      currentPlayingCard === index &&
      currentPlaylistId === 'recommendation-playlist';

    if (isSameTrack && isPlaying) {
      setIsPlaying(false);
    } else {
      handleTrackSelectWithTracks(
        selectedTrack,
        playlist.tracks,
        playlist.id,
        index,
        !isSameTrack
      );
      setIsPlaying(true);
      playSong(selectedTrack);
    }
  };

  const handleHistoryPlayPause = (index) => {
    const playlist = createHistoryPlaylist(index);
    const selectedTrack = playlist.tracks[index];

    const isSameTrack =
      currentPlayingCard === index &&
      currentPlaylistId === 'history-playlist';

    if (isSameTrack && isPlaying) {
      setIsPlaying(false);
    } else {
      handleTrackSelectWithTracks(
        selectedTrack,
        playlist.tracks,
        playlist.id,
        index,
        !isSameTrack
      );
      setIsPlaying(true);
      playSong(selectedTrack);
    }
  };

  const playSong = async (song) => {
    if (isLoggedIn && userId) {
      try {
        const historyData = {
          userId: userId,
          songId: song.songId,
          title: song.title,
          artist: song.artist,
          imageUrl: song.imageUrl,
          timestamp: new Date().toISOString(),
        };
        await addHistory(historyData);
        await recordListen(historyData);
        console.log(`Added song ${song.songId} to history and recorded listen for user ${userId}`);
        setHistoryUpdated(prev => prev + 1); // Tăng giá trị để trigger cập nhật
      } catch (error) {
        console.error('Failed to record listen:', error);
      }
    }
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
            onNextTrack={onNextTrack}
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
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <span className="text-gray-400 text-sm">♪</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{track.title}</h3>
                      <p className="text-gray-400 text-sm">{track.artist || 'Unknown Artist'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const playlist = createSearchPlaylist(index);
                      handleTrackSelectWithTracks(
                        playlist.tracks[index],
                        playlist.tracks,
                        playlist.id,
                        index
                      );
                      setIsPlaying(true);
                      playSong(playlist.tracks[index]);
                    }}
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
          <div>
            {isLoggedIn && recommendedItems.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-bold">Recommended for You</h2>
                  <button className="text-gray-400 hover:text-white text-sm">SHOW ALL</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {recommendedItems.slice(0, 5).map((item, index) => {
                    const isItemPlaying =
                      isPlaying &&
                      currentPlayingCard === index &&
                      currentPlaylistId === 'recommendation-playlist';

                    return (
                      <div
                        key={item.songId}
                        className="relative bg-gray-900 p-4 rounded-lg flex flex-col items-start cursor-pointer hover:bg-gray-700"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleRecommendationPlayPause(index)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                        />
                        <div
                          className={`absolute right-3 top-[140px] transform transition-opacity duration-300 ${
                            hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <button
                            className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#1ED760] transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRecommendationPlayPause(index);
                            }}
                          >
                            {isItemPlaying ? (
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.artist}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isLoggedIn && historyItems.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-2xl font-bold">Your Listening History</h2>
                  <button className="text-gray-400 hover:text-white text-sm">Show All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {historyItems.slice(0, 5).map((item, index) => {
                    const isItemPlaying =
                      isPlaying &&
                      currentPlayingCard === index &&
                      currentPlaylistId === 'history-playlist';

                    return (
                      <div
                        key={item.id}
                        className="relative bg-gray-900 p-4 rounded-lg flex flex-col items-start cursor-pointer hover:bg-gray-700"
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleHistoryPlayPause(index)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                        />
                        <div
                          className={`absolute right-3 top-[140px] transform transition-opacity duration-300 ${
                            hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <button
                            className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#1ED760] transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleHistoryPlayPause(index);
                            }}
                          >
                            {isItemPlaying ? (
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.artist}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Playlist
              playlists={playlists}
              isPlaying={isPlaying}
              currentPlayingCard={currentPlayingCard}
              currentPlaylistId={currentPlaylistId}
              handlePlayPause={handlePlayPause}
              onCardClick={handleCardClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MainContent;