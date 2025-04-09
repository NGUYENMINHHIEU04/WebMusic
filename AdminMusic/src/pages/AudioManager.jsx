import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ToastContainer, toast as reactToastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Music, Plus, Trash, Clock, Search, LoaderCircle } from 'lucide-react';
import { getAllAudios, uploadAudio, deleteAudio, getAudioData, getAudioDurationHelper } from '../services/api_audio';

const AudioManager = () => {
  const { toast } = useToast();
  const [audios, setAudios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioDuration, setAudioDuration] = useState("");
  const [audioPreview, setAudioPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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

  // Fetch audios when component mounts
  useEffect(() => {
    fetchAudios();
  }, []);

  // Fetch all audios
  const fetchAudios = async () => {
    setIsLoading(true);
    try {
      const response = await getAllAudios();
      console.log("Fetched audios:", response);
      
      // Check if the response has a data property (indicates it's wrapped in an API response object)
      const audioData = response.data || response;
      setAudios(Array.isArray(audioData) ? audioData : []);
    } catch (error) {
      console.error("Error in fetchAudios:", error);
      reactToastify.error("Failed to load audio files");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an audio file
    if (!file.type.includes('audio')) {
      reactToastify.error("Please select an audio file");
      return;
    }

    setAudioFile(file);
    
    try {
      // Create audio preview URL
      const previewUrl = URL.createObjectURL(file);
      setAudioPreview(previewUrl);
      
      // Get audio duration automatically
      const duration = await getAudioDurationHelper(file);
      setAudioDuration(duration);
    } catch (error) {
      console.error("Error getting audio duration:", error);
      reactToastify.error("Failed to load audio file. The file might be corrupted.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!audioFile) {
      reactToastify.error("Please select an audio file");
      return;
    }
    
    setIsUploading(true);
    try {
      await uploadAudio(audioFile, audioDuration);
      
      reactToastify.success("Audio uploaded successfully");
      
      // Reset form and reload audios
      setAudioFile(null);
      setAudioDuration("");
      setAudioPreview(null);
      setIsDialogOpen(false);
      fetchAudios();
    } catch (error) {
      console.error("Error uploading audio:", error);
      reactToastify.error("Failed to upload audio");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle audio deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this audio file?")) {
      try {
        await deleteAudio(id);
        reactToastify.success("Audio deleted successfully");
        setAudios(audios.filter(audio => audio.id !== id));
      } catch (error) {
        reactToastify.error("Failed to delete audio");
      }
    }
  };

  // Play audio preview
  const playAudio = (id, fileName) => {
    try {
      const audioUrl = getAudioData(id);
      const audioElement = new window.Audio(audioUrl);
      audioElement.play();
      reactToastify.info(`Playing: ${fileName || 'audio'}`);
    } catch (error) {
      console.error("Error playing audio:", error);
      reactToastify.error("Failed to play audio");
    }
  };

  // Filter audios based on search term
  const filteredAudios = Array.isArray(audios) 
    ? audios.filter(audio => 
        audio?.fileName && audio.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-2xl font-bold">Audio Files</h1>
          <p className="text-gray-500 mt-1">Manage your audio library</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Audio
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search audio files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoaderCircle className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : filteredAudios.length === 0 ? (
        <motion.div 
          className="text-center py-10 bg-gray-50 rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Music size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">No audio files available</h2>
          <p className="text-gray-500 mt-2 mb-4">
            {searchTerm ? 'No results for your search' : 'Get started by adding your first audio file'}
          </p>
          {!searchTerm && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Audio File
              </Button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="border rounded-md overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredAudios.map(audio => (
                  <motion.tr 
                    key={audio.id}
                    variants={itemVariants}
                    className="border-b hover:bg-gray-50"
                    layout
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <td className="py-3 px-4 font-medium">{audio.fileName || "Unnamed Audio"}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {audio.duration || "Unknown"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => playAudio(audio.id, audio.fileName)}
                          >
                            <Music className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDelete(audio.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}
      
      {/* Add New Audio Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Audio File</DialogTitle>
            <DialogDescription>
              Upload an audio file to the system.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="audio" className="text-sm font-medium">Audio File</label>
                <Input 
                  id="audio" 
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              
              <AnimatePresence>
                {audioPreview && (
                  <motion.div 
                    className="grid w-full items-center gap-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <label className="text-sm font-medium">Preview</label>
                    <audio src={audioPreview} controls className="w-full" />
                    <div className="flex items-center mt-2 p-2 bg-gray-50 rounded-md">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium">
                        Duration: {audioDuration || "Calculating..."}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isUploading || !audioFile}
              >
                {isUploading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  "Upload Audio"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AudioManager;
