// // // AuthContext.js
// // import React, { createContext, useState, useEffect } from 'react';

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);


// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       setIsLoggedIn(true);
// //     }
// //   }, []);



// //   const login = (token) => {
// //     localStorage.setItem('token', token);
// //     setIsLoggedIn(true);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setIsLoggedIn(false);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isLoggedIn, login, logout, }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null); // Add userId state

//   useEffect(() => {
//     // Check for token and userId in localStorage on initial load
//     const token = localStorage.getItem('token');
//     const storedUserId = localStorage.getItem('userId');
//     if (token && storedUserId) {
//       setIsLoggedIn(true);
//       setUserId(storedUserId);
//     }
//   }, []);

//   const login = (token, userId) => {
//     // Store both token and userId in localStorage
//     localStorage.setItem('token', token);
//     localStorage.setItem('userId', userId);
//     setIsLoggedIn(true);
//     setUserId(userId);
//   };

//   const logout = () => {
//     // Remove both token and userId from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//     setUserId(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId(null);
    // Không cần xóa currentSong ở đây vì Homepage sẽ xử lý dựa trên userId
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};