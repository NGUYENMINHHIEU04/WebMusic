import React, { useState } from "react";
import { Play } from "lucide-react";

const PlaylistCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative w-70 h-60 bg-black overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${isHovered ? 'rounded-2xl' : 'rounded-none'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Playlist Image */}
      <div className="relative h-4/5">
        <img 
          src="https://nld.mediacdn.vn/291774122806476800/2022/9/13/29795978114729347731698976759089743828310618n-110612-16630246192111138663533.jpg"
          alt="Playlist Cover"
          className="w-full h-full object-cover"
        />
        {/* Play Button */}
        {isHovered && (
          <button className="absolute bottom-2 right-2 bg-green-500 p-3 rounded-full shadow-lg hover:scale-105 transition">
            <Play size={24} className="text-black" />
          </button>
        )}
      </div>
      {/* Playlist Title */}
      <div className="p-2 text-white">
        <p className="text-sm font-semibold truncate">Lighters (ft. Bruno Mars) ...</p>
      </div>
    </div>
  );
};

export default PlaylistCard;