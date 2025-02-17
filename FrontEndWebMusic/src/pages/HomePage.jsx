import React from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer";
import Header from "../components/Header"; // Import the Header component

const Homepage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* Add the Header component here */}
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
      <MusicPlayer />
    </div>
  );
};

export default Homepage;