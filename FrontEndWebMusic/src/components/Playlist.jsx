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
  const [showAll, setShowAll] = useState(false); // New state to toggle layout

  // Hàm xử lý cuộn sang trái
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Hàm xử lý cuộn sang phải
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Hàm kiểm tra vị trí cuộn để hiển thị/ẩn các nút điều hướng
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Hàm xử lý khi bấm "SHOW ALL" hoặc "SHOW LESS"
  const handleShowAll = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowAll((prev) => !prev); // Toggle the showAll state
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
          {showAll ? 'SHOW LESS' : 'SHOW ALL'} {/* Toggle text based on state */}
        </a>
      </div>
      <div className="relative">
        {/* Hiển thị nút điều hướng trái (chỉ khi không ở chế độ SHOW ALL) */}
        {!showAll && showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          >
            <FaCircleChevronLeft className="text-white text-2xl" />
          </button>
        )}

        {/* Danh sách PlaylistCard */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`${
            showAll
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5' // Grid layout for SHOW ALL
              : 'flex overflow-x-auto gap-5 scrollbar-hide' // Scrollable row for default view
          }`}
          style={showAll ? {} : { scrollSnapType: 'x mandatory' }} // Remove scroll snap in grid mode
        >
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className={showAll ? '' : 'flex-none'} // Remove flex-none in grid mode
              style={showAll ? {} : { width: '200px' }} // Remove fixed width in grid mode
            >
              <PlaylistCard
                index={index}
                image={playlist.imageUrl || 'https://via.placeholder.com/150'} // Use imageUrl from previous update
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

        {/* Hiển thị nút điều hướng phải (chỉ khi không ở chế độ SHOW ALL) */}
        {!showAll && showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          >
            <FaCircleChevronRight className="text-white text-2xl" />
          </button>
        )}
      </div>

      {/* CSS để ẩn thanh cuộn mặc định nhưng vẫn cho phép cuộn (chỉ áp dụng khi không ở chế độ SHOW ALL) */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>
    </div>
  );
};

export default Playlist;