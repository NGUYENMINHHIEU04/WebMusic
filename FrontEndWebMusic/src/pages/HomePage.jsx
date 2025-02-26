import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation";
import MusicPlayer from "../components/MusicPlayer";
import Header from "../components/Header";
import Lyrics from "../components/Lyrics";
import RightSidebarQueue from "../components/RightSidebarQueue";
import RightSidebarDevice from "../components/RightSidebarDevice";

const Homepage = () => {
  const [showSingerInfo, setShowSingerInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [showDevice, setShowDevice] = useState(false);

  const singer = {
    name: "Son Tung M-TP",
    bio: "Ca sĩ, nhạc sĩ người Việt Nam",
    image: "https://via.placeholder.com/150",
  };

  const song = {
    title: "Chạy Ngay Đi",
    lyrics: `Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    ...`,
  };

  const toggleSingerInfo = () => {
    setShowSingerInfo(!showSingerInfo);
    setShowQueue(false);
    setShowDevice(false);
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  const toggleQueue = () => {
    setShowQueue(!showQueue);
    setShowSingerInfo(false);
    setShowDevice(false);
  };

  const toggleDevice = () => {
    setShowDevice(!showDevice);
    setShowSingerInfo(false);
    setShowQueue(false);
  };

  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling */
          .custom-home-scrollbar::-webkit-scrollbar {
            width: 12px;
          }

          .custom-home-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-home-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 1px;
          }

          .custom-home-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 p-1 space-x-1 bg-black overflow-y-auto custom-home-scrollbar">
          <LeftSidebar />
          {showLyrics ? (
            <Lyrics songTitle={song.title} lyrics={song.lyrics} onClose={toggleLyrics} />
          ) : (
            <MainContent showSingerInfo={showSingerInfo} />
          )}
          {showSingerInfo && <RightSidebarSingerInformation singer={singer} />}
          {showQueue && <RightSidebarQueue onClose={toggleQueue} />}
          {showDevice && <RightSidebarDevice onClose={toggleDevice} />}
        </div>
        <MusicPlayer 
          onToggleSingerInfo={toggleSingerInfo} 
          onToggleLyrics={toggleLyrics} 
          onToggleQueue={toggleQueue}
          onToggleDevice={toggleDevice}
        />
      </div>
    </>
  );
};

export default Homepage;
