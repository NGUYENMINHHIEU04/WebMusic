import React from "react";
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const MiniPlayer = ({ isPlaying, togglePlay, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">SKYTOUR</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-white"
        >
          Đóng
        </button>
      </div>

      {/* Album Cover and Song Info */}
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

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button className="text-gray-400 hover:text-white">
          <FaHeart className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-white">
            <MdSkipPrevious className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            className="text-white hover:text-green-500"
          >
            {isPlaying ? (
              <FaPause className="w-8 h-8" />
            ) : (
              <FaPlay className="w-8 h-8" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white">
            <MdSkipNext className="w-6 h-6" />
          </button>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;