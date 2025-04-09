
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Music } from 'lucide-react';
import { getImageUrl } from '@/services/api_image';
import { Button } from '@/components/ui/button';

const AlbumCard = ({ album, onPlay }) => {
  const songCount = album.songIds?.length || 0;
  
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link to={`/albums/${album.id}`} className="block">
        <div className="relative group">
          {/* Album Cover Image */}
          <div className="aspect-square bg-gray-100 max-w-[180px]">
            <img 
              src={album.coverImageId ? getImageUrl(album.coverImageId) : "/placeholder.svg"} 
              alt={album.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                onClick={(e) => {
                  e.preventDefault();
                  onPlay(album);
                }} 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform"
              >
                <Play className="h-5 w-5 fill-current" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Link>
      
      <Link to={`/albums/${album.id}`} className="block no-underline">
        <div className="p-3">
          <h3 className="font-semibold truncate text-sm text-gray-900">{album.name}</h3>
          <div className="flex items-center mt-1">
            <Music className="h-3 w-3 text-gray-500 mr-1" />
            <p className="text-xs text-gray-500">{songCount} songs</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AlbumCard;