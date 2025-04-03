
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Album, Users, Settings, Image, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Music, label: 'Songs', path: '/songs' },
    { icon: Album, label: 'Albums', path: '/albums' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Headphones, label: 'Audio', path: '/audio' },
    { icon: Image, label: 'Images', path: '/images' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <motion.div 
      className="h-screen w-[220px] bg-white border-r border-gray-100 flex flex-col shadow-sm"
      initial={{ x: -10, opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-3 font-semibold text-xl">
          <Music className="h-6 w-6" />
          <span>LMH Music</span>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-md ${
                    isActive 
                      ? 'bg-gray-100 text-black' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-black' : 'text-gray-400'}`} />
                  <span className="flex-1">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
