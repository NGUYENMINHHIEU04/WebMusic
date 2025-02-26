import React from "react";
import { FaHome, FaSearch, FaBook } from "react-icons/fa";

const LeftSidebar = () => {
  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling inspired by Spotify */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px; /* Thin scrollbar like Spotify */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; /* No background for track */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568; /* Gray color matching Spotify's dark theme */
            border-radius: 4px; /* Rounded edges */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280; /* Slightly lighter gray on hover */
          }
        `}
      </style>
      <div className="w-1/5 bg-gray-900 text-white p-5 rounded-lg h-screen overflow-y-auto custom-scrollbar">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Spotify</h1>
        </div>
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaSearch className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaBook className="mr-2" /> Your Library
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaSearch className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaBook className="mr-2" /> Your Library
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaSearch className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaBook className="mr-2" /> Your Library
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaSearch className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaBook className="mr-2" /> Your Library
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaHome className="mr-2" /> Home
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaSearch className="mr-2" /> Search
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center hover:text-green-500">
              <FaBook className="mr-2" /> Your Library
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LeftSidebar;