import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import ToggleBox from '../components/ToggleBox';
import LoginForm from '../components/LoginForm';

function AuthPage() {
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-100">
      <div className={`relative w-[850px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-in-out ${isActive ? 'active' : ''}`}>
        <LoginForm isActive={isActive} />
        <RegisterForm isActive={isActive} />
        <ToggleBox isActive={isActive} toggleForm={toggleForm} />
      </div>
    </div>
  );
}

export default AuthPage;