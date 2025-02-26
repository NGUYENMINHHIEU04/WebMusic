import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation";
import Footer from "../components/Footer";
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
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
    Mọi điều dần tồi tệ hơn
    Chạy ngay đi trước khi
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
          /* Custom scrollbar styling, keeping shape but changing color and reducing thickness by 2px */
          .custom-scrollba::-webkit-scrollbar {
            width: 12px; /* Reduced from 6px to 4px (pull up and down 2px) */
          }

          .custom-scrollba::-webkit-scrollbar-track {
            background: transparent; /* No background for track */
          }

          .custom-scrollba::-webkit-scrollbar-thumb {
            background: #4a5568; /* green-400 for consistency with progress bar */
            border-radius: 3px; /* Keep the same shape (minimal, rounded) */
          }

          .custom-scrollba::-webkit-scrollbar-thumb:hover {
            background: #6b7280; /* green-500 for a slightly darker hover */
          }
        `}
      </style>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 p-1 space-x-1 bg-black overflow-y-auto custom-scrollba">
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
<<<<<<< Updated upstream
      <Footer />
      <MusicPlayer 
      onToggleSingerInfo={toggleSingerInfo} 
      onToggleLyrics={toggleLyrics} 
      onToggleQueue={toggleQueue}
      onToggleDevice={toggleDevice}
      />
    </div>
=======
    </>
>>>>>>> Stashed changes
  );
};

export default Homepage;