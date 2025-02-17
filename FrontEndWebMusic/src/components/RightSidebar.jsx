import React from "react";
import { FaUserFriends, FaCalendarAlt, FaCog } from "react-icons/fa";

const RightSidebar = () => {
  return (
    <div className="w-1/5 bg-gray-900 text-white p-5 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Social</h2>
      </div>
      <ul>
        <li className="mb-4">
          <a href="#" className="flex items-center hover:text-green-500">
            <FaUserFriends className="mr-2" /> Friends
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center hover:text-green-500">
            <FaCalendarAlt className="mr-2" /> Events
          </a>
        </li>
        <li className="mb-4">
          <a href="#" className="flex items-center hover:text-green-500">
            <FaCog className="mr-2" /> Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RightSidebar;