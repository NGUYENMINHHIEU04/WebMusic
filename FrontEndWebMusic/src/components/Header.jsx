// src/components/Header.js
import React, { useContext, useState, useEffect } from 'react';
import { FaSearch, FaHome, FaDownload, FaRegUserCircle } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import Logo from '../images/logo.png';
import { AuthContext } from '../context/AuthContext';
import { getUserById } from '../apis/api_user';

export default function Header({ onReset }) {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const [search, setSearch] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && userId) {
        try {
          const userData = await getUserById(userId);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };
    fetchUserData();
  }, [isLoggedIn, userId]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleReset = () => {
    if (onReset) {
      onReset(); // Gọi resetToMainContent từ Homepage
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-black text-white">
      <div className="flex items-center space-x-4">
        <img
          src={Logo}
          alt="Spotify"
          className="h-8 cursor-pointer"
          onClick={handleReset}
        />
        <button
          className="p-2 bg-gray-800 rounded-full"
          onClick={handleReset}
        >
          <FaHome className="text-white text-lg" />
        </button>
      </div>

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

      <div className="flex items-center space-x-6 text-gray-400 text-sm font-semibold">
        <a href="#" className="hover:text-white">Premium</a>
        <a href="#" className="hover:text-white">Support</a>
        <a href="#" className="hover:text-white">Download</a>
        <div className="h-5 w-px bg-gray-600"></div>
        <button className="flex items-center space-x-1 hover:text-white">
          <FaDownload />
          <span>Download Application</span>
        </button>

        {isLoggedIn ? (
          <div className="relative flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">
                <FaRegUserCircle />
              </span>
            </button>

            {isHovering && !isMenuOpen && user && (
              <div className="absolute top-10 right-0 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10">
                <div className="px-4 py-2 font-semibold border-b border-gray-700">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            )}

            {isMenuOpen && (
              <div className="absolute top-10 right-0 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  {user && (
                    <li className="px-4 py-2 font-semibold border-b border-gray-700">
                      {user.firstName} {user.lastName}
                    </li>
                  )}
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Account
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Profile
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Upgrade to Premium
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Support
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Download
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700 flex justify-between items-center">
                    Settings
                    <span>→</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-700">
                    <button onClick={logout} className="w-full text-left">
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/auth" className="hover:text-white">Register</a>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200">
              <a href="/auth">Login</a>
            </button>
          </>
        )}
      </div>
    </header>
  );
}