
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Song } from "@/types";

interface AudioContextProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    
    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
      }
    }
  }, [currentSong]);
  
  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };
  
  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const togglePlayPause = () => {
    if (!currentSong) return;
    
    if (isPlaying) {
      pauseSong();
    } else {
      playSong(currentSong);
    }
  };
  
  const seek = (time: number) => {
    if (audioRef.current && currentSong) {
      const newTime = time * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(time);
    }
  };
  
  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        volume,
        playSong,
        pauseSong,
        togglePlayPause,
        setVolume,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
