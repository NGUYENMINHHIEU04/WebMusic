// import React, { useState, useRef, useEffect } from "react";
// import { FaHeart } from "react-icons/fa";
// import { MdImportantDevices, MdLyrics, MdSkipNext, MdSkipPrevious } from "react-icons/md";
// import { RxShuffle } from "react-icons/rx";
// import musicImage from "../images/music.png";
// import { AiOutlinePlaySquare } from "react-icons/ai";
// import { LuRepeat, LuRepeat1 } from "react-icons/lu";
// import { HiMiniQueueList } from "react-icons/hi2";
// import { CgMiniPlayer } from "react-icons/cg";
// import { GoScreenFull } from "react-icons/go";
// import MiniPlayer from "./MiniPlayer";
// import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
// import { FiVolumeX, FiVolume, FiVolume1, FiVolume2 } from "react-icons/fi";
// import songFile from "../assets/song/ChuVitCon.mp3";
// import MusicPlayerFullScreen from "./MusicPlayerFullScreen";

// const MusicPlayer = ({
//   onToggleSingerInfo,
//   onToggleLyrics,
//   onToggleQueue,
//   onToggleDevice,
//   song,
// }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showMiniPlayer, setShowMiniPlayer] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(0.5);
//   const [isShuffleActive, setIsShuffleActive] = useState(false);
//   const [repeatMode, setRepeatMode] = useState("inactive");
//   const [activeRightIcon, setActiveRightIcon] = useState(null);
//   const [isLyricsVisible, setIsLyricsVisible] = useState(false); // New local state for lyrics
//   const musicPlayerRef = useRef(null);
//   const audioRef = useRef(new Audio(songFile));
//   const progressRef = useRef(null);

//   const getVolumeIcon = () => {
//     if (volume === 0) return <FiVolumeX className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
//     else if (volume <= 0.3) return <FiVolume className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
//     else if (volume <= 0.6) return <FiVolume1 className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
//     else return <FiVolume2 className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
//   };

//   useEffect(() => {
//     audioRef.current.volume = volume;
//     if (isPlaying) audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
//     else audioRef.current.pause();
//   }, [isPlaying, volume]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateTime = () => setCurrentTime(audio.currentTime);
//     const setAudioDuration = () => setDuration(audio.duration);
//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", setAudioDuration);
//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//       audio.removeEventListener("loadedmetadata", setAudioDuration);
//     };
//   }, []);

//   const togglePlay = () => setIsPlaying(!isPlaying);
//   const toggleMiniPlayer = () => setShowMiniPlayer(!showMiniPlayer);
//   const toggleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       musicPlayerRef.current.requestFullscreen().then(() => setIsFullScreen(true)).catch((err) => console.error("Fullscreen error:", err));
//     } else {
//       document.exitFullscreen().then(() => setIsFullScreen(false));
//     }
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     audioRef.current.volume = newVolume;
//   };

//   const handleSeek = (e) => {
//     const progressBar = progressRef.current;
//     const rect = progressBar.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const width = rect.width;
//     const newTime = (clickX / width) * duration;
//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const toggleShuffle = () => setIsShuffleActive(!isShuffleActive);
//   const toggleRepeat = () => {
//     setRepeatMode((prevMode) => (prevMode === "inactive" ? "repeat" : prevMode === "repeat" ? "repeat1" : "inactive"));
//   };

//   const toggleRightIcon = (icon) => {
//     if (activeRightIcon === icon) setActiveRightIcon(null);
//     else setActiveRightIcon(icon);
//   };

