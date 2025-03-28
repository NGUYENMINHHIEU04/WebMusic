import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Song, Album } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

interface DataContextProps {
  users: User[];
  songs: Song[];
  albums: Album[];
  addUser: (user: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addSong: (song: Omit<Song, "id" | "createdAt">) => void;
  updateSong: (id: string, song: Partial<Song>) => void;
  deleteSong: (id: string) => void;
  addAlbum: (album: Omit<Album, "id" | "createdAt" | "songs">) => void;
  updateAlbum: (id: string, album: Partial<Album>) => void;
  deleteAlbum: (id: string) => void;
  addSongToAlbum: (albumId: string, songId: string) => void;
  removeSongFromAlbum: (albumId: string, songId: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [songs, setSongs] = useState<Song[]>(() => {
    const savedSongs = localStorage.getItem("songs");
    return savedSongs ? JSON.parse(savedSongs) : [];
  });

  const [albums, setAlbums] = useState<Album[]>(() => {
    const savedAlbums = localStorage.getItem("albums");
    return savedAlbums ? JSON.parse(savedAlbums) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums]);

  const addUser = (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    toast.success("User added successfully");
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...user } : item))
    );
    toast.success("User updated successfully");
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  };

  const addSong = (song: Omit<Song, "id" | "createdAt">) => {
    const newSong: Song = {
      ...song,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setSongs((prev) => [...prev, newSong]);
    toast.success("Song added successfully");
  };

  const updateSong = (id: string, song: Partial<Song>) => {
    setSongs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...song } : item))
    );
    
    // Update in albums if needed
    if (song.title || song.artist || song.coverImage) {
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) => ({
          ...album,
          songs: album.songs.map((s) =>
            s.id === id ? { ...s, ...song } : s
          ),
        }))
      );
    }
    
    toast.success("Song updated successfully");
  };

  const deleteSong = (id: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== id));
    
    // Remove song from albums
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => ({
        ...album,
        songs: album.songs.filter((song) => song.id !== id),
      }))
    );
    
    toast.success("Song deleted successfully");
  };

  const addAlbum = (album: Omit<Album, "id" | "createdAt" | "songs">) => {
    const newAlbum: Album = {
      ...album,
      id: uuidv4(),
      songs: [],
      createdAt: new Date().toISOString(),
    };
    setAlbums((prev) => [...prev, newAlbum]);
    toast.success("Album added successfully");
  };

  const updateAlbum = (id: string, album: Partial<Album>) => {
    setAlbums((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...album } : item))
    );
    toast.success("Album updated successfully");
  };

  const deleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((album) => album.id !== id));
    toast.success("Album deleted successfully");
  };

  const addSongToAlbum = (albumId: string, songId: string) => {
    const song = songs.find((s) => s.id === songId);
    if (!song) return;

    setAlbums((prev) =>
      prev.map((album) =>
        album.id === albumId
          ? {
              ...album,
              songs: [...album.songs.filter((s) => s.id !== songId), song],
            }
          : album
      )
    );
    
    // Update albumId for the song
    setSongs((prev) =>
      prev.map((song) =>
        song.id === songId ? { ...song, albumId } : song
      )
    );
    
    toast.success("Song added to album");
  };

  const removeSongFromAlbum = (albumId: string, songId: string) => {
    setAlbums((prev) =>
      prev.map((album) =>
        album.id === albumId
          ? {
              ...album,
              songs: album.songs.filter((song) => song.id !== songId),
            }
          : album
      )
    );
    
    // Remove albumId from the song
    setSongs((prev) =>
      prev.map((song) =>
        song.id === songId ? { ...song, albumId: undefined } : song
      )
    );
    
    toast.success("Song removed from album");
  };

  return (
    <DataContext.Provider
      value={{
        users,
        songs,
        albums,
        addUser,
        updateUser,
        deleteUser,
        addSong,
        updateSong,
        deleteSong,
        addAlbum,
        updateAlbum,
        deleteAlbum,
        addSongToAlbum,
        removeSongFromAlbum,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
