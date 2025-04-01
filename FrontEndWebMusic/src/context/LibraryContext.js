import React, { createContext, useState, useContext } from 'react';
import { getImageUrl } from '../apis/api_playlist'; // Import getImageUrl

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [libraryItems, setLibraryItems] = useState([
    // Các mục mặc định ban đầu
    // {
    //   id: 'liked-songs',
    //   title: 'Liked Songs',
    //   type: 'Playlist',
    //   creator: '1 song',
    //   image: 'https://via.placeholder.com/50/8b5cf6/ffffff?text=♥',
    // },
    // {
    //   id: 'son-tung-mtp',
    //   title: 'Sơn Tùng M-TP',
    //   type: 'Artist',
    //   creator: '',
    //   image: 'https://via.placeholder.com/50?text=Artist',
    // },
    // {
    //   id: 'chill-game',
    //   title: 'Chill để chơi game 😊',
    //   type: 'Playlist',
    //   creator: 'Buitrithanh',
    //   image: 'https://via.placeholder.com/50?text=Game',
    // },
    // {
    //   id: 'obito-mix',
    //   title: 'Obito Mix',
    //   type: 'Playlist',
    //   creator: 'Spotify',
    //   image: 'https://via.placeholder.com/50?text=Obito',
    // },
    // {
    //   id: 'obito',
    //   title: 'Obito',
    //   type: 'Artist',
    //   creator: '',
    //   image: 'https://via.placeholder.com/50?text=Obito',
    // },
  ]);

  const addToLibrary = (playlist) => {
    const newItem = {
      id: playlist.id || `playlist-${Date.now()}`, // Tạo ID duy nhất nếu không có
      title: playlist.name,
      type: 'Playlist',
      creator: 'Spotify',
      image: playlist.coverImageId
        ? getImageUrl(playlist.coverImageId) // Sử dụng getImageUrl đã import
        : 'https://via.placeholder.com/50?text=Playlist',
    };

    // Kiểm tra xem playlist đã tồn tại trong library chưa
    if (!libraryItems.some((item) => item.id === newItem.id)) {
      setLibraryItems((prevItems) => [...prevItems, newItem]);
    }
  };

  return (
    <LibraryContext.Provider value={{ libraryItems, addToLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);