//   const handleToggleLyrics = () => {
//     setIsLyricsVisible(!isLyricsVisible); // Toggle local lyrics state
//     onToggleLyrics(); // Call parent toggle (for Homepage)
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => setIsFullScreen(document.fullscreenElement !== null);
//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
//   }, []);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return (
//     <>
//       <div
//         ref={musicPlayerRef}
//         className={`fixed ${isFullScreen ? "inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center" : "bottom-0 left-0 right-0 bg-gray-900"} text-white p-4`}
//       >
//         {isFullScreen ? (
//           <MusicPlayerFullScreen
//           isPlaying={isPlaying}
//           togglePlay={togglePlay}
//           currentTime={currentTime}
//           duration={duration}
//           formatTime={formatTime}
//           isShuffleActive={isShuffleActive}
//           toggleShuffle={toggleShuffle}
//           repeatMode={repeatMode}
//           toggleRepeat={toggleRepeat}
//           activeRightIcon={activeRightIcon}
//           toggleRightIcon={toggleRightIcon}
//           onToggleSingerInfo={onToggleSingerInfo}
//           onToggleLyrics={onToggleLyrics}
//           onToggleQueue={onToggleQueue}
//           onToggleDevice={onToggleDevice}
//           toggleFullScreen={toggleFullScreen}
//           songTitle={song.title}
//           lyrics={song.lyrics}
//           volume={volume} // Thêm prop volume
//           handleVolumeChange={handleVolumeChange} // Thêm prop handleVolumeChange
//           handleSeek={handleSeek} // Thêm prop handleSeek
//           />
//         ) : (
//           <div className="container mx-auto flex items-center justify-between">
//             <div className="flex items-center space-x-4 w-[30%]">
//               <img src={musicImage} alt="Album Cover" className="w-12 h-12 rounded shadow-md" />
//               <div>
//                 <p className="font-semibold">Chay Ngay Di - Sky Tour 2019</p>
//                 <p className="text-sm text-gray-400">Son Tung M-TP</p>
//               </div>
//               <div className="relative group">
//                 <FaHeart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
//                 <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                   Favorite
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col items-center space-y-2 w-[40%]">
//               <div className="flex items-center space-x-4">
//                 <div className="relative group">
//                   <RxShuffle
//                     className={`w-5 h-5 cursor-pointer ${isShuffleActive ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
//                     onClick={toggleShuffle}
//                   />
//                   {isShuffleActive && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//                   <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                     Enable shuffle
//                   </span>
//                 </div>
//                 <div className="relative group">
//                   <MdSkipPrevious className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
//                   <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                     Previous
//                   </span>
//                 </div>
//                 {isPlaying ? (
//                   <div className="relative group">
//                     <FaCirclePause className="w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={togglePlay} />
//                     <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                       Pause
//                     </span>
//                   </div>
//                 ) : (
//                   <div className="relative group">
//                     <FaCirclePlay className="w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={togglePlay} />
//                     <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                       Play
//                     </span>
//                   </div>
//                 )}
//                 <div className="relative group">
//                   <MdSkipNext className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
//                   <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                     Next
//                   </span>
//                 </div>
//                 <div className="relative group">
//                   {repeatMode === "inactive" ? (
//                     <LuRepeat className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
//                   ) : repeatMode === "repeat" ? (
//                     <LuRepeat className="w-5 h-5 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
//                   ) : (
//                     <LuRepeat1 className="w-5 h-5 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
//                   )}
//                   {["repeat", "repeat1"].includes(repeatMode) && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//                   <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
//                     Enable repeat
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2 w-[90%]">
//                 <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
//                 <div ref={progressRef} onClick={handleSeek} className="h-1 w-full bg-gray-600 rounded-full cursor-pointer">
//                   <div className="h-1 bg-green-500 rounded-full transition-all duration-100 ease-in-out" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
//                 </div>
//                 <span className="text-sm text-gray-400">{formatTime(duration)}</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-end space-x-4 w-[30%]">
//               <div className="relative group">
//                 <AiOutlinePlaySquare
//                   className={`w-5 h-5 cursor-pointer ${activeRightIcon === "singer" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
//                   onClick={() => { toggleRightIcon("singer"); onToggleSingerInfo(); }}
//                 />
//                 {activeRightIcon === "singer" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//               </div>
//               <div className="relative group">
//                 <MdLyrics
//                   className={`w-6 h-5 cursor-pointer ${isLyricsVisible ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
//                   onClick={handleToggleLyrics} // Use local handler
//                 />
//                 {isLyricsVisible && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//               </div>
//               <div className="relative group">
//                 <HiMiniQueueList
//                   className={`w-5 h-5 cursor-pointer ${activeRightIcon === "queue" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
//                   onClick={() => { toggleRightIcon("queue"); onToggleQueue(); }}
//                 />
//                 {activeRightIcon === "queue" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//               </div>
//               <div className="relative group">
//                 <MdImportantDevices
//                   className={`w-5 h-5 cursor-pointer ${activeRightIcon === "device" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
//                   onClick={() => { toggleRightIcon("device"); onToggleDevice(); }}
//                 />
//                 {activeRightIcon === "device" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
//               </div>
//               <div className="flex items-center space-x-2">
//                 {getVolumeIcon()}
//                 <input
//                   type="range"
//                   min="0"
//                   max="1"
//                   step="0.01"
//                   value={volume}
//                   onChange={handleVolumeChange}
//                   className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer accent-green-500 hover:accent-green-600 transition-colors duration-200"
//                 />
//               </div>
//             </div>
//             <CgMiniPlayer className="m-3 w-5 h-5 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={toggleMiniPlayer} />
//             <GoScreenFull className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={toggleFullScreen} />
//           </div>
//         )}
//       </div>

