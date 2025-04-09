// src/components/Playlist.jsx
import React, { useRef, useState } from 'react';
import PlaylistCard from './PlaylistCard';
import { FaCircleChevronRight, FaCircleChevronLeft } from 'react-icons/fa6';

const Playlist = ({
  playlists,
  isPlaying,
  currentPlayingCard,
  currentPlaylistId,
  handlePlayPause,
  onCardClick,
}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setShowAll((prev) => !prev);
  };

  return (
    <div className="p-5 text-white font-sans">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold uppercase">Discover picks for you</h2>
        <a
          href="#"
          onClick={handleShowAll}
          className="text-gray-400 text-sm hover:text-white hover:underline"
        >
          {showAll ? 'SHOW LESS' : 'SHOW ALL'}
        </a>
      </div>
      <div className="relative">
        {!showAll && showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          >
            <FaCircleChevronLeft className="text-white text-2xl" />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`${
            showAll
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'
              : 'flex overflow-x-auto gap-5 scrollbar-hide'
          }`}
          style={showAll ? {} : { scrollSnapType: 'x mandatory' }}
        >
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className={`${showAll ? '' : 'flex-none'}`}
              style={showAll ? { height: 'auto' } : { width: '200px', height: '300px' }} // Đặt chiều cao cố định cho chế độ cuộn ngang
            >
              <PlaylistCard
                index={index}
                image={playlist.imageUrl || 'https://via.placeholder.com/150'}
                title={playlist.name}
                artists={playlist.description || 'Best songs of all time'}
                onCardClick={() => onCardClick(playlist)}
                isPlaying={
                  isPlaying &&
                  currentPlayingCard === index &&
                  currentPlaylistId === playlist.id
                }
                onPlayPause={() => handlePlayPause(index, playlist)}
              />
            </div>
          ))}
        </div>

        {!showAll && showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          >
            <FaCircleChevronRight className="text-white text-2xl" />
          </button>
        )}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default Playlist;