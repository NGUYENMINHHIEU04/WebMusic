
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import adminApi from '../services/api_admin';

const Layout = () => {
  const navigate = useNavigate();
  
  // Add logout handler
  const handleLogout = () => {
    adminApi.logoutAdmin();
    toast.info('You have been logged out');
    navigate('/admin/login');
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Layout;
