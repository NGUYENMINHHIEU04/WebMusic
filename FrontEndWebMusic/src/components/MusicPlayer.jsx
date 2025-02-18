// import React from "react";
// import { useEffect } from 'react';
// import { CiRepeat } from "react-icons/ci";
// import { FaHeart, FaVolumeUp } from "react-icons/fa";
// import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
// import { MdImportantDevices, MdLyrics, MdSkipNext, MdSkipPrevious } from "react-icons/md";
// import { RxShuffle } from "react-icons/rx";
// import musicImage from "../images/music.png";
// import { AiOutlinePlaySquare } from "react-icons/ai";
// import { HiMiniQueueList } from "react-icons/hi2";
// import { CgMiniPlayer } from "react-icons/cg";
// import { GoScreenFull } from "react-icons/go";
// import MiniPlayer from "./MiniPlayer";

// const MusicPlayer = ({
//   onToggleSingerInfo,
//   onToggleLyrics,
//   onToggleQueue,
//   onToggleDevice,
// }) => {
//   const [isPlaying, setIsPlaying] = React.useState(false);
//   const [showMiniPlayer, setShowMiniPlayer] = React.useState(false);
//   const [isFullScreen, setIsFullScreen] = React.useState(false);
//   const musicPlayerRef = React.useRef(null);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMiniPlayer = () => {
//     setShowMiniPlayer(!showMiniPlayer); // Toggle hiển thị MiniPlayer
//   };

//   // Hàm toggle chế độ toàn màn hình
//   const toggleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       musicPlayerRef.current
//         .requestFullscreen()
//         .then(() => setIsFullScreen(true))
//         .catch((err) => console.error("Lỗi toàn màn hình:", err));
//     } else {
//       document
//         .exitFullscreen()
//         .then(() => setIsFullScreen(false));
//     }
//   };

//     // Lắng nghe sự kiện thoát toàn màn hình
//     useEffect(() => {
//       const handleFullscreenChange = () => {
//         setIsFullScreen(document.fullscreenElement !== null);
//       };
//       document.addEventListener("fullscreenchange", handleFullscreenChange);
//       return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     }, []);

//   return (
//     <>
//     <div ref={musicPlayerRef} 
//         className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Song Info (30% width) */}
//         <div className="flex items-center space-x-4 w-[30%]">
//           <img
//             src={musicImage}
//             alt="Album Cover"
//             className="w-12 h-12 rounded"
//           />
//           <div>
//             <p className="font-semibold">Chay Nagy Di - Sky Tour 2019</p>
//             <p className="text-sm text-gray-400">Son Tung M-TP</p>
//           </div>
//           <div className="relative group">
//             <FaHeart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
//             <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//               Favorite
//             </span>
//           </div>


//         </div>

//         {/* Player Controls (40% width) */}
//         <div className="flex flex-col items-center space-y-2 w-[40%]">
//           <div className="flex items-center space-x-4">
//             <div className="relative group">
//               <RxShuffle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//               <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                 Enable shuffle
//               </span>
//             </div>
//             <div className="relative group">
//               <MdSkipPrevious className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
//               <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                 Previous
//               </span>
//             </div>
//             {isPlaying ? (
//               <div className="relative group">
//                 <FaCirclePause className="w-8 h-8 text-white cursor-pointer" onClick={togglePlay} />
//                 <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                   Pause
//                 </span>
//               </div>
//             ) : (
//               <div className="relative group">
//                 <FaCirclePlay className="w-8 h-8 text-white cursor-pointer" onClick={togglePlay} />
//                 <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                   Play
//                 </span>
//               </div>
//             )}
//             <div className="relative group">
//               <MdSkipNext className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
//               <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                 Next
//               </span>
//             </div>
//             <div className="relative group">
//               <CiRepeat className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//               <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
//                    transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
//                    whitespace-nowrap">
//                 Enable repeat
//               </span>
//             </div>
//           </div>

//           {/* Seek Bar (90% width of Player Controls) */}
//           <div className="flex items-center space-x-2 w-[90%]">
//             <span className="text-sm text-gray-400">0:00</span>
//             <div className="h-1 w-full bg-gray-700 rounded-full">
//               <div className="h-1 bg-green-500 rounded-full" style={{ width: "30%" }}></div>
//             </div>
//             <span className="text-sm text-gray-400">3:45</span>
//           </div>
//         </div>

//         {/* Volume Control (30% width) */}
//         <div className="flex items-center justify-end space-x-4 w-[30%]">
//           <AiOutlinePlaySquare
//             className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
//             onClick={onToggleSingerInfo}
//           />
//           <MdLyrics
//             className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
//             onClick={onToggleLyrics} // Thêm sự kiện onClick để toggle hiển thị Lyrics
//           />
//           <HiMiniQueueList
//             className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
//             onClick={onToggleQueue}
//           />
//           <MdImportantDevices
//             className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
//             onClick={onToggleDevice}
//           />
//           <FaVolumeUp className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
//           <div className="h-1 w-20 bg-gray-700 rounded-full">
//             <div className="h-1 bg-green-500 rounded-full" style={{ width: "70%" }}></div>
//           </div>
//         </div>
//           <CgMiniPlayer 
//             className="m-3 w-5 h-5 text-gray-400 hover:text-white cursor-pointer" 
//             onClick={toggleMiniPlayer} 
//           />
//         <GoScreenFull 
//         className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" 
//         onClick={toggleFullScreen}/>
//       </div>
//     </div>


