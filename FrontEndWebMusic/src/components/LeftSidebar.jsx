import React from "react";
import { FaSearch, FaBook, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useLibrary } from '../context/LibraryContext';

const LeftSidebar = ({ onPlaylistSelect }) => {
  const { libraryItems } = useLibrary();

  const handlePlaylistClick = (item) => {
    if (item.type === 'Playlist') {
      console.log('Playlist selected from LeftSidebar:', item); // Debug dữ liệu
      onPlaylistSelect(item);
    }
  };

  return (
    <>
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
          .playlist-item:hover {
            background-color: #2a2a2a;
            border-radius: 4px;
          }
        `}
      </style>
      <div className="bg-gray-900 text-white p-5 h-screen">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaBook className="mr-2 text-gray-400" />
              <h1 className="text-lg font-bold">Your Library</h1>
            </div>
            <div className="flex items-center space-x-3">
              <FaPlus className="text-gray-400 hover:text-white cursor-pointer" />
              <FaArrowLeft className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="flex space-x-4 mb-4">
            <button className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Playlists
            </button>
            <button className="bg-transparent text-gray-400 px-4 py-1 rounded-full text-sm font-semibold hover:text-white">
              Artists
            </button>
          </div>

          <div className="flex items-center mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search in Your Library"
              className="w-full bg-transparent text-gray-400 text-sm outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto custom-scrollbar h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {libraryItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 playlist-item cursor-pointer"
                onClick={() => handlePlaylistClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-12 h-12 mr-3 ${item.type === 'Artist' ? 'rounded-full' : 'rounded'}`}
                />
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {item.type} {item.creator && `• ${item.creator}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;