import React from "react";
import Playlist from "./PlaylistCard";
import Footer from "./Footer";

const MainContent = ({ showSingerInfo }) => {
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
      <div
        className={`bg-gray-800 p-5 text-white rounded-lg ${
          showSingerInfo ? "w-4/5" : "w-4/5"
        } h-screen overflow-y-auto custom-scrollbar`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
        </div>
        <div className="grid grid-cols-6 gap-3">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
        <br />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Recommended Playlists</h2>
          <button className="text-sm font-semibold">View All</button>
        </div>
        <div className="grid grid-cols-6 gap-3">
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
};

export default MainContent;