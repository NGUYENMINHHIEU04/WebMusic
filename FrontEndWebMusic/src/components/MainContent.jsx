// import React, { useState } from 'react';
// import PlaylistCard from './PlaylistCard';
// import PlaylistDetail from './PlaylistDetail';

// const MainContent = ({
//   showSingerInfo,
//   isPlaying,
//   setIsPlaying,
//   currentPlayingCard,
//   handlePlayPause,
// }) => {
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);

//   const playlists = [
//     {
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-HDimUUOguRmwDoYVQpoNwHOP8X8Pjpzu7g&s',
//       title: 'Daily Mix 02',
//       artists: 'Braaheim, YES YES, BRAN and more',
//     },
//     {
//       image: 'https://via.placeholder.com/150',
//       title: 'Daily Mix 03',
//       artists: 'BAYZY, AKOJ, LUCKY DEMON and more',
//     },
//     {
//       image: 'https://via.placeholder.com/150',
//       title: 'Daily Mix 04',
//       artists: 'Lucas Estrada, Robbe, Lost Frequencies an...',
//     },
//     {
//       image: 'https://via.placeholder.com/150',
//       title: 'Daily Mix 05',
//       artists: 'MEDUZA, Wahlstedt, Steve Aoki and more',
//     },
//     {
//       image: 'https://via.placeholder.com/150',
//       title: 'Daily Mix 06',
//       artists: 'David Guetta, Tiësto, Dimitri Vegas & Like...',
//     },
//   ];

//   const handleCardClick = (playlist) => {
//     setSelectedPlaylist(playlist);
//   };

//   const handleBack = () => {
//     setSelectedPlaylist(null);
//   };

//   return (
//     <>
//       <style>
//         {`
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 8px;
//           }
//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//           }
//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #4a5568;
//             border-radius: 4px;
//           }
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: #6b7280;
//           }
//         `}
//       </style>

//       <div className="bg-gray-800 p-5 text-white rounded-lg h-[calc(100vh-96px)] overflow-y-auto custom-scrollbar">
//         {selectedPlaylist ? (
//           <PlaylistDetail
//             playlist={selectedPlaylist}
//             onBack={handleBack}
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//           />
//         ) : (
//           <>
//             <div className="p-5 text-white font-sans">
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold uppercase">
//                   MADE FOR MANH NGUYEN
//                 </h2>
//                 <a
//                   href="#"
//                   className="text-gray-400 text-sm hover:text-white hover:underline"
//                 >
//                   SHOW ALL
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//                 {playlists.map((playlist, index) => (
//                   <PlaylistCard
//                     key={index}
//                     index={index}
//                     image={playlist.image}
//                     title={playlist.title}
//                     artists={playlist.artists}
//                     onCardClick={() => handleCardClick(playlist)}
//                     isPlaying={isPlaying && currentPlayingCard === index}
//                     onPlayPause={() => handlePlayPause(index)}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="p-5 text-white font-sans">
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold uppercase">
//                   MADE FOR MANH NGUYEN
//                 </h2>
//                 <a
//                   href="#"
//                   className="text-gray-400 text-sm hover:text-white hover:underline"
//                 >
//                   SHOW ALL
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//                 {playlists.map((playlist, index) => (
//                   <PlaylistCard
//                     key={index}
//                     index={index}
//                     image={playlist.image}
//                     title={playlist.title}
//                     artists={playlist.artists}
//                     onCardClick={() => handleCardClick(playlist)}
//                     isPlaying={isPlaying && currentPlayingCard === index}
//                     onPlayPause={() => handlePlayPause(index)}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="p-5 text-white font-sans">
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold uppercase">
//                   MADE FOR MANH NGUYEN
//                 </h2>
//                 <a
//                   href="#"
//                   className="text-gray-400 text-sm hover:text-white hover:underline"
//                 >
//                   SHOW ALL
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//                 {playlists.map((playlist, index) => (
//                   <PlaylistCard
//                     key={index}
//                     index={index}
//                     image={playlist.image}
//                     title={playlist.title}
//                     artists={playlist.artists}
//                     onCardClick={() => handleCardClick(playlist)}
//                     isPlaying={isPlaying && currentPlayingCard === index}
//                     onPlayPause={() => handlePlayPause(index)}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="p-5 text-white font-sans">
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold uppercase">
//                   MADE FOR MANH NGUYEN
//                 </h2>
//                 <a
//                   href="#"
//                   className="text-gray-400 text-sm hover:text-white hover:underline"
//                 >
//                   SHOW ALL
//                 </a>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
//                 {playlists.map((playlist, index) => (
//                   <PlaylistCard
//                     key={index}
//                     index={index}
//                     image={playlist.image}
//                     title={playlist.title}
//                     artists={playlist.artists}
//                     onCardClick={() => handleCardClick(playlist)}
//                     isPlaying={isPlaying && currentPlayingCard === index}
//                     onPlayPause={() => handlePlayPause(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default MainContent;

