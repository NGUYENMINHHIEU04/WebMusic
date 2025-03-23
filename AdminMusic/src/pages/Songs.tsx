
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
      toast.error("Vui lòng điền đầy đủ thông tin");
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
      toast.error("Vui lòng điền đầy đủ thông tin");
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
          <h1 className="text-3xl font-bold tracking-tight">Bài hát</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả bài hát của bạn
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
          <PlusCircle className="w-4 h-4" /> Thêm bài hát
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
                      <span>Chỉnh sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => prepareSongDelete(song.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không có bài hát nào</h3>
            <p className="text-muted-foreground mb-4">
              Bạn chưa có bài hát nào. Hãy thêm bài hát đầu tiên của bạn!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>Thêm bài hát</Button>
          </div>
        )}
      </div>
      
      {/* Add song dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm bài hát mới</DialogTitle>
            <DialogDescription>
              Thêm bài hát mới vào thư viện của bạn
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tên bài hát</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên bài hát"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="artist">Nghệ sĩ</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nhập tên nghệ sĩ"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Tập tin âm thanh</Label>
              <FileUpload
                accept="audio/mpeg"
                onChange={handleAudioFileChange}
                label="Tải lên tập tin MP3"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Ảnh bìa (không bắt buộc)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleCoverImageChange}
                label="Tải lên ảnh bìa"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleAddSong}>Thêm bài hát</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit song dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bài hát</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin bài hát
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tên bài hát</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tên bài hát"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="artist">Nghệ sĩ</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nhập tên nghệ sĩ"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Tập tin âm thanh (không bắt buộc)</Label>
              <FileUpload
                accept="audio/mpeg"
                onChange={handleAudioFileChange}
                label="Tải lên tập tin MP3 mới"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Ảnh bìa (không bắt buộc)</Label>
              <FileUpload
                accept="image/*"
                onChange={handleCoverImageChange}
                label="Tải lên ảnh bìa mới"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleEditSong}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete song dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bài hát này không? Thao tác này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteSong}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Songs;