//      {/* Hiển thị MiniPlayer nếu showMiniPlayer là true */}
//       {showMiniPlayer && (
//         <MiniPlayer
//           isPlaying={isPlaying}
//           togglePlay={togglePlay}
//           onClose={toggleMiniPlayer} // Truyền hàm đóng MiniPlayer
//         />
//       )}
//     </>
//   );
// };

// export default MusicPlayer;

import React, { useState, useRef, useEffect } from "react";
import { CiRepeat } from "react-icons/ci";
import { FaHeart, FaVolumeUp, FaPause, FaPlay } from "react-icons/fa";
import { MdImportantDevices, MdLyrics, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxShuffle } from "react-icons/rx";
import musicImage from "../images/music.png";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { HiMiniQueueList } from "react-icons/hi2";
import { CgMiniPlayer } from "react-icons/cg";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import MiniPlayer from "./MiniPlayer";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

const MusicPlayer = ({
  onToggleSingerInfo,
  onToggleLyrics,
  onToggleQueue,
  onToggleDevice,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const musicPlayerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMiniPlayer = () => {
    setShowMiniPlayer(!showMiniPlayer);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      musicPlayerRef.current
        .requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error("Lỗi toàn màn hình:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullScreen(false));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <>
      <div
        ref={musicPlayerRef}
        className={`fixed ${isFullScreen
            ? "inset-0 bg-gray-900 flex flex-col items-center justify-center"
            : "bottom-0 left-0 right-0"
          } fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4`}
      >
        {isFullScreen ? (
          <div className="w-full max-w-4xl text-center">
            <p className="text-gray-400 text-sm mb-2">PLAYING FROM ARTIST</p>
            <h1 className="text-3xl font-bold mb-4">Son Tung M-TP</h1>

            <img
              src={musicImage}
              alt="Album Cover"
              className="w-64 h-64 rounded-lg mx-auto mb-8"
            />

            <h2 className="text-2xl font-bold mb-2">SKYTOUR</h2>
            <p className="text-lg">Chay Ngay Di - Sky Tour 2019</p>
            <p className="text-gray-400 mt-2">Son Tung M-TP</p>

            <div className="mt-8 w-full max-w-2xl mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>0:41</span>
                <span>5:09</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full">
                <div
                  className="h-1 bg-green-500 rounded-full"
                  style={{ width: "15%" }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8">
              <RxShuffle className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <MdSkipPrevious className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />
              {isPlaying ? (
                <FaPause
                  className="w-12 h-12 text-white cursor-pointer"
                  onClick={() => setIsPlaying(false)}
                />
              ) : (
                <FaPlay
                  className="w-12 h-12 text-white cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                />
              )}
              <MdSkipNext className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />
              <CiRepeat className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
              <div className="relative group">
                <MdLyrics
                  className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
                  onClick={onToggleLyrics} // Kết nối sự kiện
                />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
           transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
           whitespace-nowrap">
                  Lyrics
                </span>
              </div>
            </div>

            <button
              onClick={toggleFullScreen}
              className="mt-8 text-gray-400 hover:text-white"
            >
              <GoScreenNormal className="w-6 h-6" />
            </button>
          </div>
        ) : (
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 w-[30%]">
              <img
                src={musicImage}
                alt="Album Cover"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="font-semibold">Chay Nagy Di - Sky Tour 2019</p>
                <p className="text-sm text-gray-400">Son Tung M-TP</p>
              </div>
              <div className="relative group">
                <FaHeart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                       transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                       whitespace-nowrap">
                  Favorite
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 w-[40%]">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <RxShuffle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                         transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                         whitespace-nowrap">
                    Enable shuffle
                  </span>
                </div>
                <div className="relative group">
                  <MdSkipPrevious className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                         transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                         whitespace-nowrap">
                    Previous
                  </span>
                </div>
                {isPlaying ? (
                  <div className="relative group">
                    <FaCirclePause className="w-8 h-8 text-white cursor-pointer" onClick={togglePlay} />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                           transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                           whitespace-nowrap">
                      Pause
                    </span>
                  </div>
                ) : (
                  <div className="relative group">
                    <FaCirclePlay className="w-8 h-8 text-white cursor-pointer" onClick={togglePlay} />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                           transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                           whitespace-nowrap">
                      Play
                    </span>
                  </div>
                )}
                <div className="relative group">
                  <MdSkipNext className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                         transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                         whitespace-nowrap">
                    Next
                  </span>
                </div>
                <div className="relative group">
                  <CiRepeat className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100
                         transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg 
                         whitespace-nowrap">
                    Enable repeat
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-[90%]">
                <span className="text-sm text-gray-400">0:00</span>
                <div className="h-1 w-full bg-gray-700 rounded-full">
                  <div className="h-1 bg-green-500 rounded-full" style={{ width: "30%" }}></div>
                </div>
                <span className="text-sm text-gray-400">3:45</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 w-[30%]">
              <AiOutlinePlaySquare
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={onToggleSingerInfo}
              />
              <MdLyrics
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={onToggleLyrics}
              />
              <HiMiniQueueList
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={onToggleQueue}
              />
              <MdImportantDevices
                className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                onClick={onToggleDevice}
              />
              <FaVolumeUp className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <div className="h-1 w-20 bg-gray-700 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            <CgMiniPlayer
              className="m-3 w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
              onClick={toggleMiniPlayer}
            />
            <GoScreenFull
              className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
              onClick={toggleFullScreen}
            />
          </div>
        )}
      </div>

      {showMiniPlayer && (
        <MiniPlayer
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          onClose={toggleMiniPlayer}
        />
      )}
    </>
  );
};

export default MusicPlayer;