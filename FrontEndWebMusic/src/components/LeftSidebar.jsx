// import React from "react";
// import { FaSearch, FaBook, FaPlus, FaArrowLeft } from "react-icons/fa";

// const LeftSidebar = () => {
//   return (
//     <>
//       <style>
//         {`
//           /* Custom scrollbar styling inspired by Spotify */
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 8px; /* Thin scrollbar like Spotify */
//           }

//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent; /* No background for track */
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #4a5568; /* Gray color matching Spotify's dark theme */
//             border-radius: 4px; /* Rounded edges */
//           }

//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: #6b7280; /* Slightly lighter gray on hover */
//           }

//           /* Hover effect for playlist/artist items */
//           .playlist-item:hover {
//             background-color: #2a2a2a; /* Darker gray on hover */
//             border-radius: 4px;
//           }
//         `}
//       </style>
//       <div className="w-1/5 bg-black text-white p-5 h-screen overflow-y-auto custom-scrollbar">
//         {/* Header Section */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <FaBook className="mr-2 text-gray-400" />
//             <h1 className="text-lg font-bold">Your Library</h1>
//           </div>
//           <div className="flex items-center space-x-3">
//             <FaPlus className="text-gray-400 hover:text-white cursor-pointer" />
//             <FaArrowLeft className="text-gray-400 hover:text-white cursor-pointer" />
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="flex space-x-4 mb-4">
//           <button className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
//             Playlists
//           </button>
//           <button className="bg-transparent text-gray-400 px-4 py-1 rounded-full text-sm font-semibold hover:text-white">
//             Artists
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="flex items-center mb-4">
//           <FaSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search in Your Library"
//             className="w-full bg-transparent text-gray-400 text-sm outline-none"
//           />
//         </div>

//         {/* Library Items */}
//         <div className="space-y-2">
//           {/* Liked Songs */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50/8b5cf6/ffffff?text=♥"
//               alt="Liked Songs"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Liked Songs</h3>
//               <p className="text-gray-400 text-sm">Playlist • 1 song</p>
//             </div>
//           </div>

//           {/* Artist: Sơn Tùng M-TP */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Artist"
//               alt="Son Tung M-TP"
//               className="w-12 h-12 rounded-full mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Sơn Tùng M-TP</h3>
//               <p className="text-gray-400 text-sm">Artist</p>
//             </div>
//           </div>

//           {/* Playlist: Chill để chơi game */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Game"
//               alt="Chill để chơi game"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Chill </h3>
//               <p className="text-gray-400 text-sm">Playlist • Buitrithanh</p>
//             </div>
//           </div>

//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>

//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>


//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>


//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>


//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>{/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>



//           {/* Playlist: Obito Mix */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito Mix"
//               className="w-12 h-12 rounded mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito Mix</h3>
//               <p className="text-gray-400 text-sm">Playlist • Spotify</p>
//             </div>
//           </div>




//           {/* Artist: Obito */}
//           <div className="flex items-center p-2 playlist-item cursor-pointer">
//             <img
//               src="https://via.placeholder.com/50?text=Obito"
//               alt="Obito"
//               className="w-12 h-12 rounded-full mr-3"
//             />
//             <div>
//               <h3 className="text-white font-semibold">Obito</h3>
//               <p className="text-gray-400 text-sm">Artist</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LeftSidebar;

import React from "react";
import { FaHome, FaSearch, FaBook, FaPlus, FaArrowLeft } from "react-icons/fa";

const LeftSidebar = () => {
  return (
    <>
      <style>
        {`
          /* Custom scrollbar styling inspired by Spotify */
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px; /* Thin scrollbar like Spotify */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; /* No background for track */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4a5568; /* Gray color matching Spotify's dark theme */
            border-radius: 4px; /* Rounded edges */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #6b7280; /* Slightly lighter gray on hover */
          }

          /* Hover effect for playlist/artist items */
          .playlist-item:hover {
            background-color: #2a2a2a; /* Darker gray on hover */
            border-radius: 4px;
          }
        `}
      </style>
      <div className=" bg-black text-white p-5 h-screen">
        {/* Fixed Header Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaBook className="mr-2 text-gray-400" />
              <h1 className="text-lg font-bold">Your Library</h1>
            </div>
            <div className="flex items-center space-x-3">
              <FaPlus className="text-gray-400 hover:text-white cursor-pointer" />
              <FaArrowLeft className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex space-x-4 mb-4">
            <button className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Playlists
            </button>
            <button className="bg-transparent text-gray-400 px-4 py-1 rounded-full text-sm font-semibold hover:text-white">
              Artists
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search in Your Library"
              className="w-full bg-transparent text-gray-400 text-sm outline-none"
            />
          </div>
        </div>

        {/* Scrollable Library Items Section */}
        <div className="overflow-y-auto custom-scrollbar h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {/* Liked Songs */}
            <div className="flex items-center p-2 playlist-item cursor-pointer">
              <img
                src="https://via.placeholder.com/50/8b5cf6/ffffff?text=♥"
                alt="Liked Songs"
                className="w-12 h-12 rounded mr-3"
              />
              <div>
                <h3 className="text-white font-semibold">Liked Songs</h3>
                <p className="text-gray-400 text-sm">Playlist • 1 song</p>
              </div>
            </div>

            {/* Artist: Sơn Tùng M-TP */}
            <div className="flex items-center p-2 playlist-item cursor-pointer">
              <img
                src="https://via.placeholder.com/50?text=Artist"
                alt="Son Tung M-TP"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-white font-semibold">Sơn Tùng M-TP</h3>
                <p className="text-gray-400 text-sm">Artist</p>
              </div>
            </div>

            {/* Playlist: Chill để chơi game */}
            <div className="flex items-center p-2 playlist-item cursor-pointer">
              <img
                src="https://via.placeholder.com/50?text=Game"
                alt="Chill để chơi game"
                className="w-12 h-12 rounded mr-3"
              />
              <div>
                <h3 className="text-white font-semibold">Chill để chơi game 😊</h3>
                <p className="text-gray-400 text-sm">Playlist • Buitrithanh</p>
              </div>
            </div>

            {/* Playlist: Obito Mix */}
            <div className="flex items-center p-2 playlist-item cursor-pointer">
              <img
                src="https://via.placeholder.com/50?text=Obito"
                alt="Obito Mix"
                className="w-12 h-12 rounded mr-3"
              />
              <div>
                <h3 className="text-white font-semibold">Obito Mix</h3>
                <p className="text-gray-400 text-sm">Playlist • Spotify</p>
              </div>
            </div>

            {/* Artist: Obito */}
            <div className="flex items-center p-2 playlist-item cursor-pointer">
              <img
                src="https://via.placeholder.com/50?text=Obito"
                alt="Obito"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-white font-semibold">Obito</h3>
                <p className="text-gray-400 text-sm">Artist</p>
              </div>
            </div>

            {/* Thêm các mục giả để kiểm tra cuộn */}
            {[...Array(20)].map((_, index) => (
              <div key={index} className="flex items-center p-2 playlist-item cursor-pointer">
                <img
                  src={`https://via.placeholder.com/50?text=Item${index + 1}`}
                  alt={`Item ${index + 1}`}
                  className="w-12 h-12 rounded mr-3"
                />
                <div>
                  <h3 className="text-white font-semibold">Item {index + 1}</h3>
                  <p className="text-gray-400 text-sm">Playlist</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;