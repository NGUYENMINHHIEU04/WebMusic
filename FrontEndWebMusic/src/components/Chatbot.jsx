// import React, { useState, useEffect, useRef } from "react";
// import { getAllSongs } from "../apis/api_song"; // Import function from api_song.js

// // List of keywords to analyze mood (kept consistent with SongService.java)
// const MOOD_KEYWORDS = {
//   happy: ["love", "happy", "joy", "fun", "dance", "smile", "bright", "cheer"],
//   sad: ["sad", "cry", "tears", "alone", "heartbreak", "loss", "blue", "lonely"],
//   relax: ["calm", "peace", "chill", "slow", "soft", "dream", "quiet", "serene"],
//   angry: ["rage", "angry", "fight", "hate", "fire", "storm", "break", "fury"],
// };

// // List of categories by mood (kept consistent with SongService.java)
// const MOOD_TO_CATEGORY = {
//   happy: ["Pop", "Dance", "Rock", "Chill"],
//   sad: ["Ballad", "Acoustic"],
//   relax: ["Jazz", "Classical", "Ambient", "Pop", "Dance", "Rock", "Chill"],
//   angry: ["Rock", "Metal"],
// };

// const Chatbot = ({ onClose, userId = "user123" }) => {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hello! I’m Chatbot. How are you feeling? (e.g., happy, sad, relax, angry, or words like love, cry, calm, rage...)",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async (text) => {
//     if (!text.trim()) return;

//     const userMessage = { sender: "user", text };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput("");

//     try {
//       // Check if the user input contains keywords from MOOD_KEYWORDS
//       const detectedMood = detectMoodFromInput(text.toLowerCase());
//       if (detectedMood !== "unknown") {
//         await recommendSongsByMood(detectedMood);
//       } else {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             sender: "bot",
//             text: "I couldn’t recognize a mood from your message. Try words like happy, sad, relax, angry, love, cry, calm, rage...",
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: "An error occurred. Please try again!" },
//       ]);
//     }
//   };

//   // Function to check keywords in input and determine mood
//   const detectMoodFromInput = (inputText) => {
//     let detectedMood = "unknown";

//     for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
//       if (keywords.some((keyword) => inputText.includes(keyword))) {
//         detectedMood = mood;
//         break;
//       }
//     }

//     return detectedMood;
//   };

//   // Function to recommend songs based on mood and category
//   const recommendSongsByMood = async (mood) => {
//     try {
//       // Fetch all songs
//       const allSongs = await getAllSongs();

//       // Get the list of categories suitable for the mood from MOOD_TO_CATEGORY
//       const validCategories = MOOD_TO_CATEGORY[mood] || [];

//       if (validCategories.length === 0) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             sender: "bot",
//             text: `No song categories match the mood "${mood}". Try a different mood!`,
//           },
//         ]);
//         return;
//       }

//       // Filter songs that belong to the suitable categories
//       const filteredSongs = allSongs.filter((song) =>
//         validCategories.includes(song.category)
//       );

//       if (filteredSongs.length === 0) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             sender: "bot",
//             text: `No songs found in categories matching the mood "${mood}" (${validCategories.join(
//               ", "
//             )}). Try a different mood!`,
//           },
//         ]);
//         return;
//       }

//       // Calculate the frequency of categories in the list of matching songs
//       const categoryFrequency = {};
//       filteredSongs.forEach((song) => {
//         const category = song.category || "Unknown Category";
//         categoryFrequency[category] = (categoryFrequency[category] || 0) + 1;
//       });

//       // Find the most common category
//       const mostCommonCategory = Object.entries(categoryFrequency).reduce(
//         (a, b) => (b[1] > a[1] ? b : a),
//         ["Unknown", 0]
//       )[0];

//       // Get the top 3 songs from the most common category
//       const topSongsInCategory = filteredSongs
//         .filter((song) => song.category === mostCommonCategory)
//         .slice(0, 3);

//       // Create response
//       let responseMessage = `Based on your mood "${mood}", I found that suitable songs often belong to these categories: ${validCategories.join(
//         ", "
//       )}. The most common category is "${mostCommonCategory}". Here are some suggestions:\n`;
//       if (topSongsInCategory.length > 0) {
//         responseMessage += topSongsInCategory
//           .map((song, index) => `${index + 1}. ${song.title} - ${song.artist}`)
//           .join("\n");
//       } else {
//         responseMessage += "No songs in this category to suggest.";
//       }

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: responseMessage },
//       ]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: "An error occurred while suggesting songs. Please try again!" },
//       ]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       sendMessage(input);
//     }
//   };

//   return (
//     <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col h-96 relative">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-3 text-center rounded-t-lg flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Chatbot</h2>
//         <button onClick={onClose} className="text-white hover:text-gray-200">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               msg.sender === "user" ? "justify-end" : "justify-start"
//             } mb-2`}
//           >
//             <div
//               className={`max-w-[70%] p-2 rounded-lg ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               <span>{msg.text}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex p-4 border-t border-gray-300">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Enter your mood (happy, sad, relax, angry, love, cry...)"
//           className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={() => sendMessage(input)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;