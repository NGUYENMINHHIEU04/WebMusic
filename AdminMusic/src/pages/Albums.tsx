import React, { useState } from "react";
import { useData } from "@/context/DataContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Album, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import AlbumCard from "@/components/album/AlbumCard";
import AlbumForm from "@/components/album/AlbumForm";
import ManageSongs from "@/components/album/ManageSongs";

const Albums = () => {
  const { albums, songs, addAlbum, updateAlbum, deleteAlbum, addSongToAlbum, removeSongFromAlbum } = useData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isManageSongsDialogOpen, setIsManageSongsDialogOpen] = useState(false);
  
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedSongId, setSelectedSongId] = useState<string>("");
  
  const handleAddAlbum = () => {
    if (!title || !artist || !releaseDate) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    addAlbum({
      title,
      artist,
      releaseDate,
      coverImage: coverImage || undefined
    });
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditAlbum = () => {
    if (!selectedAlbum || !title || !artist || !releaseDate) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    
    const updates: any = { title, artist, releaseDate };
    
    if (coverImage !== null) {
      updates.coverImage = coverImage || undefined;
    }
    
    updateAlbum(selectedAlbum, updates);
    
    resetForm();
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteAlbum = () => {
    if (selectedAlbum) {
      deleteAlbum(selectedAlbum);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleAddSongToAlbum = () => {
    if (selectedAlbum && selectedSongId) {
      addSongToAlbum(selectedAlbum, selectedSongId);
      setSelectedSongId("");
      toast.success("Đã thêm bài hát vào album thành công");
    }
  };
  
  const resetForm = () => {
    setTitle("");
    setArtist("");
    setReleaseDate("");
    setCoverImage(null);
    setSelectedAlbum(null);
  };
  
  const prepareAlbumEdit = (album: any) => {
    setSelectedAlbum(album.id);
    setTitle(album.title);
    setArtist(album.artist);
    setReleaseDate(album.releaseDate);
    setCoverImage(album.coverImage || null);
    setIsEditDialogOpen(true);
  };
  
  const prepareAlbumDelete = (albumId: string) => {
    setSelectedAlbum(albumId);
    setIsDeleteDialogOpen(true);
  };
  
  const prepareManageSongs = (albumId: string) => {
    setSelectedAlbum(albumId);
    setIsManageSongsDialogOpen(true);
  };
  
  const handleCoverImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const availableSongs = songs.filter(song => 
    !albums.find(album => album.id === selectedAlbum)?.songs.some(s => s.id === song.id)
  );
  
  const albumSongs = selectedAlbum 
    ? albums.find(album => album.id === selectedAlbum)?.songs || []
    : [];
  
  const sortedAlbums = [...albums].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Albums</h1>
          <p className="text-muted-foreground">
            Quản lý tất cả albums của bạn
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-1">
          <PlusCircle className="w-4 h-4" /> Thêm album
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedAlbums.length > 0 ? (
          sortedAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onEdit={prepareAlbumEdit}
              onDelete={prepareAlbumDelete}
              onManageSongs={prepareManageSongs}
            />
          ))
        ) : (
          <div className="col-span-full p-8 text-center bg-white rounded-xl shadow-sm border border-border">
            <Album className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Không có album nào</h3>
            <p className="text-muted-foreground mb-4">
              Bạn chưa có album nào. Hãy thêm album đầu tiên của bạn!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>Thêm album</Button>
          </div>
        )}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm album mới</DialogTitle>
            <DialogDescription>
              Thêm album mới vào thư viện của bạn
            </DialogDescription>
          </DialogHeader>
          
          <AlbumForm
            title={title}
            setTitle={setTitle}
            artist={artist}
            setArtist={setArtist}
            releaseDate={releaseDate}
            setReleaseDate={setReleaseDate}
            onCoverImageChange={handleCoverImageChange}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleAddAlbum}>Thêm album</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa album</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin album
            </DialogDescription>
          </DialogHeader>
          
          <AlbumForm
            title={title}
            setTitle={setTitle}
            artist={artist}
            setArtist={setArtist}
            releaseDate={releaseDate}
            setReleaseDate={setReleaseDate}
            onCoverImageChange={handleCoverImageChange}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Hủy
            </Button>
            <Button onClick={handleEditAlbum}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa album này không? Thao tác này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDeleteAlbum}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isManageSongsDialogOpen} onOpenChange={setIsManageSongsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Quản lý bài hát trong album</DialogTitle>
            <DialogDescription>
              Thêm hoặc xóa bài hát trong album
            </DialogDescription>
          </DialogHeader>
          
          <ManageSongs
            availableSongs={availableSongs}
            albumSongs={albumSongs}
            selectedSongId={selectedSongId}
            onSongSelect={setSelectedSongId}
            onAddSong={handleAddSongToAlbum}
            onRemoveSong={(songId) => selectedAlbum && removeSongFromAlbum(selectedAlbum, songId)}
          />
          
          <DialogFooter>
            <Button onClick={() => setIsManageSongsDialogOpen(false)}>
              Xong
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Albums;
