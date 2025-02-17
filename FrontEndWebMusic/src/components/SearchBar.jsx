import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-700 rounded-full p-2">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 bg-transparent text-white focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;