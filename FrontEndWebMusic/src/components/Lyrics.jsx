import React from "react";

const Lyrics = ({ songTitle, lyrics, onClose }) => {
  return (
    <div className="bg-gray-800 p-5 text-white rounded-lg w-4/5 relative">
      <button
        className="absolute top-3 right-3 text-lg text-gray-400 hover:text-white"
        onClick={onClose}
      >
        ✖
      </button>
      <h2 className="text-3xl font-bold mb-4">{songTitle}</h2>
      <div className="overflow-y-auto h-96 p-2 bg-gray-700 rounded-lg">
        {lyrics.split("\n").map((line, index) => (
          <p key={index} className="mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Lyrics;
