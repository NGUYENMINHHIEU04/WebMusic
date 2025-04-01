// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const PlaylistDetail = ({ playlist, onBack, isPlaying, setIsPlaying, onTrackSelect }) => {
//   const { isLoggedIn } = useContext(AuthContext);

//   const tracks = [
//     {
//       id: 1,
//       title: 'Call Me Up - Braaten & Chrit Leaf Remix',
//       artist: 'Braaheim, Braaten & Chrit Leaf',
//       album: 'Call Me Up (Braaten & Chrit Leaf Remix)',
//       duration: '2:48',
//       url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//     },
//     {
//       id: 2,
//       title: 'This is What You Came For',
//       artist: 'YES YES, Tesbter, H.I.S.E.',
//       album: 'This is What You Came For',
//       duration: '2:41',
//       url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
//     },
//     {
//       id: 3,
//       title: 'We Are The People',
//       artist: 'BRAN',
//       album: 'We Are The People',
//       duration: '2:42',
//       url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
//     },
//   ];

//   const handlePlayPauseClick = () => {
//     if (!isLoggedIn) {
//       setIsPlaying(!isPlaying); // Gọi setIsPlaying để hiển thị LoginPage trong Homepage
//     } else {
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTrackClick = (track) => {
//     if (!isLoggedIn) {
//       onTrackSelect(track); // Gọi onTrackSelect để hiển thị LoginPage trong Homepage
//     } else {
//       onTrackSelect(track);
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar font-sans">
//       <div className="flex items-center mb-5">
//         <button
//           className="text-gray-400 hover:text-white mr-3"
//           onClick={onBack}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>
//         <img
//           src={playlist.image}
//           alt={playlist.title}
//           className="w-40 h-40 object-cover mr-5"
//         />
//         <div>
//           <p className="text-sm text-gray-400">Playlist</p>
//           <h1 className="text-4xl font-bold">{playlist.title}</h1>
//           <p className="text-gray-400 mt-2">{playlist.artists}</p>
//           <p className="text-gray-400 text-sm">
//             Spotify • 50 songs, about 1 hr 45 min
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center mb-5">
//         <button
//           className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center mr-3 hover:bg-[#1ED760] transition-colors duration-200"
//           onClick={handlePlayPauseClick}
//         >
//           {isPlaying ? (
//             <svg
//               className="w-6 h-6 text-black"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
//             </svg>
//           ) : (
//             <svg
//               className="w-6 h-6 text-black"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           )}
//         </button>
//         <button className="text-gray-400 hover:text-white mr-3">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//         </button>
//         <button className="text-gray-400 hover:text-white">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 12h14M12 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>

//       <div className="text-gray-400">
//         <div className="grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 mb-3">
//           <div className="col-span-1">#</div>
//           <div className="col-span-5">Title</div>
//           <div className="col-span-4">Album</div>
//           <div className="col-span-2 text-right">⏳</div>
//         </div>
//         {tracks.map((track) => (
//           <div
//             key={track.id}
//             className="grid grid-cols-12 gap-4 py-2 hover:bg-[#282828] rounded-md cursor-pointer"
//             onClick={() => handleTrackClick(track)}
//           >
//             <div className="col-span-1">{track.id}</div>
//             <div className="col-span-5">
//               <p className="text-white">{track.title}</p>
//               <p className="text-sm text-gray-400">{track.artist}</p>
//             </div>
//             <div className="col-span-4">{track.album}</div>
//             <div className="col-span-2 text-right">{track.duration}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlaylistDetail;


// import React, { useContext, useEffect, useState, useRef } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getSongAudio } from '../apis/api_song'; // API trả về thông tin bài hát
// import { getImageUrl } from '../apis/api_playlist';
// import { FaPlay, FaPause } from 'react-icons/fa';
// import { FiClock } from 'react-icons/fi';

// const PlaylistDetail = ({ playlist, onBack, isPlaying, setIsPlaying, onTrackSelect }) => {
//   const { isLoggedIn } = useContext(AuthContext);
//   const [tracks, setTracks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hoveredTrackId, setHoveredTrackId] = useState(null);
//   const [currentTrackId, setCurrentTrackId] = useState(null);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchTracks = async () => {
//       try {
//         setLoading(true);
//         const songIds = playlist.songIds || []; // Lấy songIds từ playlist

//         const formattedTracks = await Promise.all(
//           songIds.map(async (songId, index) => {
//             try {
//               const songData = await getSongAudio(songId); // Gọi API lấy thông tin bài hát
//               console.log(`Song data for songId ${songId}:`, songData); // Debug dữ liệu API

//               // Kiểm tra cấu trúc của songData và ánh xạ đúng các trường
//               return {
//                 id: index + 1, // ID hiển thị trong giao diện
//                 title: songData.title || songData.name || 'Unknown Title', // Thử cả 'name' nếu 'title' không tồn tại
//                 artist: songData.artistIds
//                   ? songData.artistIds.join(', ')
//                   : songData.artists || 'Unknown Artist', // Thử cả 'artists' nếu 'artistIds' không tồn tại
//                 category: songData.category || songData.genre || 'Unknown Category', // Thử cả 'genre' nếu 'category' không tồn tại
//                 duration: songData.duration || '0:00', // Nếu API không trả về duration, dùng mặc định
//                 songId: songId, // Lưu songId để sử dụng sau
//                 url: songData.audioUrl || '', // Giả sử API trả về audioUrl
//               };
//             } catch (err) {
//               console.error(`Failed to fetch song ${songId}:`, err);
//               return {
//                 id: index + 1,
//                 title: 'Error Loading Song',
//                 artist: 'Unknown',
//                 category: 'Unknown',
//                 duration: '0:00',
//                 songId: songId,
//               };
//             }
//           })
//         );

//         setTracks(formattedTracks);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTracks();
//   }, [playlist.songIds]);

//   const handlePlayPauseClick = () => {
//     if (!isLoggedIn) {
//       setIsPlaying(!isPlaying);
//     } else {
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const handleTrackPlayPause = async (track) => {
//     try {
//       if (!isLoggedIn) {
//         onTrackSelect(track);
//         return;
//       }

//       if (currentTrackId === track.id && isPlaying) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//         return;
//       }

//       if (audioRef.current) {
//         audioRef.current.pause();
//       }

//       const audio = new Audio(track.url); // Sử dụng URL từ track
//       audioRef.current = audio;

//       audio.play();
//       setIsPlaying(true);
//       setCurrentTrackId(track.id);
//       onTrackSelect(track);

//       audio.onended = () => {
//         setIsPlaying(false);
//         setCurrentTrackId(null);
//       };
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const playlistImageUrl = playlist.coverImageId
//     ? getImageUrl(playlist.coverImageId)
//     : 'https://via.placeholder.com/150';

//   return (
//     <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar font-sans">
//       <div className="flex items-center mb-5">
//         <button
//           className="text-gray-400 hover:text-white mr-3"
//           onClick={onBack}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>
//         <img
//           src={playlistImageUrl}
//           alt={playlist.name}
//           className="w-40 h-40 object-cover mr-5"
//         />
//         <div>
//           <p className="text-sm

//  text-gray-400">Playlist</p>
//           <h1 className="text-4xl font-bold">{playlist.name}</h1>
//           <p className="text-gray-400 mt-2">{playlist.description}</p>
//           <p className="text-gray-400 text-sm">
//             Spotify • {tracks.length} songs
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center mb-5">
//         <button
//           className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center mr-3 hover:bg-[#1ED760] transition-colors duration-200"
//           onClick={handlePlayPauseClick}
//         >
//           {isPlaying ? (
//             <svg
//               className="w-6 h-6 text-black"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
//             </svg>
//           ) : (
//             <svg
//               className="w-6 h-6 text-black"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           )}
//         </button>
//         <button className="text-gray-400 hover:text-white mr-3">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//         </button>
//         <button className="text-gray-400 hover:text-white">
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 12h14M12 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>

//       <div className="text-gray-400">
//         {loading && <p>Loading tracks...</p>}
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {!loading && !error && (
//           <>
//             <div className="grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 mb-3">
//               <div className="col-span-1">#</div>
//               <div className="col-span-5">Title</div>
//               <div className="col-span-4">Category</div>
//               <div className="col-span-2 text-right">
//                 <FiClock className="inline-block w-5 h-5" />
//               </div>
//             </div>
//             {tracks.map((track) => (
//               <div
//                 key={track.id}
//                 className="grid grid-cols-12 gap-4 py-2 hover:bg-[#282828] rounded-md cursor-pointer"
//                 onMouseEnter={() => setHoveredTrackId(track.id)}
//                 onMouseLeave={() => setHoveredTrackId(null)}
//               >
//                 <div className="col-span-1 flex items-center">
//                   {hoveredTrackId === track.id || currentTrackId === track.id ? (
//                     <button onClick={() => handleTrackPlayPause(track)}>
//                       {currentTrackId === track.id && isPlaying ? (
//                         <FaPause className="text-white w-4 h-4" />
//                       ) : (
//                         <FaPlay className="text-white w-4 h-4" />
//                       )}
//                     </button>
//                   ) : (
//                     track.id
//                   )}
//                 </div>
//                 <div className="col-span-5">
//                   <p className="text-white">{track.title}</p>
//                   <p className="text-sm text-gray-400">{track.artist}</p>
//                 </div>
//                 <div className="col-span-4">{track.category}</div>
//                 <div className="col-span-2 text-right">{track.duration}</div>
//               </div>
//             ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlaylistDetail;

import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext'; // Import useLibrary
import { getSongAudio } from '../apis/api_song';
import { getImageUrl } from '../apis/api_playlist';
import { FaPlay, FaPause } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

const PlaylistDetail = ({ playlist, onBack, isPlaying, setIsPlaying, onTrackSelect }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { addToLibrary } = useLibrary(); // Sử dụng context để thêm vào library
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredTrackId, setHoveredTrackId] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const songIds = playlist.songIds || [];

        const formattedTracks = await Promise.all(
          songIds.map(async (songId, index) => {
            try {
              const songData = await getSongAudio(songId);
              console.log(`Song data for songId ${songId}:`, songData);

              return {
                id: index + 1,
                title: songData.title || songData.name || 'Unknown Title',
                artist: songData.artistIds
                  ? songData.artistIds.join(', ')
                  : songData.artists || 'Unknown Artist',
                category: songData.category || songData.genre || 'Unknown Category',
                duration: songData.duration || '0:00',
                songId: songId,
                url: songData.audioUrl || '',
              };
            } catch (err) {
              console.error(`Failed to fetch song ${songId}:`, err);
              return {
                id: index + 1,
                title: 'Error Loading Song',
                artist: 'Unknown',
                category: 'Unknown',
                duration: '0:00',
                songId: songId,
              };
            }
          })
        );

        setTracks(formattedTracks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [playlist.songIds]);

  const handlePlayPauseClick = () => {
    if (!isLoggedIn) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleTrackPlayPause = async (track) => {
    try {
      if (!isLoggedIn) {
        onTrackSelect(track);
        return;
      }

      if (currentTrackId === track.id && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(track.url);
      audioRef.current = audio;

      audio.play();
      setIsPlaying(true);
      setCurrentTrackId(track.id);
      onTrackSelect(track);

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTrackId(null);
      };
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddToLibrary = () => {
    addToLibrary(playlist); // Gọi hàm addToLibrary để thêm playlist vào library
    // alert(`${playlist.name} has been added to Your Library!`); // Thông báo cho người dùng
  };

  const playlistImageUrl = playlist.coverImageId
    ? getImageUrl(playlist.coverImageId)
    : 'https://via.placeholder.com/150';

  return (
    <div className="bg-gray-800 p-5 text-white rounded-lg h-screen overflow-y-auto custom-scrollbar font-sans">
      <div className="flex items-center mb-5">
        <button
          className="text-gray-400 hover:text-white mr-3"
          onClick={onBack}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img
          src={playlistImageUrl}
          alt={playlist.name}
          className="w-40 h-40 object-cover mr-5"
        />
        <div>
          <p className="text-sm text-gray-400">Playlist</p>
          <h1 className="text-4xl font-bold">{playlist.name}</h1>
          <p className="text-gray-400 mt-2">{playlist.description}</p>
          <p className="text-gray-400 text-sm">
            Spotify • {tracks.length} songs
          </p>
        </div>
      </div>

      <div className="flex items-center mb-5">
        <button
          className="bg-[#1DB954] rounded-full w-12 h-12 flex items-center justify-center mr-3 hover:bg-[#1ED760] transition-colors duration-200"
          onClick={handlePlayPauseClick}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className="text-gray-400 hover:text-white mr-3"
          onClick={handleAddToLibrary} // Thêm sự kiện onClick cho nút "+"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="text-gray-400">
        {loading && <p>Loading tracks...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-12 gap-4 border-b border-gray-700 pb-2 mb-3">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Title</div>
              <div className="col-span-4">Category</div>
              <div className="col-span-2 text-right">
                <FiClock className="inline-block w-5 h-5" />
              </div>
            </div>
            {tracks.map((track) => (
              <div
                key={track.id}
                className="grid grid-cols-12 gap-4 py-2 hover:bg-[#282828] rounded-md cursor-pointer"
                onMouseEnter={() => setHoveredTrackId(track.id)}
                onMouseLeave={() => setHoveredTrackId(null)}
              >
                <div className="col-span-1 flex items-center">
                  {hoveredTrackId === track.id || currentTrackId === track.id ? (
                    <button onClick={() => handleTrackPlayPause(track)}>
                      {currentTrackId === track.id && isPlaying ? (
                        <FaPause className="text-white w-4 h-4" />
                      ) : (
                        <FaPlay className="text-white w-4 h-4" />
                      )}
                    </button>
                  ) : (
                    track.id
                  )}
                </div>
                <div className="col-span-5">
                  <p className="text-white">{track.title}</p>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <div className="col-span-4">{track.category}</div>
                <div className="col-span-2 text-right">{track.duration}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;

