import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginBanner = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleSignUpClick = () => {
    navigate("/auth"); // Điều hướng đến trang AuthPage
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 text-white p-4 flex justify-between items-center">
      <div>
        <p>Preview LmhMusic</p>
        <p className="text-sm">
        Sign up to listen to unlimited songs with full rankings appearing. No credit card required.
        </p>
      </div>
      <button
        className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-gray-200"
        onClick={handleSignUpClick} // Gắn sự kiện onClick
      >
        Sign up for free
      </button>
    </div>
  );
};

export default LoginBanner;