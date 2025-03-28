import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { useAudio } from "@/context/AudioContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/FileUpload";
import { Music, Play, Pause, MoreVertical, Edit, Trash, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Songs = () => {
  const { songs, addSong, updateSong, deleteSong } = useData();
  const { playSong, pauseSong, isPlaying, currentSong } = useAudio();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  
  const handleAddSong = () => {
    if (!title || !artist || !audioFile) {
      toast.error("Please fill in all the information");
      return;
    }
    
    // Normally we would upload the file to a server here
    // For this example, we'll create an object URL
    const audioUrl = URL.createObjectURL(audioFile);
    
    addSong({
      title,
      artist,
      duration,
      audioUrl,
      coverImage: coverImage || undefined
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditSong = () => {
    if (!selectedSong || !title || !artist) {
      toast.error("Please fill in all the information");
      return;
    }
    
    const updates: any = { title, artist };
    
    if (audioFile) {
      // Normally we would upload the file to a server here
      const audioUrl = URL.createObjectURL(audioFile);
      updates.audioUrl = audioUrl;
    }
    
    if (coverImage !== null) {
      updates.coverImage = coverImage || undefined;
    }
    
    updateSong(selectedSong, updates);
    
    resetForm();
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteSong = () => {
    if (selectedSong) {
      deleteSong(selectedSong);
      setIsDeleteDialogOpen(false);
      
      // If currently playing song is deleted, pause it
      if (currentSong?.id === selectedSong) {
        pauseSong();
      }
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setArtist("");
    setDuration(0);
    setAudioFile(null);
    setCoverImage(null);
    setSelectedSong(null);
  };
  
  const prepareSongEdit = (song: any) => {
    setSelectedSong(song.id);
    setTitle(song.title);
    setArtist(song.artist);
    setDuration(song.duration);
    setCoverImage(song.coverImage || null);
    setIsEditDialogOpen(true);
  };
  
  const prepareSongDelete = (songId: string) => {
    setSelectedSong(songId);
    setIsDeleteDialogOpen(true);
  };
  
  const handleAudioFileChange = (file: File) => {
    setAudioFile(file);
    
    // Get audio duration
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
  };
  
  const handleCoverImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const sortedSongs = [...songs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Songs</h1>
          <p className="text-muted-foreground">
            Manage all your songs
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
          <PlusCircle className="w-4 h-4" /> Add Song
        </Button>
      </div>
      
      {/* Songs list */}
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {sortedSongs.length > 0 ? (
          <div className="divide-y">
            {sortedSongs.map((song) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center p-4 hover:bg-secondary/50 transition-colors"
              >
                <button 
                  className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity mr-4"
                  onClick={() => currentSong?.id === song.id && isPlaying ? pauseSong() : playSong(song)}
                >
                  {currentSong?.id === song.id && isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{song.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
                
                <div className="text-xs text-muted-foreground mr-4">
                  {Math.floor(song.duration / 60)}:{String(Math.floor(song.duration % 60)).padStart(2, '0')}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => prepareSongEdit(song)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => prepareSongDelete(song.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No songs available</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any songs yet. Add your first song!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>Add Song</Button>
          </div>
        )}
      </div>
      
      {/* Add song dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Song</DialogTitle>
            <DialogDescription>
              Add a new song to your library
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Audio File</Label>
              <FileUpload
                accept="audio/mpeg"
                onChange={handleAudioFileChange}
                label="Upload MP3 file"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Cover Image (optional)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleCoverImageChange}
                label="Upload cover image"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddSong}>Add Song</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit song dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Song</DialogTitle>
            <DialogDescription>
              Edit song information
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Audio File (optional)</Label>
              <FileUpload
                accept="audio/mpeg"
                onChange={handleAudioFileChange}
                label="Upload new MP3 file"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Cover Image (optional)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleCoverImageChange}
                label="Upload new cover image"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditSong}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete song dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this song? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSong}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Songs;
