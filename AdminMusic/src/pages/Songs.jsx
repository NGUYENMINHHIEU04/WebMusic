
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Songs</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Song
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search songs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {songs.length > 0 ? (
        <motion.div variants={container} initial="hidden" animate="show">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Song items would be mapped here */}
            </TableBody>
          </Table>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16 border border-dashed rounded-lg"
          variants={item}
          initial="hidden"
          animate="show"
        >
          <Music className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No songs available</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first song</p>
          <Button className="flex items-center gap-2 mx-auto">
            <Plus className="h-4 w-4" />
            Add New Song
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Songs;
