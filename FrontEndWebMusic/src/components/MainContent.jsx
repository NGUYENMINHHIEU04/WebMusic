import React from "react";
import Playlist from "./PlaylistCard";



const MainContent = () => {

  return (
    <div className="flex-1 bg-zinc-900 p-5 text-white">
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
