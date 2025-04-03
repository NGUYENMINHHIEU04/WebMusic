
import { Music, Album, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/Dashboard/StatCard';
import RecentSection from '../components/Dashboard/RecentSection';

const Dashboard = () => {
  // Mock data
  const stats = {
    songs: 0,
    albums: 0,
    users: 0
  };

  const recentSongs = [];
  const recentAlbums = [];

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Manage your songs, albums, and users</p>
      </div>

      {/* Stats Cards - Giờ đặt trong 1 hàng */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex-1 min-w-[250px]">
          <StatCard 
            icon={Music} 
            title="Songs" 
            count={stats.songs} 
            viewAllLink="/songs" 
            iconBgColor="bg-blue-500" 
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <StatCard 
            icon={Album} 
            title="Albums" 
            count={stats.albums} 
            viewAllLink="/albums" 
            iconBgColor="bg-purple-500" 
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <StatCard 
            icon={Users} 
            title="Users" 
            count={stats.users} 
            viewAllLink="/users" 
            iconBgColor="bg-green-500" 
          />
        </div>
      </div>

      {/* Recent Songs */}
      <RecentSection 
        title="Recently Added Songs"
        items={recentSongs}
        emptyMessage="No songs available"
        addButtonText="Add songs"
        viewAllLink="/songs"
        addAction={() => console.log('Add songs')}
      />

      {/* Recent Albums */}
      <RecentSection 
        title="Recently Added Albums"
        items={recentAlbums}
        emptyMessage="No albums available"
        addButtonText="Add albums"
        viewAllLink="/albums"
        addAction={() => console.log('Add albums')}
      />
    </motion.div>
  );
};

export default Dashboard;
