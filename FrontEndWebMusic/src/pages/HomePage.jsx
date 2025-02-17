// import React, { useState } from "react";
// import LeftSidebar from "../components/LeftSidebar";
// import MainContent from "../components/MainContent";
// import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation"; // Import component mới
// import Footer from "../components/Footer";
// import MusicPlayer from "../components/MusicPlayer";
// import Header from "../components/Header";

// const Homepage = () => {
//   const [showSingerInfo, setShowSingerInfo] = useState(false); // State để điều khiển hiển thị RightSidebarSingerInformation

//   // Dữ liệu ca sĩ mẫu
//   const singer = {
//     name: "Son Tung M-TP",
//     bio: "Ca sĩ, nhạc sĩ người Việt Nam",
//     image: "https://via.placeholder.com/150",
//   };

//   // Hàm toggle hiển thị thông tin ca sĩ
//   const toggleSingerInfo = () => {
//     setShowSingerInfo(!showSingerInfo);
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-1 p-1 space-x-1 bg-black">
//         <LeftSidebar />
//         <MainContent showSingerInfo={showSingerInfo} /> {/* Truyền trạng thái showSingerInfo vào MainContent */}
//         {showSingerInfo && <RightSidebarSingerInformation singer={singer} />} {/* Hiển thị RightSidebarSingerInformation khi showSingerInfo là true */}
//       </div>
//       <Footer />
//       <MusicPlayer onToggleSingerInfo={toggleSingerInfo} /> {/* Truyền hàm toggle vào MusicPlayer */}
//     </div>
//   );
// };

// export default Homepage;

import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import MainContent from "../components/MainContent";
import RightSidebarSingerInformation from "../components/RightSidebarSingerInformation";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";
import Header from "../components/Header";
import Lyrics from "../components/Lyrics"; // Import component mới

const Homepage = () => {
  const [showSingerInfo, setShowSingerInfo] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

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
  };

  const toggleLyrics = () => {
    setShowLyrics(!showLyrics);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 p-1 space-x-1 bg-black">
        <LeftSidebar />
        {showLyrics ? (
          <Lyrics songTitle={song.title} lyrics={song.lyrics} onClose={toggleLyrics} />
        ) : (
          <MainContent showSingerInfo={showSingerInfo} />
        )}
        {showSingerInfo && <RightSidebarSingerInformation singer={singer} />}
      </div>
      <Footer />
      <MusicPlayer onToggleSingerInfo={toggleSingerInfo} onToggleLyrics={toggleLyrics} />
    </div>
  );
};

export default Homepage;
