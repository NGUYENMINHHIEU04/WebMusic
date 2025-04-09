import React, { useState, useEffect, useRef } from "react";
import { getAllSongs, recommendSongs, getLikedSongs } from "../apis/api_song"; // Import các hàm từ api_song.js

// Danh sách từ khóa để phân tích tâm trạng
const MOOD_KEYWORDS = {
  happy: ["love", "joy", "happy", "bright", "cheerful", "smile", "dance"],
  sad: ["sad", "cry", "heartbreak", "lonely", "tears", "blue"],
  relax: ["calm", "peace", "chill", "relax", "soothe", "mellow"],
};

// Hàm phân tích tâm trạng từ tiêu đề và mô tả
const analyzeMood = (title = "", description = "") => {
  const text = `${title.toLowerCase()} ${description.toLowerCase()}`;
  let detectedMood = "unknown";

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      detectedMood = mood;
      break;
    }
  }

  return detectedMood;
};

// Hàm tính tần suất category và artist từ lịch sử nghe
const calculateFrequencies = (history) => {
  const categoryFrequency = {};
  const artistFrequency = {};

  history.forEach((song) => {
    const category = song.category || "Unknown Category";
    const artist = song.artist || "Unknown Artist";

    categoryFrequency[category] = (categoryFrequency[category] || 0) + 1;
    artistFrequency[artist] = (artistFrequency[artist] || 0) + 1;
  });

  return { categoryFrequency, artistFrequency };
};

const Chatbot = ({ onClose, userId = "user123" }) => { // Giả sử userId được truyền từ Homepage
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Tôi là Chatbot. Bạn đang cảm thấy thế nào? (Ví dụ: happy, sad, relax)" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      // Kiểm tra nếu người dùng yêu cầu gợi ý bài hát dựa trên tâm trạng
      const moodMatch = text.toLowerCase().match(/(happy|sad|relax)/);
      if (moodMatch) {
        const mood = moodMatch[0];
        await recommendSongsBasedOnMood(mood);
      } else {
        // Phản hồi mặc định nếu không nhận diện được yêu cầu
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Tôi không hiểu. Bạn có thể nói rõ tâm trạng của bạn không? (Ví dụ: happy, sad, relax)" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Có lỗi xảy ra. Vui lòng thử lại!" },
      ]);
    }
  };

  const recommendSongsBasedOnMood = async (mood) => {
    try {
      // Gọi API để lấy lịch sử nghe và danh sách bài hát
      const history = await getLikedSongs(userId); // Lấy lịch sử nghe (giả sử getLikedSongs trả về danh sách bài hát đã thích)
      const allSongs = await getAllSongs(); // Lấy tất cả bài hát

      // Tính tần suất category và artist từ lịch sử nghe
      const { categoryFrequency, artistFrequency } = calculateFrequencies(history);

      // Phân tích tâm trạng và gán nhãn cho từng bài hát
      const songsWithMood = allSongs.map((song) => {
        const detectedMood = analyzeMood(song.title, song.description || "");
        return { ...song, mood: detectedMood };
      });

      // Lọc các bài hát phù hợp với tâm trạng
      const moodFilteredSongs = songsWithMood.filter((song) => song.mood === mood);

      // Tính điểm cá nhân hóa cho từng bài hát
      const scoredSongs = moodFilteredSongs.map((song) => {
        let score = 0;

        // Tăng điểm nếu category phù hợp với sở thích người dùng
        const categoryScore = categoryFrequency[song.category] || 0;
        score += categoryScore * 2; // Nhân với trọng số

        // Tăng điểm nếu artist phù hợp với sở thích người dùng
        const artistScore = artistFrequency[song.artist] || 0;
        score += artistScore * 3; // Nhân với trọng số cao hơn cho artist

        return { ...song, score };
      });

      // Sắp xếp bài hát theo điểm số (cao đến thấp)
      const sortedSongs = scoredSongs.sort((a, b) => b.score - a.score);

      // Lấy top 3 bài hát để gợi ý
      const topSongs = sortedSongs.slice(0, 3);

      if (topSongs.length === 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: `Không tìm thấy bài hát nào phù hợp với tâm trạng "${mood}". Hãy thử tâm trạng khác!` },
        ]);
        return;
      }

      // Tạo phản hồi gợi ý
      const recommendationMessage = `Dựa trên tâm trạng "${mood}" và sở thích của bạn, tôi gợi ý các bài hát sau:\n${topSongs
        .map((song, index) => `${index + 1}. ${song.title} - ${song.artist} (${song.category})`)
        .join("\n")}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: recommendationMessage },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Có lỗi khi gợi ý bài hát. Vui lòng thử lại!" },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col h-96 relative">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 text-center rounded-t-lg flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chatbot</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`max-w-[70%] p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span>{msg.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập tâm trạng (happy, sad, relax)..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => sendMessage(input)}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;