import React from 'react';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Sign in to listen to music</h1>
      <p className="text-gray-400 mb-6">
      You need to log in to be able to play music and experience all the features of LmhMusic.
      </p>
      <button
        onClick={onLogin}
        className="bg-[#1DB954] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#1ED760] transition-colors duration-200"
      >
        Sign in now
      </button>
    </div>
  );
};

export default LoginPage;