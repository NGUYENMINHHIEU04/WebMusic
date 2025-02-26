import React from "react";

const RightSidebarQueue = ({ onClose }) => {
  const queue = [
    { id: 1, title: "Chạy Ngay Đi", artist: "Son Tung M-TP", duration: "3:45" },
    { id: 2, title: "Lạc Trôi", artist: "Son Tung M-TP", duration: "4:15" },
    { id: 3, title: "Nơi Này Có Anh", artist: "Son Tung M-TP", duration: "4:00" },
  ];

  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling inspired by Spotify */
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
        `}
      </style>
      <div className="w-1/5 bg-gray-900 text-white p-5 rounded-lg h-screen overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Danh sách phát</h2>
          <button
            onClick={onClose}
            className="text-sm font-semibold hover:text-green-500"
          >
            Đóng
          </button>
        </div>
        <ul>
          {queue.map((song) => (
            <li key={song.id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <p className="text-sm text-gray-400">{song.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RightSidebarQueue;