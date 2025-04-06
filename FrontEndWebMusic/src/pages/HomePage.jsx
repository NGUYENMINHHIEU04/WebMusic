// // import React, { useState, useRef, useEffect } from 'react';
// // import LeftSidebar from '../components/LeftSidebar';
// // import MainContent from '../components/MainContent';
// // import RightSidebarSingerInformation from '../components/RightSidebarSingerInformation';
// // import MusicPlayer from '../components/MusicPlayer';
// // import Header from '../components/Header';
// // import Lyrics from '../components/Lyrics';
// // import RightSidebarQueue from '../components/RightSidebarQueue';
// // import RightSidebarDevice from '../components/RightSidebarDevice';
// // import closed_hand from '../images/001-hand.png';
// // import open_hand from '../images/002-palm.png';

// // const Homepage = () => {
// //   const [showSingerInfo, setShowSingerInfo] = useState(false);
// //   const [showLyrics, setShowLyrics] = useState(false);
// //   const [showQueue, setShowQueue] = useState(false);
// //   const [showDevice, setShowDevice] = useState(false);
// //   const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
// //   const [rightSidebarWidth, setRightSidebarWidth] = useState(20);
// //   const [isDraggingLeft, setIsDraggingLeft] = useState(false);
// //   const [isDraggingRight, setIsDraggingRight] = useState(false);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentPlayingCard, setCurrentPlayingCard] = useState(null);
// //   const [currentSong, setCurrentSong] = useState({
// //     title: 'Chạy Ngay Đi',
// //     artist: 'Son Tung M-TP',
// //     url: '/assets/song/ChuVitCon.mp3', // Bài hát mặc định
// //     lyrics: `Chạy ngay đi trước khi
// //     Mọi điều dần tồi tệ hơn
// //     Chạy ngay đi trước khi
// //     Mọi điều dần tồi tệ hơn
// //     Chạy ngay đi trước khi
// //     Mọi điều dần tồi tệ hơn
// //     ...`,
// //   });
// //   const containerRef = useRef(null);

// //   const singer = {
// //     name: 'Son Tung M-TP',
// //     bio: 'Ca sĩ, nhạc sĩ người Việt Nam',
// //     image: 'https://via.placeholder.com/150',
// //   };

// //   const toggleSingerInfo = () => {
// //     setShowSingerInfo(!showSingerInfo);
// //     setShowQueue(false);
// //     setShowDevice(false);
// //   };

// //   const toggleLyrics = () => {
// //     setShowLyrics(!showLyrics);
// //   };

// //   const toggleQueue = () => {
// //     setShowQueue(!showQueue);
// //     setShowSingerInfo(false);
// //     setShowDevice(false);
// //   };

// //   const toggleDevice = () => {
// //     setShowDevice(!showDevice);
// //     setShowSingerInfo(false);
// //     setShowQueue(false);
// //   };

// //   const handleMouseDownLeft = () => {
// //     setIsDraggingLeft(true);
// //   };

// //   const handleMouseUpLeft = () => {
// //     setIsDraggingLeft(false);
// //   };

// //   const handleMouseMoveLeft = (e) => {
// //     if (!isDraggingLeft || !containerRef.current) return;

// //     const containerWidth = containerRef.current.offsetWidth;
// //     const newX = e.clientX;
// //     const newWidthPercentage = (newX / containerWidth) * 100;

// //     if (newWidthPercentage >= 15 && newWidthPercentage <= 40) {
// //       setLeftSidebarWidth(newWidthPercentage);
// //     }
// //   };

// //   const handleMouseDownRight = () => {
// //     setIsDraggingRight(true);
// //   };

// //   const handleMouseUpRight = () => {
// //     setIsDraggingRight(false);
// //   };

// //   const handleMouseMoveRight = (e) => {
// //     if (!isDraggingRight || !containerRef.current) return;

