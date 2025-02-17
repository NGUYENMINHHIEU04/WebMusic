import React from "react";
import Playlist from "./PlaylistCard";

const MainContent = ({ showSingerInfo }) => {
  return (
    <div
      className={`bg-gray-800 p-5 text-white rounded-lg ${
        showSingerInfo ? "w-3/5" : "w-4/5" // Chiều rộng thay đổi dựa trên showSingerInfo
      }`}
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
    </div>
  );
};

export default MainContent;