//       {showMiniPlayer && <MiniPlayer isPlaying={isPlaying} togglePlay={togglePlay} onClose={toggleMiniPlayer} />}
//     </>
//   );
// };

// export default MusicPlayer;


import React, { useState, useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { MdImportantDevices, MdLyrics, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxShuffle } from "react-icons/rx";
import musicImage from "../images/music.png";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { HiMiniQueueList } from "react-icons/hi2";
import { CgMiniPlayer } from "react-icons/cg";
import { GoScreenFull } from "react-icons/go";
import MiniPlayer from "./MiniPlayer";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { FiVolumeX, FiVolume, FiVolume1, FiVolume2 } from "react-icons/fi";
import songFile from "../assets/song/ChuVitCon.mp3";
import MusicPlayerFullScreen from "./MusicPlayerFullScreen";

const MusicPlayer = ({
  onToggleSingerInfo,
  onToggleLyrics,
  onToggleQueue,
  onToggleDevice,
  song,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [repeatMode, setRepeatMode] = useState("inactive");
  const [activeRightIcon, setActiveRightIcon] = useState(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState(false);
  const musicPlayerRef = useRef(null);
  const audioRef = useRef(new Audio(songFile));
  const progressRef = useRef(null);

  const getVolumeIcon = () => {
    if (volume === 0) return <FiVolumeX className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
    else if (volume <= 0.3) return <FiVolume className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
    else if (volume <= 0.6) return <FiVolume1 className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
    else return <FiVolume2 className="w-5 h-5 text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" />;
  };

  useEffect(() => {
    audioRef.current.volume = volume;
    if (isPlaying) audioRef.current.play().catch((err) => console.error("Error playing audio:", err));
    else audioRef.current.pause();
  }, [isPlaying, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMiniPlayer = () => setShowMiniPlayer(!showMiniPlayer);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      musicPlayerRef.current.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error("Fullscreen error:", err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullScreen(false))
        .catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSeek = (e) => {
    const progressBar = progressRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleShuffle = () => setIsShuffleActive(!isShuffleActive);
  const toggleRepeat = () => {
    setRepeatMode((prevMode) => (prevMode === "inactive" ? "repeat" : prevMode === "repeat" ? "repeat1" : "inactive"));
  };

  const toggleRightIcon = (icon) => {
    if (activeRightIcon === icon) setActiveRightIcon(null);
    else setActiveRightIcon(icon);
  };

  const handleToggleLyrics = () => {
    setIsLyricsVisible(!isLyricsVisible);
    onToggleLyrics();
  };

  // Đồng bộ trạng thái toàn màn hình
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement); // Cập nhật trạng thái dựa trên fullscreenElement
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div
        ref={musicPlayerRef}
        className={`fixed ${isFullScreen ? "inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center" : "bottom-0 left-0 right-0 bg-gray-900"} text-white p-4`}
      >
        {isFullScreen ? (
          <MusicPlayerFullScreen
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            currentTime={currentTime}
            duration={duration}
            formatTime={formatTime}
            isShuffleActive={isShuffleActive}
            toggleShuffle={toggleShuffle}
            repeatMode={repeatMode}
            toggleRepeat={toggleRepeat}
            toggleFullScreen={toggleFullScreen}
            onToggleSingerInfo={onToggleSingerInfo}
            onToggleLyrics={onToggleLyrics}
            onToggleQueue={onToggleQueue}
            onToggleDevice={onToggleDevice}
            songTitle={song.title}
            lyrics={song.lyrics}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            handleSeek={handleSeek}
          />
        ) : (
          <div className="container mx-auto flex items-center justify-between">
            {/* Phần giao diện không full screen giữ nguyên */}
            <div className="flex items-center space-x-4 w-[30%]">
              <img src={musicImage} alt="Album Cover" className="w-12 h-12 rounded shadow-md" />
              <div>
                <p className="font-semibold">Chay Ngay Di - Sky Tour 2019</p>
                <p className="text-sm text-gray-400">Son Tung M-TP</p>
              </div>
              <div className="relative group">
                <FaHeart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                  Favorite
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 w-[40%]">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <RxShuffle
                    className={`w-5 h-5 cursor-pointer ${isShuffleActive ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
                    onClick={toggleShuffle}
                  />
                  {isShuffleActive && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                    Enable shuffle
                  </span>
                </div>
                <div className="relative group">
                  <MdSkipPrevious className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                    Previous
                  </span>
                </div>
                {isPlaying ? (
                  <div className="relative group">
                    <FaCirclePause className="w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={togglePlay} />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                      Pause
                    </span>
                  </div>
                ) : (
                  <div className="relative group">
                    <FaCirclePlay className="w-8 h-8 text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={togglePlay} />
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                      Play
                    </span>
                  </div>
                )}
                <div className="relative group">
                  <MdSkipNext className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                    Next
                  </span>
                </div>
                <div className="relative group">
                  {repeatMode === "inactive" ? (
                    <LuRepeat className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
                  ) : repeatMode === "repeat" ? (
                    <LuRepeat className="w-5 h-5 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
                  ) : (
                    <LuRepeat1 className="w-5 h-5 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
                  )}
                  {["repeat", "repeat1"].includes(repeatMode) && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                    Enable repeat
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 w-[90%]">
                <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                <div ref={progressRef} onClick={handleSeek} className="h-1 w-full bg-gray-600 rounded-full cursor-pointer">
                  <div className="h-1 bg-green-500 rounded-full transition-all duration-100 ease-in-out" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
                </div>
                <span className="text-sm text-gray-400">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 w-[30%]">
              <div className="relative group">
                <AiOutlinePlaySquare
                  className={`w-5 h-5 cursor-pointer ${activeRightIcon === "singer" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
                  onClick={() => { toggleRightIcon("singer"); onToggleSingerInfo(); }}
                />
                {activeRightIcon === "singer" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
              </div>
              <div className="relative group">
                <MdLyrics
                  className={`w-6 h-5 cursor-pointer ${isLyricsVisible ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
                  onClick={handleToggleLyrics}
                />
                {isLyricsVisible && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
              </div>
              <div className="relative group">
                <HiMiniQueueList
                  className={`w-5 h-5 cursor-pointer ${activeRightIcon === "queue" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
                  onClick={() => { toggleRightIcon("queue"); onToggleQueue(); }}
                />
                {activeRightIcon === "queue" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
              </div>
              <div className="relative group">
                <MdImportantDevices
                  className={`w-5 h-5 cursor-pointer ${activeRightIcon === "device" ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
                  onClick={() => { toggleRightIcon("device"); onToggleDevice(); }}
                />
                {activeRightIcon === "device" && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
              </div>
              <div className="flex items-center space-x-2">
                {getVolumeIcon()}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-full cursor-pointer accent-green-500 hover:accent-green-600 transition-colors duration-200"
                />
              </div>
            </div>
            <CgMiniPlayer className="m-3 w-5 h-5 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={toggleMiniPlayer} />
            <GoScreenFull className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={toggleFullScreen} />
          </div>
        )}
      </div>

      {showMiniPlayer && <MiniPlayer isPlaying={isPlaying} togglePlay={togglePlay} onClose={toggleMiniPlayer} />}
    </>
  );
};

export default MusicPlayer;