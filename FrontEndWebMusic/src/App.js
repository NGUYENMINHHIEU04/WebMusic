

// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AuthPage from './pages/AuthPage';
// import ForgotPassword from './pages/ForgotPassword';
// import Homepage from './pages/HomePage';
// import Dashboard from './pages/Dashboard';
// import { AuthProvider } from './context/AuthContext';

// const App = () => {
//   return (
//     <AuthProvider>
//     <Router>
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/login" element={<AuthPage />} />
//         <Route path="/home" element={<Homepage />} />
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//     </AuthProvider>
//   );
// };


// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ForgotPassword from './pages/ForgotPassword';
import Homepage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext'; // Import LibraryProvider

const App = () => {
  return (
    <AuthProvider>
      <LibraryProvider> {/* Bọc toàn bộ ứng dụng trong LibraryProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </LibraryProvider>
    </AuthProvider>
  );
};

export default App;