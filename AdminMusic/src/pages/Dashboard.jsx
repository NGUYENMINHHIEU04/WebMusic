
import { useQuery } from '@tanstack/react-query';
import { Music, Album, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StatCard from '../components/Dashboard/StatCard';
import RecentSection from '../components/Dashboard/RecentSection';
import songApi from '../services/api_song';
import artistApi from '../services/api_artist';

const Dashboard = () => {
  // Fetch songs data
  const { data: songs = [] } = useQuery({
    queryKey: ['songs'],
    queryFn: songApi.getAllSongs,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  // Fetch albums data (placeholder for now)
  const { data: albums = [] } = useQuery({
    queryKey: ['albums'],
    queryFn: () => Promise.resolve([]), // Replace with actual API call when available
    staleTime: 5 * 60 * 1000
  });

  // Fetch artists data
  const { data: artists = [] } = useQuery({
    queryKey: ['artists'],
    queryFn: artistApi.getAllArtists,
    staleTime: 5 * 60 * 1000
  });

  // Get stats
  const stats = {
    songs: songs.length,
    albums: albums.length,
    users: 0 // Placeholder for now
  };

  // Get recent songs (last 6)
  const recentSongs = songs.slice(0, 6);

  // Get recent albums (placeholder for now)
  const recentAlbums = albums.slice(0, 6);

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
