// PlaylistDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { getSongAudio } from '../apis/api_song';
import { getImageUrl } from '../apis/api_playlist';
import { getArtistsByIds } from '../apis/api_artist';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

const PlaylistDetail = ({
  playlist,
  onBack,
  isPlaying,
  setIsPlaying,
  onTrackSelect,
  onArtistSelect,
  currentSong,
  currentPlaylistId,
  resetCurrentTime,
  cardIndex,
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { libraryItems, addToLibrary, removeFromLibrary } = useLibrary();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTrackId, setHoveredTrackId] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const songIds = playlist.songIds || [];

        const formattedTracks = await Promise.all(
          songIds.map(async (songId, index) => {
            try {
              const songData = await getSongAudio(songId);
              return {
                id: index + 1,
                title: songData.title || songData.name || 'Unknown Title',
                artist: songData.artistIds
                  ? songData.artistIds.join(', ')
                  : songData.artists || 'Unknown Artist',
                category: songData.category || songData.genre || 'Unknown Category',
                duration: songData.duration || '0:00',
                songId: songId,
                url: songData.audioUrl || '',
                artistIds: songData.artistIds || [],
              };
            } catch (err) {
              console.error(`Failed to fetch song ${songId}:`, err);
              return {
                id: index + 1,
                title: 'Error Loading Song',
                artist: 'Unknown',
                category: 'Unknown',
                duration: '0:00',
                songId: songId,
                artistIds: [],
              };
            }
          })
        );

        setTracks(formattedTracks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [playlist.songIds]);

  useEffect(() => {
    if (currentSong && tracks.length > 0) {
      const currentTrack = tracks.find((track) => track.url === currentSong.url);
      if (currentTrack) {
        setCurrentTrackId(currentTrack.id);
      } else {
        setCurrentTrackId(null);
      }
    } else {
      setCurrentTrackId(null);
    }
  }, [currentSong, tracks]);

  const isCurrentPlaylistPlaying = () => {
    const result =
      isPlaying &&
      currentPlaylistId === playlist.id &&
      currentSong &&
      tracks.some((track) => track.url === currentSong.url);
    console.log('isCurrentPlaylistPlaying:', {
      isPlaying,
      currentPlaylistId,
      playlistId: playlist.id,
      currentSong,
      tracksHasCurrentSong: tracks.some((track) => track.url === currentSong?.url),
      result,
    });
    return result;
  };

  const handlePlayPauseClick = () => {
    if (tracks.length > 0) {
      if (!isCurrentPlaylistPlaying()) {
        setCurrentTrackId(tracks[0].id);
        onTrackSelect(tracks[0], tracks, playlist.id, cardIndex);
      } else {
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleTrackPlayPause = async (track) => {
    try {
      if (!isLoggedIn) {
        onTrackSelect(track, tracks, playlist.id, cardIndex);
        return;
      }

      if (currentTrackId === track.id && isCurrentPlaylistPlaying()) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentTrackId(track.id);
        resetCurrentTime();
        onTrackSelect(track, tracks, playlist.id, cardIndex);
        setIsPlaying(true);

        if (track.artistIds && track.artistIds.length > 0) {
          const artists = await getArtistsByIds(track.artistIds);
          onArtistSelect(artists[0]);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const isInLibrary = libraryItems.some((item) => item.id === playlist.id);

  const handleLibraryAction = () => {
    if (!isLoggedIn) {
      alert('Please log in to manage your library.');
      return;
    }

    if (isInLibrary) {
      removeFromLibrary(playlist.id);
    } else {
      addToLibrary(playlist);
    }
  };

  const playlistImageUrl = playlist.coverImageId
    ? getImageUrl(playlist.coverImageId)
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar font-sans">
      <div className="flex items-center mb-5">
        <button className="text-gray-400 hover:text-white mr-3" onClick={onBack}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img src={playlistImageUrl} alt={playlist.name} className="w-40 h-40 object-cover mr-5" />
        <div>
          <p className="text-sm text-gray-400">Playlist</p>
          <h1 className="text-4xl font-bold">{playlist.name}</h1>
          <p className="text-gray-400 mt-2">{playlist.description}</p>
          <p className="text-gray-400 text-sm">Spotify • {tracks.length} songs</p>
        </div>
      </div>

      <div className="flex items-center mb-5">
        <button
          className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center mr-3 hover:bg-[#1ED760] transition-colors duration-200"
          onClick={handlePlayPauseClick}
        >
          {isCurrentPlaylistPlaying() ? (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className="text-gray-400 hover:text-white mr-3 relative"
          onClick={handleLibraryAction}
          title={isInLibrary ? 'Remove from Your Library' : 'Add to Your Library'}
        >
          {isInLibrary ? (
            <span className="text-green-500 text-2xl">✔</span>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="text-gray-400">
        {loading && <p>Loading tracks...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 mb-3">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-4">Category</div>
              <div className="col-span-2 text-right">
                <FiClock className="inline-block w-5 h-5" />
              </div>
            </div>
            {tracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-12 gap-4 py-2 hover:bg-[#282828] rounded-md cursor-pointer"
                onMouseEnter={() => setHoveredTrackId(track.id)}
                onMouseLeave={() => setHoveredTrackId(null)}
              >
                <div className="col-span-1 flex items-center">
                  {hoveredTrackId === track.id || currentTrackId === track.id ? (
                    <button onClick={() => handleTrackPlayPause(track)}>
                      {isCurrentPlaylistPlaying() && currentTrackId === track.id ? (
                        <FaPause className="text-white w-4 h-4" />
                      ) : (
                        <FaPlay className="text-white w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    track.id
                  )}
                </div>
                <div className="col-span-5">
                  <p className="text-white">{track.title}</p>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <div className="col-span-4">{track.category}</div>
                <div className="col-span-2 text-right">{track.duration}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;