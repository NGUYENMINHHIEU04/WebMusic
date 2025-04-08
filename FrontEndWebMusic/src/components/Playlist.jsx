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
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1); // -1 để tránh lỗi làm tròn
    }
  };

  return (
    <div className="p-5 text-white font-sans">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold uppercase">Discover picks for you</h2>
        <a
          href="#"
          className="text-gray-400 text-sm hover:text-white hover:underline"
        >
          SHOW ALL
        </a>
      </div>
      <div className="relative">
        {/* Nút điều hướng trái */}
        {showLeftArrow && (
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
          className="flex overflow-x-auto gap-5 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className="flex-none"
              style={{ width: '200px' }} // Chiều rộng cố định cho mỗi card
            >
              <PlaylistCard
                index={index}
                image={
                  playlist.coverImageId
                    ? playlist.coverImageId
                    : 'https://via.placeholder.com/150'
                }
                title={playlist.name}
                artists={playlist.description || 'No description available'}
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

        {/* Nút điều hướng phải */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 hover:bg-gray-700"
          >
            <FaCircleChevronRight className="text-white text-2xl" />
          </button>
        )}
      </div>

      {/* CSS để ẩn thanh cuộn mặc định nhưng vẫn cho phép cuộn */}
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