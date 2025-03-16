// LoginBanner.js
import React from "react";

const LoginBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <p>Xem trước Spotify</p>
        <p className="text-sm">
          Đăng ký để nghe bài hát và podcast không giới hạn với đầy đủ thứ hạng xuất hiện. Không cần thẻ tín dụng.
        </p>
      </div>
      <button className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200">
        Đăng ký miễn phí
      </button>
    </div>
  );
};

export default LoginBanner;