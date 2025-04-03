
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Music, Play, Trash2, Pause, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'react-toastify';
import audioApi from '../services/api_audio';
import { useQuery } from '@tanstack/react-query';

const Audio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [duration, setDuration] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch audio files
  const { data: audioResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ['audios'],
    queryFn: audioApi.getAllAudios,
  });

  const audioFiles = audioResponse?.data || [];

  // Filter audio files based on search term
  const filteredAudios = audioFiles.filter(audio => 
    audio.fileName && audio.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playAudio = (id) => {
    if (currentlyPlaying === id) {
      setIsPlaying(!isPlaying);
      const audioElement = document.getElementById(`audio-${id}`);
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    } else {
      if (currentlyPlaying) {
        const prevAudio = document.getElementById(`audio-${currentlyPlaying}`);
        prevAudio.pause();
      }
      setCurrentlyPlaying(id);
      setIsPlaying(true);
      const audioElement = document.getElementById(`audio-${id}`);
      audioElement.play();
    }
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      toast.error('Vui lòng chọn file audio');
      return;
    }
    if (!duration) {
      toast.error('Vui lòng nhập thời lượng');
      return;
    }

    setIsUploading(true);
    try {
      await audioApi.uploadAudio(audioFile, duration);
      toast.success('Upload audio thành công');
      setAudioFile(null);
      setDuration('');
      refetch(); // Refresh data
    } catch (error) {
      console.error('Error uploading:', error);
      toast.error('Lỗi khi upload audio: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa file audio này?')) {
      try {
        await audioApi.deleteAudio(id);
        toast.success('Xóa audio thành công');
        refetch(); // Refresh data
      } catch (error) {
        toast.error('Lỗi khi xóa audio: ' + (error.response?.data?.message || error.message));
      }
    }
  };

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
        <h1 className="text-3xl font-bold">Audio Management</h1>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Upload Audio File</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio File
              </label>
              <Input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileChange}
                className="mb-2"
              />
              <p className="text-sm text-gray-500">MP3, WAV files, max 10MB</p>
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (mm:ss)
              </label>
              <Input 
                placeholder="Enter duration (e.g. 3:45)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleUpload} 
                disabled={isUploading || !audioFile || !duration}
                className="w-full md:w-auto"
              >
                {isUploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search audio files..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading audio files...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          <p>Error loading audio files. Please try again.</p>
        </div>
      ) : filteredAudios.length > 0 ? (
        <motion.div variants={container} initial="hidden" animate="show">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAudios.map((audio) => (
                <TableRow key={audio.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full"
                      onClick={() => playAudio(audio.id)}
                    >
                      {isPlaying && currentlyPlaying === audio.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <audio
                      id={`audio-${audio.id}`}
                      src={audioApi.getAudioData(audio.id)}
                      onEnded={() => {
                        if (currentlyPlaying === audio.id) {
                          setIsPlaying(false);
                        }
                      }}
                      className="hidden"
                    />
                  </TableCell>
                  <TableCell>{audio.fileName}</TableCell>
                  <TableCell>{audio.duration}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(audio.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
          <h3 className="text-lg font-medium text-gray-900 mb-1">No audio files available</h3>
          <p className="text-gray-500 mb-4">Get started by uploading your first audio file</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Audio;
