import React from "react";

const Lyrics = ({ songTitle, lyrics }) => {
  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling inspired by Spotify */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>
      <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar relative">

        <h2 className="text-3xl font-bold mb-4">{songTitle}</h2>
        <div className="p-2  rounded-lg">
          {lyrics.split("\n").map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Lyrics;