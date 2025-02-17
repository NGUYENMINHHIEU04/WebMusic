import React from "react";
import { CiRepeat } from "react-icons/ci";
import { FaHeart, FaVolumeUp } from "react-icons/fa";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { MdImportantDevices, MdLyrics, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxShuffle } from "react-icons/rx";
import musicImage from "../images/music.png";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { HiMiniQueueList } from "react-icons/hi2";
import { CgMiniPlayer } from "react-icons/cg";
import { GoScreenFull } from "react-icons/go";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Song Info (30% width) */}
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
          <FaHeart className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* Player Controls (40% width) */}
        <div className="flex flex-col items-center space-y-2 w-[40%]">
          <div className="flex items-center space-x-4">
            <RxShuffle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <MdSkipPrevious className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            {isPlaying ? (
              <FaCirclePause
                className="w-8 h-8 text-white cursor-pointer"
                onClick={togglePlay}
              />
            ) : (
              <FaCirclePlay
                className="w-8 h-8 text-white cursor-pointer"
                onClick={togglePlay}
              />
            )}
            <MdSkipNext className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            <CiRepeat className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>

          {/* Seek Bar (90% width of Player Controls) */}
          <div className="flex items-center space-x-2 w-[90%]">
            <span className="text-sm text-gray-400">0:00</span>
            <div className="h-1 w-full bg-gray-700 rounded-full">
              <div className="h-1 bg-green-500 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <span className="text-sm text-gray-400">3:45</span>
          </div>
        </div>

        {/* Volume Control (30% width) */}
        <div className="flex items-center justify-end space-x-4 w-[30%]">
          <AiOutlinePlaySquare className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
          <MdLyrics className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
          <HiMiniQueueList className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
          <MdImportantDevices className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
          <FaVolumeUp className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <div className="h-1 w-20 bg-gray-700 rounded-full">
            <div className="h-1 bg-green-500 rounded-full" style={{ width: "70%" }}></div>
          </div>
        </div>
          <CgMiniPlayer className="m-3 w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <GoScreenFull className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"/>
      </div>
    </div>
  );
};

export default MusicPlayer;