import React, { useState } from 'react';
import PlaylistCard from './PlaylistCard';
import PlaylistDetail from './PlaylistDetail';

const MainContent = ({
  showSingerInfo,
  isPlaying,
  setIsPlaying,
  currentPlayingCard,
  handlePlayPause,
  onTrackSelect, // Nhận callback từ Homepage
}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const playlists = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-HDimUUOguRmwDoYVQpoNwHOP8X8Pjpzu7g&s',
      title: 'Daily Mix 02',
      artists: 'Braaheim, YES YES, BRAN and more',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Daily Mix 03',
      artists: 'BAYZY, AKOJ, LUCKY DEMON and more',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Daily Mix 04',
      artists: 'Lucas Estrada, Robbe, Lost Frequencies an...',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Daily Mix 05',
      artists: 'MEDUZA, Wahlstedt, Steve Aoki and more',
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Daily Mix 06',
      artists: 'David Guetta, Tiësto, Dimitri Vegas & Like...',
    },
  ];

  const handleCardClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleBack = () => {
    setSelectedPlaylist(null);
  };

  return (
    <>
      <style>
        {`
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

      <div className="bg-gray-800 p-5 text-white rounded-lg h-[calc(100vh-96px)] overflow-y-auto custom-scrollbar">
        {selectedPlaylist ? (
          <PlaylistDetail
            playlist={selectedPlaylist}
            onBack={handleBack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onTrackSelect={onTrackSelect} // Truyền callback xuống PlaylistDetail
          />
        ) : (
          <>
            <div className="p-5 text-white font-sans">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold uppercase">
                  MADE FOR MANH NGUYEN
                </h2>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white hover:underline"
                >
                  SHOW ALL
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={index}
                    index={index}
                    image={playlist.image}
                    title={playlist.title}
                    artists={playlist.artists}
                    onCardClick={() => handleCardClick(playlist)}
                    isPlaying={isPlaying && currentPlayingCard === index}
                    onPlayPause={() => handlePlayPause(index)}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 text-white font-sans">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold uppercase">
                  MADE FOR MANH NGUYEN
                </h2>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white hover:underline"
                >
                  SHOW ALL
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={index}
                    index={index}
                    image={playlist.image}
                    title={playlist.title}
                    artists={playlist.artists}
                    onCardClick={() => handleCardClick(playlist)}
                    isPlaying={isPlaying && currentPlayingCard === index}
                    onPlayPause={() => handlePlayPause(index)}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 text-white font-sans">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold uppercase">
                  MADE FOR MANH NGUYEN
                </h2>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white hover:underline"
                >
                  SHOW ALL
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={index}
                    index={index}
                    image={playlist.image}
                    title={playlist.title}
                    artists={playlist.artists}
                    onCardClick={() => handleCardClick(playlist)}
                    isPlaying={isPlaying && currentPlayingCard === index}
                    onPlayPause={() => handlePlayPause(index)}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 text-white font-sans">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold uppercase">
                  MADE FOR MANH NGUYEN
                </h2>
                <a
                  href="#"
                  className="text-gray-400 text-sm hover:text-white hover:underline"
                >
                  SHOW ALL
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {playlists.map((playlist, index) => (
                  <PlaylistCard
                    key={index}
                    index={index}
                    image={playlist.image}
                    title={playlist.title}
                    artists={playlist.artists}
                    onCardClick={() => handleCardClick(playlist)}
                    isPlaying={isPlaying && currentPlayingCard === index}
                    onPlayPause={() => handlePlayPause(index)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainContent;