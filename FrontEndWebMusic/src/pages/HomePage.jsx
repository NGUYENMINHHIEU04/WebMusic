// import React, { useState, useRef, useEffect } from "react";
// import LeftSidebar from "../components/LeftSidebar";
// import MainContent from "../components/MainContent";
// import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation";
// import MusicPlayer from "../components/MusicPlayer";
// import Header from "../components/Header";
// import Lyrics from "../components/Lyrics";
// import RightSidebarQueue from "../components/RightSidebarQueue";
// import RightSidebarDevice from "../components/RightSidebarDevice";
// import closed_hand from "../images/001-hand.png";
// import open_hand from "../images/002-palm.png";


// const Homepage = () => {
//   const [showSingerInfo, setShowSingerInfo] = useState(false);
//   const [showLyrics, setShowLyrics] = useState(false);
//   const [showQueue, setShowQueue] = useState(false);
//   const [showDevice, setShowDevice] = useState(false);
//   const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
//   const [rightSidebarWidth, setRightSidebarWidth] = useState(20);
//   const [isDraggingLeft, setIsDraggingLeft] = useState(false);
//   const [isDraggingRight, setIsDraggingRight] = useState(false);
//   const containerRef = useRef(null);

//   const singer = {
//     name: "Son Tung M-TP",
//     bio: "Ca sĩ, nhạc sĩ người Việt Nam",
//     image: "https://via.placeholder.com/150",
//   };

//   const song = {
//     title: "Chạy Ngay Đi",
//     lyrics: `Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     Chạy ngay đi trước khi
//     Mọi điều dần tồi tệ hơn
//     ...`,
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

//   useEffect(() => {
//     if (isDraggingLeft) {
//       window.addEventListener("mousemove", handleMouseMoveLeft);
//       window.addEventListener("mouseup", handleMouseUpLeft);
//     } else if (isDraggingRight) {
//       window.addEventListener("mousemove", handleMouseMoveRight);
//       window.addEventListener("mouseup", handleMouseUpRight);
//     } else {
//       window.removeEventListener("mousemove", handleMouseMoveLeft);
//       window.removeEventListener("mouseup", handleMouseUpLeft);
//       window.removeEventListener("mousemove", handleMouseMoveRight);
//       window.removeEventListener("mouseup", handleMouseUpRight);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMoveLeft);
//       window.removeEventListener("mouseup", handleMouseUpLeft);
//       window.removeEventListener("mousemove", handleMouseMoveRight);
//       window.removeEventListener("mouseup", handleMouseUpRight);
//     };
//   }, [isDraggingLeft, isDraggingRight]);

//   return (
//     <>
//       <style>
//         {`
//           /* Thanh phân cách giữa các layout */
//           .divider {
//             width: 2px;
//             background: transparent;
//             transition: background 0.2s;
//           }

//           .divider:hover {
//             background: #888; /* Màu xám khi hover */
//             cursor: url(${open_hand}) 16 16, auto; /* Bàn tay mở khi hover */
//           }

//           .divider:active {
//             background: #888; /* Màu xám khi kéo */
//             cursor: url(${closed_hand})16 16, auto; /* Bàn tay nắm khi nhấn */
//           }
//         `}
//       </style>
//       <div className="flex flex-col h-screen">
//         <Header />
//         <div
//           className="flex flex-1 p-1 bg-black overflow-y-auto custom-scrollbar"
//           ref={containerRef}
//         >
//           <div style={{ width: `${leftSidebarWidth}%` }}>
//             <LeftSidebar />
//           </div>

//           <div
//             className="divider"
//             onMouseDown={handleMouseDownLeft}
//           />

//           <div style={{ width: `calc(${100 - leftSidebarWidth - (showSingerInfo || showQueue || showDevice ? rightSidebarWidth : 0)}%)` }}>
//             {showLyrics ? (
//               <Lyrics songTitle={song.title} lyrics={song.lyrics} onClose={toggleLyrics} />
//             ) : (
//               <MainContent showSingerInfo={showSingerInfo} />
//             )}
//           </div>

//           {(showSingerInfo || showQueue || showDevice) && (
//             <div
//               className="divider"
//               onMouseDown={handleMouseDownRight}
//             />
//           )}

