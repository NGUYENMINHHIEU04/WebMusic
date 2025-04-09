
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ToastContainer, toast as reactToastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Music, Plus, Search, Trash } from 'lucide-react';
import { getAllPlaylists, createPlaylist, deletePlaylist } from '@/services/api_playlistcard';
import { getAllSongs } from '@/services/api_song';
import { getAllImages, getImageUrl } from '@/services/api_image';
import AlbumCard from '@/components/albums/AlbumCard';

const Albums = () => {
  const { toast } = useToast();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    name: '',
    description: '',
    coverImageId: '',
    songIds: []
  });
  const [availableSongs, setAvailableSongs] = useState([]);
  const [availableImages, setAvailableImages] = useState([]);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedAlbums = await getAllPlaylists() || [];
        setAlbums(fetchedAlbums);
        
        const songs = await getAllSongs() || [];
        setAvailableSongs(songs);
        
        const imageIds = await getAllImages() || [];
        setAvailableImages(imageIds);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          title: "Error",
          description: "Failed to load albums",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAlbums = albums.filter(album => 
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (album.description && album.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateAlbum = async () => {
    try {
      if (!newAlbum.name) {
        reactToastify.error("Album name is required");
        return;
      }
      if (!newAlbum.coverImageId) {
        reactToastify.error("Cover image is required");
        return;
      }
      if (newAlbum.songIds.length === 0) {
        reactToastify.error("At least one song is required");
        return;
      }

      const createdAlbum = await createPlaylist(newAlbum);
      if (createdAlbum) {
        const updatedAlbums = await getAllPlaylists() || [];
        setAlbums(updatedAlbums);
        
        setIsDialogOpen(false);
        setNewAlbum({
          name: '',
          description: '',
          coverImageId: '',
          songIds: []
        });
        
        reactToastify.success("Album created successfully!");
      }
    } catch (error) {
      console.error('Failed to create album:', error);
      reactToastify.error("Failed to create album");
    }
  };

  const handleDeleteAlbum = async (id, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this album?")) {
      try {
        await deletePlaylist(id);
        setAlbums(albums.filter(album => album.id !== id));
        reactToastify.success("Album deleted successfully!");
      } catch (error) {
        reactToastify.error("Failed to delete album");
      }
    }
  };

  const handleSongSelection = (songId) => {
    setNewAlbum(prev => {
      if (prev.songIds.includes(songId)) {
        return { ...prev, songIds: prev.songIds.filter(id => id !== songId) };
      } else {
        return { ...prev, songIds: [...prev.songIds, songId] };
      }
    });
  };

  const handlePlayAlbum = (album) => {
    reactToastify.info(`Playing album: ${album.name}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Albums</h1>
          <p className="text-gray-500 mt-1">Manage your music albums</p>
        </motion.div>
        <motion.div 
          initial={{ x: 20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="hover:scale-105 transition-transform"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Album
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded mt-3 w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : filteredAlbums.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAlbums.map(album => (
            <motion.div key={album.id} variants={itemVariants}>
              <div className="relative group">
                <AlbumCard 
                  album={album} 
                  onPlay={handlePlayAlbum} 
                />
                <motion.button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleDeleteAlbum(album.id, e)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center p-12 bg-gray-50 rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Music size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-xl font-medium text-gray-700">No albums found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try a different search term' : 'Create your first album to get started'}
          </p>
          {!searchTerm && (
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="hover:scale-105 transition-transform"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Album
            </Button>
          )}
        </motion.div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Album</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="album-name">Album Name</Label>
              <Input
                id="album-name"
                value={newAlbum.name}
                onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
                placeholder="Enter album name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="album-description">Description</Label>
              <Textarea
                id="album-description"
                value={newAlbum.description}
                onChange={(e) => setNewAlbum({ ...newAlbum, description: e.target.value })}
                placeholder="Enter album description"
                rows={2}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="album-cover">Cover Image</Label>
              <select
                id="album-cover"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                value={newAlbum.coverImageId}
                onChange={(e) => setNewAlbum({ ...newAlbum, coverImageId: e.target.value })}
              >
                <option value="">Select Cover Image</option>
                {availableImages.map((imageId) => (
                  <option key={imageId} value={imageId}>{imageId.substring(0, 8)}...</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label className="mb-1 block">Select Songs</Label>
              <div className="mt-1 h-40 overflow-y-auto border rounded-md p-2">
                {availableSongs.length > 0 ? (
                  availableSongs.map((song) => (
                    <div 
                      key={song.id} 
                      className="flex items-center p-2 hover:bg-gray-50 rounded"
                    >
                      <input 
                        type="checkbox"
                        id={`song-${song.id}`}
                        checked={newAlbum.songIds.includes(song.id)}
                        onChange={() => handleSongSelection(song.id)}
                        className="mr-3"
                      />
                      <label 
                        htmlFor={`song-${song.id}`}
                        className="flex flex-col cursor-pointer flex-1"
                      >
                        <span className="font-medium">{song.title}</span>
                        <span className="text-sm text-gray-500">
                          {Array.isArray(song.artists) ? song.artists.join(', ') : 'Unknown Artist'}
                        </span>
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No songs available</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAlbum}>
              Create Album
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Albums;