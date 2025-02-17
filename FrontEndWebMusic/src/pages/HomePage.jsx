import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation"; // Import component mới
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";
import Header from "../components/Header";

const Homepage = () => {
  const [showSingerInfo, setShowSingerInfo] = useState(false); // State để điều khiển hiển thị RightSidebarSingerInformation

  // Dữ liệu ca sĩ mẫu
  const singer = {
    name: "Son Tung M-TP",
    bio: "Ca sĩ, nhạc sĩ người Việt Nam",
    image: "https://via.placeholder.com/150",
  };

  // Hàm toggle hiển thị thông tin ca sĩ
  const toggleSingerInfo = () => {
    setShowSingerInfo(!showSingerInfo);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 p-1 space-x-1 bg-black">
        <LeftSidebar />
        <MainContent showSingerInfo={showSingerInfo} /> {/* Truyền trạng thái showSingerInfo vào MainContent */}
        {showSingerInfo && <RightSidebarSingerInformation singer={singer} />} {/* Hiển thị RightSidebarSingerInformation khi showSingerInfo là true */}
      </div>
      <Footer />
      <MusicPlayer onToggleSingerInfo={toggleSingerInfo} /> {/* Truyền hàm toggle vào MusicPlayer */}
    </div>
  );
};

export default Homepage;