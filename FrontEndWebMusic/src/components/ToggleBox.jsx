import React from 'react';

function ToggleBox({ isActive, toggleForm }) {
  return (
    <div className="absolute w-full h-full">
      <div className={`absolute w-[300%] h-full bg-purple-500 rounded-full transition-all duration-1000 ease-in-out ${isActive ? 'left-1/2' : '-left-[250%]'}`}></div>
      <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white transition-all duration-1000 ease-in-out ${isActive ? '-left-1/2' : 'left-0'}`}>
        <h1 className="text-4xl font-bold">Hello, Welcome!</h1>
        <p className="my-4">Don't have an account?</p>
        <button onClick={toggleForm} className="w-40 py-2 bg-transparent border-2 border-white rounded-lg text-white font-semibold text-lg hover:bg-white hover:text-blue-500 transition-all">
          Register
        </button>
      </div>
      <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white transition-all duration-1000 ease-in-out ${isActive ? 'right-0' : '-right-1/2'}`}>
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
        <p className="my-4">Already have an account?</p>
        <button onClick={toggleForm} className="w-40 py-2 bg-transparent border-2 border-white rounded-lg text-white font-semibold text-lg hover:bg-white hover:text-blue-500 transition-all">
          Login
        </button>
      </div>
    </div>
  );
}

export default ToggleBox;