// //     const containerWidth = containerRef.current.offsetWidth;
// //     const newX = e.clientX;
// //     const newRightWidthPercentage = ((containerWidth - newX) / containerWidth) * 100;

// //     if (newRightWidthPercentage >= 15 && newRightWidthPercentage <= 40) {
// //       setRightSidebarWidth(newRightWidthPercentage);
// //     }
// //   };

// //   const handlePlayPause = (cardIndex) => {
// //     if (currentPlayingCard !== cardIndex) {
// //       setCurrentPlayingCard(cardIndex);
// //       setIsPlaying(true);
// //     } else {
// //       setIsPlaying(!isPlaying);
// //     }
// //   };

// //   const handleTrackSelect = (track) => {
// //     setCurrentSong({
// //       title: track.title,
// //       artist: track.artist,
// //       url: track.url,
// //       lyrics: track.lyrics || '', // Nếu bài hát có lời thì truyền vào, nếu không thì để rỗng
// //     });
// //   };

// //   useEffect(() => {
// //     if (isDraggingLeft) {
// //       window.addEventListener('mousemove', handleMouseMoveLeft);
// //       window.addEventListener('mouseup', handleMouseUpLeft);
// //     } else if (isDraggingRight) {
// //       window.addEventListener('mousemove', handleMouseMoveRight);
// //       window.addEventListener('mouseup', handleMouseUpRight);
// //     } else {
// //       window.removeEventListener('mousemove', handleMouseMoveLeft);
// //       window.removeEventListener('mouseup', handleMouseUpLeft);
// //       window.removeEventListener('mousemove', handleMouseMoveRight);
// //       window.removeEventListener('mouseup', handleMouseUpRight);
// //     }

