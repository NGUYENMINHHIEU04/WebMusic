
import React from "react";
import { useAudio } from "@/context/AudioContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AudioPlayer: React.FC = () => {
  const { currentSong, isPlaying, progress, volume, togglePlayPause, seek, setVolume } = useAudio();
  
  if (!currentSong) return null;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  
  const currentTime = formatTime(progress * currentSong.duration);
  const totalTime = formatTime(currentSong.duration);
  
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/80 backdrop-blur-lg border-t border-border md:bottom-4 md:left-auto md:right-4 md:w-96 md:rounded-xl md:shadow-xl md:border"
      >
        <div className="flex items-center space-x-4">
          {/* Song info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {currentSong.coverImage ? (
              <img 
                src={currentSong.coverImage} 
                alt={currentSong.title} 
                className="w-12 h-12 rounded-md object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                <Music className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-2">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlayPause}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress bar & volume */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground min-w-[30px]">{currentTime}</span>
            <div className="relative flex-grow h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={progress}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className={cn(
                  "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                )}
              />
            </div>
            <span className="text-xs text-muted-foreground min-w-[30px]">{totalTime}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <VolumeIcon className="w-4 h-4" />
            </button>
            <div className="relative w-20 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AudioPlayer;
