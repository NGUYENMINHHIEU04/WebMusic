
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/hooks/use-toast";
import { ToastContainer, toast as reactToastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
import { ArrowLeft, Play, Music, Plus, Check, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getPlaylist, updatePlaylist } from '@/services/api_playlistcard';
import { getAllSongs } from '@/services/api_song';
import { getImageUrl } from '@/services/api_image';

const AlbumDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [albumSongs, setAlbumSongs] = useState([]);
  const [isAddSongsDialogOpen, setIsAddSongsDialogOpen] = useState(false);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

  // Fetch album details
  const { data: album, isLoading: isLoadingAlbum, error: albumError, refetch } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getPlaylist(id),
    enabled: !!id
  });

  // Fetch all songs to find the ones in this album
  const { data: allSongs = [], isLoading: isLoadingSongs } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs
  });

  // Filter songs that belong to the album
  useEffect(() => {
    if (album && allSongs.length > 0) {
      const songsInAlbum = allSongs.filter(song => 
        album.songIds && album.songIds.includes(song.id)
      );
      setAlbumSongs(songsInAlbum);
      
      // Set available songs for adding (excluding ones already in album)
      setAvailableSongs(allSongs.filter(song => 
        !album.songIds || !album.songIds.includes(song.id)
      ));

      // Initialize selected songs
      setSelectedSongs([]);
    }
  }, [album, allSongs]);

  // Handle play song
  const handlePlaySong = (song) => {
    reactToastify.info(`Playing: ${song.title}`);
  };

  // Handle adding songs to album
  const handleAddSongs = async () => {
    if (selectedSongs.length === 0) {
      reactToastify.error("No songs selected");
      return;
    }

    setIsUpdating(true);
    try {
      // Create updated song list by combining current and new songs
      const updatedSongIds = [...(album.songIds || []), ...selectedSongs];
      
      // Update the album with new song list
      await updatePlaylist(album.id, { ...album, songIds: updatedSongIds });
      
      // Refetch album data
      await refetch();
      
      reactToastify.success("Songs added to album successfully!");
      setIsAddSongsDialogOpen(false);
      setSelectedSongs([]);
    } catch (error) {
      console.error("Error adding songs to album:", error);
      reactToastify.error("Failed to add songs to album");
    } finally {
      setIsUpdating(false);
    }
  };

  // Show loading state
  if (isLoadingAlbum || isLoadingSongs) {
    return (
      <div className="p-6 flex justify-center items-center h-[70vh]">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-40 w-40 bg-gray-200 rounded-md mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-60 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (albumError || !album) {
    return (
      <div className="p-6">
        <Link to="/albums" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Albums
        </Link>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Album Not Found</h2>
          <p className="text-gray-600 mb-6">The album you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/albums">View All Albums</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/albums" className="flex items-center text-gray-600 hover:text-gray-900 mb-6 hover:scale-105 transition-transform inline-block">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Albums
        </Link>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Album Cover */}
        <motion.div 
          className="w-full md:w-48 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden shadow-sm">
            <img 
              src={album.coverImageId ? getImageUrl(album.coverImageId) : "/placeholder.svg"}
              alt={album.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
        </motion.div>

        {/* Album Info */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-1">{album.name}</h1>
          {album.description && (
            <p className="text-gray-600 mb-3">{album.description}</p>
          )}
          <div className="flex items-center text-sm text-gray-600 mb-6">
            <Music className="h-3 w-3 mr-1" />
            <span>{album.songIds ? album.songIds.length : 0} songs</span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setIsAddSongsDialogOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Songs
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.h2 
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        Songs in this Album
      </motion.h2>

      {/* Songs Table */}
      {albumSongs.length > 0 ? (
        <motion.div 
          className="border rounded-md overflow-hidden bg-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead className="text-right">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {albumSongs.map((song) => (
                <motion.tr 
                  key={song.id} 
                  className="border-b hover:bg-gray-50 transition-colors"
                  variants={itemVariants}
                >
                  <td className="py-3 px-4">
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handlePlaySong(song)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{song.title}</div>
                    {song.subTitle && (
                      <div className="text-sm text-gray-500">{song.subTitle}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {Array.isArray(song.artists) ? song.artists.join(', ') : 'Unknown Artist'}
                  </td>
                  <td className="py-3 px-4 text-right">{song.category || 'Uncategorized'}</td>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-10 bg-gray-50 rounded-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Music className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No songs in this album</h3>
          <p className="text-gray-500 mb-4">Add songs to this album to get started</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setIsAddSongsDialogOpen(true)}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Songs
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Add Songs Dialog */}
      <Dialog open={isAddSongsDialogOpen} onOpenChange={setIsAddSongsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Songs to {album.name}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="h-60 overflow-y-auto border rounded-md p-2">
              {availableSongs.length > 0 ? (
                availableSongs.map((song) => (
                  <motion.div 
                    key={song.id} 
                    className="flex items-center p-2 hover:bg-gray-50 rounded mb-1"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  >
                    <input 
                      type="checkbox"
                      id={`song-${song.id}`}
                      checked={selectedSongs.includes(song.id)}
                      onChange={() => {
                        if (selectedSongs.includes(song.id)) {
                          setSelectedSongs(selectedSongs.filter(id => id !== song.id));
                        } else {
                          setSelectedSongs([...selectedSongs, song.id]);
                        }
                      }}
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
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No additional songs available</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSongsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddSongs}
              disabled={isUpdating || selectedSongs.length === 0}
            >
              {isUpdating ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Add Songs
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AlbumDetail;