// //     return () => {
// //       window.removeEventListener('mousemove', handleMouseMoveLeft);
// //       window.removeEventListener('mouseup', handleMouseUpLeft);
// //       window.removeEventListener('mousemove', handleMouseMoveRight);
// //       window.removeEventListener('mouseup', handleMouseUpRight);
// //     };
// //   }, [isDraggingLeft, isDraggingRight]);

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .divider {
// //             width: 2px;
// //             background: transparent;
// //             transition: background 0.2s;
// //           }
// //           .divider:hover {
// //             background: #888;
// //             cursor: url(${open_hand}) 16 16, auto;
// //           }
// //           .divider:active {
// //             background: #888;
// //             cursor: url(${closed_hand}) 16 16, auto;
// //           }
// //         `}
// //       </style>
// //       <div className="flex flex-col h-screen">
// //         <Header />
// //         <div
// //           className="flex flex-1 p-1 bg-black overflow-y-auto custom-scrollbar"
// //           ref={containerRef}
// //         >
// //           <div style={{ width: `${leftSidebarWidth}%` }}>
// //             <LeftSidebar />
// //           </div>

// //           <div className="divider" onMouseDown={handleMouseDownLeft} />

// //           <div
// //             style={{
// //               width: `calc(${100 - leftSidebarWidth - (showSingerInfo || showQueue || showDevice ? rightSidebarWidth : 0)}%)`,
// //             }}
// //           >
// //             {showLyrics ? (
// //               <Lyrics
// //                 songTitle={currentSong.title}
// //                 lyrics={currentSong.lyrics}
// //                 onClose={toggleLyrics}
// //               />
// //             ) : (
// //               <MainContent
// //                 showSingerInfo={showSingerInfo}
// //                 isPlaying={isPlaying}
// //                 setIsPlaying={setIsPlaying}
// //                 currentPlayingCard={currentPlayingCard}
// //                 handlePlayPause={handlePlayPause}
// //                 onTrackSelect={handleTrackSelect} // Truyền callback xuống MainContent
// //               />
// //             )}
// //           </div>

// //           {(showSingerInfo || showQueue || showDevice) && (
// //             <div className="divider" onMouseDown={handleMouseDownRight} />
// //           )}

// //           {(showSingerInfo || showQueue || showDevice) && (
// //             <div style={{ width: `${rightSidebarWidth}%` }}>
// //               {showSingerInfo && (
// //                 <RightSidebarSingerInformation singer={singer} />
// //               )}
// //               {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
// //               {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
// //             </div>
// //           )}
// //         </div>
// //         <MusicPlayer
// //           onToggleSingerInfo={toggleSingerInfo}
// //           onToggleLyrics={toggleLyrics}
// //           onToggleQueue={toggleQueue}
// //           onToggleDevice={toggleDevice}
// //           song={currentSong} // Truyền currentSong xuống MusicPlayer
// //           isPlaying={isPlaying}
// //           setIsPlaying={setIsPlaying}
// //         />
// //       </div>
// //     </>
// //   );
// // };

// // export default Homepage;

// // Homepage.js
// import React, { useContext, useState, useRef, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import LeftSidebar from '../components/LeftSidebar';
// import MainContent from '../components/MainContent';
// import RightSidebarSingerInformation from '../components/RightSidebarSingerInformation';
// import MusicPlayer from '../components/MusicPlayer';
// import Header from '../components/Header';
// import Lyrics from '../components/Lyrics';
// import RightSidebarQueue from '../components/RightSidebarQueue';
// import RightSidebarDevice from '../components/RightSidebarDevice';
// import LoginBanner from '../components/LoginBanner';
// import LoginPage from '../components/LoginPage';
// import closed_hand from '../images/001-hand.png';
// import open_hand from '../images/002-palm.png';
// import { useNavigate } from 'react-router-dom';

// const Homepage = () => {
//   const { isLoggedIn } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [showLoginPage, setShowLoginPage] = useState(false); // Trạng thái hiển thị LoginPage
//   const [showSingerInfo, setShowSingerInfo] = useState(false);
//   const [showLyrics, setShowLyrics] = useState(false);
//   const [showQueue, setShowQueue] = useState(false);
//   const [showDevice, setShowDevice] = useState(false);
//   const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
//   const [rightSidebarWidth, setRightSidebarWidth] = useState(20);
//   const [isDraggingLeft, setIsDraggingLeft] = useState(false);
//   const [isDraggingRight, setIsDraggingRight] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentPlayingCard, setCurrentPlayingCard] = useState(null);
//   const [currentSong, setCurrentSong] = useState({
//     title: 'Chạy Ngay Đi',
//     artist: 'Son Tung M-TP',
//     url: '/assets/song/ChuVitCon.mp3',
//     lyrics: `Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     ...`,
//   });
//   const containerRef = useRef(null);

//   const singer = {
//     name: 'Son Tung M-TP',
//     bio: 'Ca sĩ, nhạc sĩ người Việt Nam',
//     image: 'https://via.placeholder.com/150',
//   };

//   const toggleSingerInfo = () => {
//     setShowSingerInfo(!showSingerInfo);
//     setShowQueue(false);
//     setShowDevice(false);
//   };

//   const toggleLyrics = () => {
//     setShowLyrics(!showLyrics);
//   };

//   const toggleQueue = () => {
//     setShowQueue(!showQueue);
//     setShowSingerInfo(false);
//     setShowDevice(false);
//   };

//   const toggleDevice = () => {
//     setShowDevice(!showDevice);
//     setShowSingerInfo(false);
//     setShowQueue(false);
//   };

//   const handleMouseDownLeft = () => {
//     setIsDraggingLeft(true);
//   };

//   const handleMouseUpLeft = () => {
//     setIsDraggingLeft(false);
//   };

//   const handleMouseMoveLeft = (e) => {
//     if (!isDraggingLeft || !containerRef.current) return;

//     const containerWidth = containerRef.current.offsetWidth;
//     const newX = e.clientX;
//     const newWidthPercentage = (newX / containerWidth) * 100;

//     if (newWidthPercentage >= 15 && newWidthPercentage <= 40) {
//       setLeftSidebarWidth(newWidthPercentage);
//     }
//   };

//   const handleMouseDownRight = () => {
//     setIsDraggingRight(true);
//   };

//   const handleMouseUpRight = () => {
//     setIsDraggingRight(false);
//   };

//   const handleMouseMoveRight = (e) => {
//     if (!isDraggingRight || !containerRef.current) return;

//     const containerWidth = containerRef.current.offsetWidth;
//     const newX = e.clientX;
//     const newRightWidthPercentage = ((containerWidth - newX) / containerWidth) * 100;

//     if (newRightWidthPercentage >= 15 && newRightWidthPercentage <= 40) {
//       setRightSidebarWidth(newRightWidthPercentage);
//     }
//   };

//   const handlePlayPause = (cardIndex) => {
//     if (!isLoggedIn) {
//       setShowLoginPage(true); // Hiển thị LoginPage nếu chưa đăng nhập
//     } else {
//       if (currentPlayingCard !== cardIndex) {
//         setCurrentPlayingCard(cardIndex);
//         setIsPlaying(true);
//       } else {
//         setIsPlaying(!isPlaying);
//       }
//     }
//   };

//   const handleTrackSelect = (track) => {
//     if (!isLoggedIn) {
//       setShowLoginPage(true); // Hiển thị LoginPage nếu chưa đăng nhập
//     } else {
//       setCurrentSong({
//         title: track.title,
//         artist: track.artist,
//         url: track.url,
//         lyrics: track.lyrics || '',
//       });
//     }
//   };

//   const handleLoginRedirect = () => {
//     navigate('/auth'); // Điều hướng đến trang đăng nhập
//   };

//   useEffect(() => {
//     if (isDraggingLeft) {
//       window.addEventListener('mousemove', handleMouseMoveLeft);
//       window.addEventListener('mouseup', handleMouseUpLeft);
//     } else if (isDraggingRight) {
//       window.addEventListener('mousemove', handleMouseMoveRight);
//       window.addEventListener('mouseup', handleMouseUpRight);
//     } else {
//       window.removeEventListener('mousemove', handleMouseMoveLeft);
//       window.removeEventListener('mouseup', handleMouseUpLeft);
//       window.removeEventListener('mousemove', handleMouseMoveRight);
//       window.removeEventListener('mouseup', handleMouseUpRight);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMoveLeft);
//       window.removeEventListener('mouseup', handleMouseUpLeft);
//       window.removeEventListener('mousemove', handleMouseMoveRight);
//       window.removeEventListener('mouseup', handleMouseUpRight);
//     };
//   }, [isDraggingLeft, isDraggingRight]);

//   return (
//     <>
//       <style>
//         {`
//           .divider {
//             width: 2px;
//             background: transparent;
//             transition: background 0.2s;
//           }
//           .divider:hover {
//             background: #888;
//             cursor: url(${open_hand}) 16 16, auto;
//           }
//           .divider:active {
//             background: #888;
//             cursor: url(${closed_hand}) 16 16, auto;
//           }
//         `}
//       </style>
//       <div className="flex flex-col h-screen">
//         <Header />
//         {showLoginPage ? (
//           <LoginPage onLogin={handleLoginRedirect} />
//         ) : (
//           <>
//             <div
//               className="flex flex-1 p-1 bg-black overflow-y-auto custom-scrollbar"
//               ref={containerRef}
//             >
//               <div style={{ width: `${leftSidebarWidth}%` }}>
//                 <LeftSidebar />
//               </div>

//               <div className="divider" onMouseDown={handleMouseDownLeft} />

//               <div
//                 style={{
//                   width: `calc(${100 - leftSidebarWidth - (showSingerInfo || showQueue || showDevice ? rightSidebarWidth : 0)}%)`,
//                 }}
//               >
//                 {showLyrics ? (
//                   <Lyrics
//                     songTitle={currentSong.title}
//                     lyrics={currentSong.lyrics}
//                     onClose={toggleLyrics}
//                   />
//                 ) : (
//                   <MainContent
//                     showSingerInfo={showSingerInfo}
//                     isPlaying={isPlaying}
//                     setIsPlaying={setIsPlaying}
//                     currentPlayingCard={currentPlayingCard}
//                     handlePlayPause={handlePlayPause}
//                     onTrackSelect={handleTrackSelect}
//                   />
//                 )}
//               </div>

//               {(showSingerInfo || showQueue || showDevice) && (
//                 <div className="divider" onMouseDown={handleMouseDownRight} />
//               )}

//               {(showSingerInfo || showQueue || showDevice) && (
//                 <div style={{ width: `${rightSidebarWidth}%` }}>
//                   {showSingerInfo && (
//                     <RightSidebarSingerInformation singer={singer} />
//                   )}
//                   {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
//                   {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
//                 </div>
//               )}
//             </div>
//             {isLoggedIn ? (
//               <MusicPlayer
//                 onToggleSingerInfo={toggleSingerInfo}
//                 onToggleLyrics={toggleLyrics}
//                 onToggleQueue={toggleQueue}
//                 onToggleDevice={toggleDevice}
//                 song={currentSong}
//                 isPlaying={isPlaying}
//                 setIsPlaying={setIsPlaying}
//               />
//             ) : (
//               <LoginBanner />
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Homepage;

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

const Homepage = () => {
  const { isLoggedIn, userId, logout } = useContext(AuthContext); // Lấy userId từ AuthContext
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

  // Khởi tạo currentSong từ localStorage dựa trên userId
  const [currentSong, setCurrentSong] = useState(() => {
    if (!userId) return null; // Nếu chưa đăng nhập, trả về null
    const savedSong = localStorage.getItem(`currentSong_${userId}`);
    return savedSong ? JSON.parse(savedSong) : null;
  });

  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([]);
  const containerRef = useRef(null);
  const resetCurrentTimeRef = useRef(() => {});

  // Cập nhật currentSong trong localStorage khi nó thay đổi
  useEffect(() => {
    if (!userId) return; // Không lưu nếu chưa đăng nhập
    if (currentSong) {
      localStorage.setItem(`currentSong_${userId}`, JSON.stringify(currentSong));
    } else {
      localStorage.removeItem(`currentSong_${userId}`);
    }
  }, [currentSong, userId]);

  // Khi userId thay đổi (đăng nhập/đăng xuất), đọc lại currentSong từ localStorage
  useEffect(() => {
    if (!userId) {
      setCurrentSong(null); // Xóa currentSong nếu không có userId (đăng xuất)
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

  const handlePlayPause = (cardIndex) => {
    if (!isLoggedIn) {
      setShowLoginPage(true);
    } else {
      if (currentPlayingCard !== cardIndex) {
        setCurrentPlayingCard(cardIndex);
        setIsPlaying(true);
      } else {
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleTrackSelect = (track, tracks) => {
    if (!isLoggedIn) {
      setShowLoginPage(true);
    } else {
      setCurrentSong({
        title: track.title,
        artist: track.artist,
        url: track.url,
        lyrics: track.lyrics || '',
      });
      setCurrentPlaylistTracks(tracks);
      setIsPlaying(true);
    }
  };

  const handleArtistSelect = (artist) => {
    setCurrentArtist(artist);
  };

  const handleNextTrack = () => {
    if (currentPlaylistTracks.length === 0) return;

    const currentIndex = currentPlaylistTracks.findIndex(
      (track) => track.url === currentSong.url
    );
    const nextIndex = (currentIndex + 1) % currentPlaylistTracks.length;
    const nextTrack = currentPlaylistTracks[nextIndex];

    setCurrentSong({
      title: nextTrack.title,
      artist: nextTrack.artist,
      url: nextTrack.url,
      lyrics: nextTrack.lyrics || '',
    });
    setIsPlaying(true);
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