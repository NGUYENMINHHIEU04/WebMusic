import React from "react";
import { FaHome, FaSearch, FaBook } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-5">
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
      </ul>
    </div>
  );
};

export default Sidebar;