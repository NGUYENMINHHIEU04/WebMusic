import { useState } from "react";
import { FaSearch, FaHome, FaDownload } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import spotifyLogo from "../images/testLogo.png"; // Ensure this logo is in the correct folder

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-black text-white">
      {/* Left Section: Logo & Home Button */}
      <div className="flex items-center space-x-4">
        <img src={spotifyLogo} alt="Spotify" className="h-8" />
        <button className="p-2 bg-gray-800 rounded-full">
          <FaHome className="text-white text-lg" />
        </button>
      </div>
      {/* Middle Section: Search Bar */}
      <div className="relative flex-1 max-w-md">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-gray-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="What content do you want to broadcast?"
        />
        <IoIosMore className="absolute right-3 top-2.5 text-gray-400 text-xl" />
      </div>

      {/* Right Section: Links & Buttons */}
      <div className="flex items-center space-x-6 text-gray-400 text-sm font-semibold">
        <a href="#" className="hover:text-white">Premium</a>
        <a href="#" className="hover:text-white">SupportSupport</a>
        <a href="#" className="hover:text-white">Download</a>
        <div className="h-5 w-px bg-gray-600"></div>
        <button className="flex items-center space-x-1 hover:text-white">
          <FaDownload />
          <span>Download Application</span>
        </button>
        <a href="#" className="hover:text-white">Register</a>
        <button className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200">
          Login
        </button>
      </div>
    </header>
  );
}
