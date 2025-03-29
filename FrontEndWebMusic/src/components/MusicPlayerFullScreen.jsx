import React, { useState } from "react";
import { RxShuffle } from "react-icons/rx";
import { FaPause, FaPlay } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious, MdLyrics } from "react-icons/md";
import { LuRepeat, LuRepeat1 } from "react-icons/lu";
import { GoScreenNormal } from "react-icons/go";
import Lyrics from "./Lyrics";

const MusicPlayerFullScreen = ({
  isPlaying,
  togglePlay,
  currentTime,
  duration,
  formatTime,
  isShuffleActive,
  toggleShuffle,
  repeatMode,
  toggleRepeat,
  toggleFullScreen,
  onToggleSingerInfo,
  onToggleQueue,
  onToggleDevice,
  songTitle = "Đừng Làm Trái Tim Anh Đau",
  lyrics,
}) => {
  const [isLyricsVisible, setIsLyricsVisible] = useState(true);

  const handleToggleLyrics = () => {
    setIsLyricsVisible(!isLyricsVisible);
  };

  return (
    <div 
      className="w-full h-screen text-center relative flex flex-col"
      // Xóa background gradient để giống code mẫu (mặc định trắng hoặc tùy chỉnh nếu cần)
    >
      {/* Header - Thông tin bài hát */}
      <div className="flex items-center p-4 pt-6">
        <img 
          src="https://via.placeholder.com/60" 
          alt="Album Cover" 
          className="w-16 h-16 rounded-md shadow-md" 
        />
        <div className="ml-4 text-left">
          <h2 className="text-xl font-bold text-black">{songTitle}</h2> {/* Đổi text-white thành text-black */}
          <p className="text-gray-400">Sơn Tùng M-TP</p> {/* Giữ text-gray-400 */}
        </div>
      </div>

      {/* Phần lời bài hát hoặc ảnh bìa */}
      <div className="flex-grow flex flex-col justify-center px-8 max-w-4xl mx-auto w-full h-96">
        {isLyricsVisible ? (
          <Lyrics 
            songTitle={songTitle} 
            lyrics={lyrics} 
            onClose={handleToggleLyrics} 
          />
        ) : (
          <div>
            <img 
              src="https://via.placeholder.com/300" 
              alt="Album Cover Large" 
              className="w-64 h-64 mx-auto rounded-lg shadow-2xl mb-8" 
            />
            <h2 className="text-2xl font-bold mb-2 text-black">{songTitle}</h2> {/* Đổi text-white thành text-black */}
            <p className="text-gray-400">Sơn Tùng M-TP</p> {/* Giữ text-gray-400 */}
          </div>
        )}
      </div>

      {/* Thanh thời gian và điều khiển */}
      <div className="w-full pb-6 px-4">
        <div className="w-full flex items-center justify-between text-sm mb-2 text-gray-400">
          <span>{formatTime ? formatTime(currentTime) : "3:01"}</span>
          <div className="w-full mx-4 h-1 bg-gray-600 rounded-full"> {/* Đổi bg-gray-400 bg-opacity-40 thành bg-gray-600 */}
            <div 
              className="h-1 bg-green-500 rounded-full transition-all duration-100 ease-in-out" 
              style={{ width: currentTime && duration ? `${(currentTime / duration) * 100}%` : "45%" }}
            ></div> {/* Đổi bg-white thành bg-green-500 */}
          </div>
          <span>{formatTime ? formatTime(duration) : "4:39"}</span>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-6">
          <div className="relative group">
            <RxShuffle
              className={`w-6 h-6 cursor-pointer ${isShuffleActive ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
              onClick={toggleShuffle}
            />
            {isShuffleActive && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
          </div>

          <MdSkipPrevious className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />

          <button className=" w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            {isPlaying ? (
              <FaPause className="w-12 h-12 text-white cursor-pointer hover:scale-110 transition-transform duration-200" onClick={togglePlay} /> // Đổi text-blue-800 thành text-white
            ) : (
              <FaPlay className="w-12 h-12 text-white cursor-pointer hover:scale-110 transition-transform duration-200 ml-1" onClick={togglePlay} /> // Đổi text-blue-800 thành text-white
            )}
          </button>

          <MdSkipNext className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-transform duration-200" />

          <div className="relative group">
            {repeatMode === "inactive" ? (
              <LuRepeat className="w-6 h-6 cursor-pointer text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
            ) : repeatMode === "repeat" ? (
              <LuRepeat className="w-6 h-6 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
            ) : (
              <LuRepeat1 className="w-6 h-6 cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" onClick={toggleRepeat} />
            )}
            {["repeat", "repeat1"].includes(repeatMode) && (
              <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
            )}
          </div>

          <div className="relative group">
            <MdLyrics
              className={`w-6 h-5 cursor-pointer ${isLyricsVisible ? "text-green-500" : "text-gray-400 hover:text-white"} hover:scale-110 transition-transform duration-200`}
              onClick={handleToggleLyrics}
            />
            {isLyricsVisible && <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>}
          </div>

          <button onClick={toggleFullScreen} className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200">
            <GoScreenNormal className="w-6 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerFullScreen;

