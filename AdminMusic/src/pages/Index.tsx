import React from "react";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";
import { Music, Users, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

const Index = () => {
  const { songs, albums, users } = useData();
  const { playSong, currentSong, isPlaying, pauseSong } = useAudio();
  
  const recentSongs = [...songs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  const recentAlbums = [...albums].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your songs, albums, and users
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-border p-6 hover-scale"
        >
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-blue-100">
              <Music className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Songs</h3>
          </div>
          <p className="mt-3 text-3xl font-bold">{songs.length}</p>
          <Link to="/songs" className="mt-4 text-sm text-blue-600 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-border p-6 hover-scale"
        >
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-purple-100">
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium">Albums</h3>
          </div>
          <p className="mt-3 text-3xl font-bold">{albums.length}</p>
          <Link to="/albums" className="mt-4 text-sm text-purple-600 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-border p-6 hover-scale"
        >
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-green-100">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Users</h3>
          </div>
          <p className="mt-3 text-3xl font-bold">{users.length}</p>
          <Link to="/users" className="mt-4 text-sm text-green-600 flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </motion.div>
      </div>
      
      {/* Recent songs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently Added Songs</h2>
          <Link to="/songs" className="text-sm text-primary">View all</Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          {recentSongs.length > 0 ? (
            <ul className="divide-y">
              {recentSongs.map((song) => (
                <motion.li 
                  key={song.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center p-4 hover:bg-secondary/50 transition-colors"
                >
                  <button 
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity mr-4"
                    onClick={() => currentSong?.id === song.id && isPlaying ? pauseSong() : playSong(song)}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <span className="w-2 h-3 bg-white rounded-sm"></span>
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{song.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No songs available</p>
              <Link to="/songs" className="mt-2 text-sm text-primary inline-block">
                Add songs
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent albums */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recently Added Albums</h2>
          <Link to="/albums" className="text-sm text-primary">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recentAlbums.length > 0 ? (
            recentAlbums.map((album) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover-scale"
              >
                <div className="aspect-square bg-muted">
                  {album.coverImage ? (
                    <img 
                      src={album.coverImage} 
                      alt={album.title}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium truncate">{album.title}</h3>
                  <p className="text-xs text-muted-foreground">{album.artist}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {album.songs.length} songs
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-border">
              <p className="text-muted-foreground">No albums available</p>
              <Link to="/albums" className="mt-2 text-sm text-primary inline-block">
                Add albums
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
