// src/pages/Homepage.js
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import LeftSidebar from '../components/LeftSidebar';
import MainContent from '../components/MainContent';
import RightSidebarSingerInformation from '../components/RightSidebarSingerInformation';
import MusicPlayer from '../components/MusicPlayer';
import Header from '../components/Header';
import Lyrics from '../components/Lyrics';
import RightSidebarQueue from '../components/RightSidebarQueue';
import RightSidebarDevice from '../components/RightSidebarDevice';
import LoginBanner from '../components/LoginBanner';
import LoginPage from '../components/LoginPage';
import closed_hand from '../images/001-hand.png';
import open_hand from '../images/002-palm.png';
import { useNavigate } from 'react-router-dom';
import { getSongAudio } from '../apis/api_song';
import { getImage } from '../apis/api_image';
import Chatbot from '../components/Chatbot'; // Import Chatbot component

const Homepage = () => {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSingerInfo, setShowSingerInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false); // Trạng thái để hiển thị Chatbot
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(20);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingCard, setCurrentPlayingCard] = useState(null);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [currentSong, setCurrentSong] = useState(() => {
    if (!userId) return null;
    const savedSong = localStorage.getItem(`currentSong_${userId}`);
    return savedSong ? JSON.parse(savedSong) : null;
  });
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([]);
  const [selectedPlaylistFromLibrary, setSelectedPlaylistFromLibrary] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const containerRef = useRef(null);
  const resetCurrentTimeRef = useRef(() => {});

  const resetToMainContent = () => {
    setSelectedPlaylistFromLibrary(null);
    setSearchResults([]);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSearch = async (filteredSongs) => {
    const formattedTracks = await Promise.all(
      filteredSongs.map(async (song, index) => {
        let imageUrl = 'https://via.placeholder.com/50';
        try {
          const songData = await getSongAudio(song.id);
          if (songData.idImage) {
            imageUrl = await getImage(songData.idImage);
          }
        } catch (err) {
          console.error(`Failed to fetch image for song ${song.id}:`, err);
        }
        return {
          id: index + 1,
          title: song.title || 'Unknown Title',
          artist: song.artist || 'Unknown Artist',
          category: song.category || 'Unknown Category',
          duration: song.duration || '0:00',
          songId: song.id,
          url: song.audioUrl || '',
          artistIds: song.artistIds || [],
          imageUrl,
        };
      })
    );
    setSearchResults(formattedTracks);
    setSelectedPlaylistFromLibrary(null);
  };

  useEffect(() => {
    if (!userId) return;
    if (currentSong) {
      localStorage.setItem(`currentSong_${userId}`, JSON.stringify(currentSong));
    } else {
      localStorage.removeItem(`currentSong_${userId}`);
    }
  }, [currentSong, userId]);

  useEffect(() => {
    if (!userId) {
      setCurrentSong(null);
      return;
    }
    const savedSong = localStorage.getItem(`currentSong_${userId}`);
    setCurrentSong(savedSong ? JSON.parse(savedSong) : null);
  }, [userId]);

  const singer = {
    name: currentArtist?.name || 'Son Tung M-TP',
    bio: currentArtist?.bio || 'Ca sĩ, nhạc sĩ người Việt Nam',
    image: currentArtist?.image || 'https://via.placeholder.com/150',
  };

  const toggleSingerInfo = () => {
    setShowSingerInfo(!showSingerInfo);
    setShowQueue(false);
    setShowDevice(false);
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
    setShowSingerInfo(false);
    setShowDevice(false);
  };

  const toggleDevice = () => {
    setShowDevice(!showDevice);
    setShowSingerInfo(false);
    setShowQueue(false);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleMouseDownLeft = () => setIsDraggingLeft(true);
  const handleMouseUpLeft = () => setIsDraggingLeft(false);

  const handleMouseMoveLeft = (e) => {
    if (!isDraggingLeft || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const newX = e.clientX;
    const newWidthPercentage = (newX / containerWidth) * 100;
    if (newWidthPercentage >= 15 && newWidthPercentage <= 40) {
      setLeftSidebarWidth(newWidthPercentage);
    }
  };

  const handleMouseDownRight = () => setIsDraggingRight(true);
  const handleMouseUpRight = () => setIsDraggingRight(false);

  const handleMouseMoveRight = (e) => {
    if (!isDraggingRight || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const newX = e.clientX;
    const newRightWidthPercentage = ((containerWidth - newX) / containerWidth) * 100;
    if (newRightWidthPercentage >= 15 && newRightWidthPercentage <= 40) {
      setRightSidebarWidth(newRightWidthPercentage);
    }
  };

  const handlePlayPause = async (cardIndex, playlist) => {
    if (!isLoggedIn) {
      setShowLoginPage(true);
      return;
    }

    if (currentPlayingCard !== cardIndex || currentPlaylistId !== playlist.id || !isPlaying) {
      setCurrentPlayingCard(cardIndex);
      setCurrentPlaylistId(playlist.id);
      const tracks = await fetchTracks(playlist);
      if (tracks.length > 0) {
        resetCurrentTimeRef.current();
        const trackToPlayIndex = playlist.selectedTrackIndex !== undefined ? playlist.selectedTrackIndex : 0;
        handleTrackSelect(tracks[trackToPlayIndex], tracks, playlist.id, cardIndex);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const fetchTracks = async (playlist) => {
    const songIds = playlist.songIds || [];
    const formattedTracks = await Promise.all(
      songIds.map(async (songId, index) => {
        try {
          const songData = await getSongAudio(songId);
          let imageUrl = 'https://via.placeholder.com/50';
          if (songData.idImage) {
            try {
              imageUrl = await getImage(songData.idImage);
            } catch (imageError) {
              console.error(`Failed to fetch image for song ${songId}:`, imageError);
            }
          }
          return {
            id: index + 1,
            title: songData.title || songData.name || 'Unknown Title',
            artist: songData.artistIds
              ? songData.artistIds.join(', ')
              : songData.artist || 'Unknown Artist',
            category: songData.category || songData.genre || 'Unknown Category',
            duration: songData.duration || '0:00',
            songId: songId,
            url: songData.audioUrl || '',
            artistIds: songData.artistIds || [],
            imageUrl,
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
            imageUrl: 'https://via.placeholder.com/50',
          };
        }
      })
    );
    return formattedTracks;
  };

  const handleTrackSelect = (track, tracks, playlistId, cardIndex) => {
    setCurrentSong({
      title: track.title,
      artist: track.artist,
      url: track.url,
      lyrics: track.lyrics || '',
      imageUrl: track.imageUrl,
    });
    setCurrentPlaylistTracks(tracks);
    setCurrentPlaylistId(playlistId);
    setCurrentPlayingCard(cardIndex);
    setIsPlaying(true);
  };

  const handleArtistSelect = (artist) => {
    setCurrentArtist(artist);
  };

  const handleNextTrack = () => {
    if (!currentPlaylistTracks || currentPlaylistTracks.length === 0 || !currentSong) return;

    const currentIndex = currentPlaylistTracks.findIndex((track) => track.url === currentSong.url);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex === currentPlaylistTracks.length - 1 ? 0 : currentIndex + 1;
    const nextTrack = currentPlaylistTracks[nextIndex];

    setCurrentSong({
      title: nextTrack.title,
      artist: nextTrack.artist,
      url: nextTrack.url,
      lyrics: nextTrack.lyrics || '',
      imageUrl: nextTrack.imageUrl,
    });
    resetCurrentTimeRef.current();
    setIsPlaying(true);
  };

  const handleLoginRedirect = () => {
    navigate('/auth');
  };

  const handlePlaylistSelectFromLibrary = (playlist) => {
    setSelectedPlaylistFromLibrary(playlist);
    setSearchResults([]);
  };

  useEffect(() => {
    if (isDraggingLeft) {
      window.addEventListener('mousemove', handleMouseMoveLeft);
      window.addEventListener('mouseup', handleMouseUpLeft);
    } else if (isDraggingRight) {
      window.addEventListener('mousemove', handleMouseMoveRight);
      window.addEventListener('mouseup', handleMouseUpRight);
    } else {
      window.removeEventListener('mousemove', handleMouseMoveLeft);
      window.removeEventListener('mouseup', handleMouseUpLeft);
      window.removeEventListener('mousemove', handleMouseMoveRight);
      window.removeEventListener('mouseup', handleMouseUpRight);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveLeft);
      window.removeEventListener('mouseup', handleMouseUpLeft);
      window.removeEventListener('mousemove', handleMouseMoveRight);
      window.removeEventListener('mouseup', handleMouseUpRight);
    };
  }, [isDraggingLeft, isDraggingRight]);

  return (
    <>
      <style>
        {`
          .divider {
            width: 2px;
            background: transparent;
            transition: background 0.2s;
          }
          .divider:hover {
            background: #888;
            cursor: url(${open_hand}) 16 16, auto;
          }
          .divider:active {
            background: #888;
            cursor: url(${closed_hand}) 16 16, auto;
          }
        `}
      </style>
      <div className="flex flex-col h-screen relative">
        <Header onReset={resetToMainContent} onSearch={handleSearch} />
        {showLoginPage ? (
          <LoginPage onLogin={handleLoginRedirect} />
        ) : (
          <>
            <div
              className="flex flex-1 p-1 bg-black overflow-y-auto custom-scrollbar"
              ref={containerRef}
            >
              <div style={{ width: `${leftSidebarWidth}%` }}>
                <LeftSidebar onPlaylistSelect={handlePlaylistSelectFromLibrary} />
              </div>

              <div className="divider" onMouseDown={handleMouseDownLeft} />

              <div
                style={{
                  width: `calc(${100 - leftSidebarWidth - (showSingerInfo || showQueue || showDevice ? rightSidebarWidth : 0)}%)`,
                }}
              >
                {showLyrics ? (
                  <Lyrics
                    songTitle={currentSong?.title || 'No Song Selected'}
                    lyrics={currentSong?.lyrics || ''}
                    onClose={toggleLyrics}
                  />
                ) : (
                  <MainContent
                    showSingerInfo={showSingerInfo}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentPlayingCard={currentPlayingCard}
                    currentPlaylistId={currentPlaylistId}
                    handlePlayPause={handlePlayPause}
                    onTrackSelect={handleTrackSelect}
                    onArtistSelect={handleArtistSelect}
                    currentSong={currentSong}
                    resetCurrentTime={resetCurrentTimeRef.current}
                    selectedPlaylistFromLibrary={selectedPlaylistFromLibrary}
                    resetTrigger={resetTrigger}
                    searchResults={searchResults}
                    onNextTrack={handleNextTrack} // Truyền handleNextTrack vào MainContent
                  />
                )}
              </div>

              {(showSingerInfo || showQueue || showDevice) && (
                <div className="divider" onMouseDown={handleMouseDownRight} />
              )}

              {(showSingerInfo || showQueue || showDevice) && (
                <div style={{ width: `${rightSidebarWidth}%` }}>
                  {showSingerInfo && <RightSidebarSingerInformation singer={singer} />}
                  {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
                  {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <MusicPlayer
                onToggleSingerInfo={toggleSingerInfo}
                onToggleLyrics={toggleLyrics}
                onToggleQueue={toggleQueue}
                onToggleDevice={toggleDevice}
                song={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                onNextTrack={handleNextTrack} // Truyền handleNextTrack vào MusicPlayer
                resetCurrentTime={resetCurrentTimeRef}
                playlist={currentPlaylistTracks}
                setCurrentSong={setCurrentSong}
              />
            ) : (
              <LoginBanner />
            )}
          </>
        )}

        {/* Chatbot Icon */}
        <div
          className="fixed bottom-20 right-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-red-600 transition-colors z-50"
          onClick={toggleChatbot}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>

        {/* Chatbot Component */}
        {showChatbot && (
          <div className="fixed bottom-20 right-4 z-50">
            <Chatbot onClose={toggleChatbot} />
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;