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

const Homepage = () => {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showSingerInfo, setShowSingerInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
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
  const containerRef = useRef(null);
  const resetCurrentTimeRef = useRef(() => {});

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

  // Nếu PlaylistCard mới được chọn hoặc đang không phát
  if (currentPlayingCard !== cardIndex || currentPlaylistId !== playlist.id || !isPlaying) {
    setCurrentPlayingCard(cardIndex);
    setCurrentPlaylistId(playlist.id);
    const tracks = await fetchTracks(playlist);
    if (tracks.length > 0) {
      // Reset thời gian về 0 khi chọn PlaylistCard mới
      resetCurrentTimeRef.current(); // Reset thời gian phát
      handleTrackSelect(tracks[0], tracks, playlist.id, cardIndex);
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
    return formattedTracks;
  };

  const handleTrackSelect = (track, tracks, playlistId, cardIndex) => {
    setCurrentSong({
      title: track.title,
      artist: track.artist,
      url: track.url,
      lyrics: track.lyrics || '',
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
    // Logic đã được xử lý trong MusicPlayer
  };

  const handleLoginRedirect = () => {
    navigate('/auth');
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
      <div className="flex flex-col h-screen">
        <Header />
        {showLoginPage ? (
          <LoginPage onLogin={handleLoginRedirect} />
        ) : (
          <>
            <div
              className="flex flex-1 p-1 bg-black overflow-y-auto custom-scrollbar"
              ref={containerRef}
            >
              <div style={{ width: `${leftSidebarWidth}%` }}>
                <LeftSidebar />
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
                onNextTrack={handleNextTrack}
                resetCurrentTime={resetCurrentTimeRef}
                playlist={currentPlaylistTracks} // Truyền currentPlaylistTracks
                setCurrentSong={setCurrentSong} // Truyền setCurrentSong
              />
            ) : (
              <LoginBanner />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Homepage;