//           {(showSingerInfo || showQueue || showDevice) && (
//             <div style={{ width: `${rightSidebarWidth}%` }}>
//               {showSingerInfo && <RightSidebarSingerInformation singer={singer} />}
//               {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
//               {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
//             </div>
//           )}
//         </div>
//         <MusicPlayer
//           onToggleSingerInfo={toggleSingerInfo}
//           onToggleLyrics={toggleLyrics}
//           onToggleQueue={toggleQueue}
//           onToggleDevice={toggleDevice}
//           song={song}
//         />
//       </div>
//     </>
//   );
// };

// export default Homepage;

import React, { useState, useRef, useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import MainContent from '../components/MainContent';
import RightSidebarSingerInformation from '../components/RightSidebarSingerInformation';
import MusicPlayer from '../components/MusicPlayer';
import Header from '../components/Header';
import Lyrics from '../components/Lyrics';
import RightSidebarQueue from '../components/RightSidebarQueue';
import RightSidebarDevice from '../components/RightSidebarDevice';
import closed_hand from '../images/001-hand.png';
import open_hand from '../images/002-palm.png';

const Homepage = () => {
  const [showSingerInfo, setShowSingerInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(20);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(20);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái Play/Pause toàn cục
  const [currentPlayingCard, setCurrentPlayingCard] = useState(null); // Theo dõi card đang phát
  const containerRef = useRef(null);

  const singer = {
    name: 'Son Tung M-TP',
    bio: 'Ca sĩ, nhạc sĩ người Việt Nam',
    image: 'https://via.placeholder.com/150',
  };

  const song = {
    title: 'Chạy Ngay Đi',
    lyrics: `Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    ...`,
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

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true);
  };

  const handleMouseUpLeft = () => {
    setIsDraggingLeft(false);
  };

  const handleMouseMoveLeft = (e) => {
    if (!isDraggingLeft || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newX = e.clientX;
    const newWidthPercentage = (newX / containerWidth) * 100;

    if (newWidthPercentage >= 15 && newWidthPercentage <= 40) {
      setLeftSidebarWidth(newWidthPercentage);
    }
  };

  const handleMouseDownRight = () => {
    setIsDraggingRight(true);
  };

  const handleMouseUpRight = () => {
    setIsDraggingRight(false);
  };

  const handleMouseMoveRight = (e) => {
    if (!isDraggingRight || !containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const newX = e.clientX;
    const newRightWidthPercentage = ((containerWidth - newX) / containerWidth) * 100;

    if (newRightWidthPercentage >= 15 && newRightWidthPercentage <= 40) {
      setRightSidebarWidth(newRightWidthPercentage);
    }
  };

  // Hàm xử lý Play/Pause từ PlaylistCard
  const handlePlayPause = (cardIndex) => {
    if (currentPlayingCard !== cardIndex) {
      setCurrentPlayingCard(cardIndex); // Cập nhật card đang phát
      setIsPlaying(true); // Phát nhạc
    } else {
      setIsPlaying(!isPlaying); // Chuyển đổi Play/Pause
    }
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
                songTitle={song.title}
                lyrics={song.lyrics}
                onClose={toggleLyrics}
              />
            ) : (
              <MainContent
                showSingerInfo={showSingerInfo}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentPlayingCard={currentPlayingCard}
                handlePlayPause={handlePlayPause}
              />
            )}
          </div>

          {(showSingerInfo || showQueue || showDevice) && (
            <div className="divider" onMouseDown={handleMouseDownRight} />
          )}

          {(showSingerInfo || showQueue || showDevice) && (
            <div style={{ width: `${rightSidebarWidth}%` }}>
              {showSingerInfo && (
                <RightSidebarSingerInformation singer={singer} />
              )}
              {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
              {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
            </div>
          )}
        </div>
        <MusicPlayer
          onToggleSingerInfo={toggleSingerInfo}
          onToggleLyrics={toggleLyrics}
          onToggleQueue={toggleQueue}
          onToggleDevice={toggleDevice}
          song={song}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </>
  );
};

export default Homepage;