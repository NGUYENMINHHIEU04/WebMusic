import React from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const MiniPlayer = ({ isPlaying, togglePlay, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Mini Player</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-white"
        >
          Đóng
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Album Cover"
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="font-semibold">Chay Nagy Di</p>
          <p className="text-sm text-gray-400">Son Tung M-TP</p>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-4">
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
      </div>
    </div>
  );
};

export default MiniPlayer;