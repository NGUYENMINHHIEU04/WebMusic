import React, { useState } from 'react';

const PlaylistCard = ({ index, image, title, artists, onCardClick, isPlaying, onPlayPause }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    onPlayPause();
  };

  return (
    <div
      className="relative bg-[#181818] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#282828] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick}
    >
      <img src={image} alt={title} className="w-full h-44 object-cover" />
      <div
        className={`absolute right-3 bottom-14 transform transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#1ED760] transition-colors duration-200"
          onClick={handlePlayPauseClick}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-white text-base font-bold">{title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{artists}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;