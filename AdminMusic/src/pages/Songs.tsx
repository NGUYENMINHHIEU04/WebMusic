
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import Layout from "@/components/Layout";

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: string;
}

const Songs = () => {
  const { toast } = useToast();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSong, setNewSong] = useState({
    name: "",
    artist: "",
    album: "",
    duration: ""
  });

  const handleAddSong = () => {
    // Tạo ID giả
    const id = Date.now().toString();
    const song = {
      id,
      ...newSong
    };
    
    setSongs([...songs, song]);
    setNewSong({
      name: "",
      artist: "",
      album: "",
      duration: ""
    });
    setIsAdding(false);
    
    toast({
      title: "Thành công",
      description: "Thêm bài hát mới thành công",
    });
  };

  const handleDeleteSong = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
    toast({
      title: "Thành công",
      description: "Xóa bài hát thành công",
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý bài hát</h1>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm bài hát
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Thêm bài hát mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên bài hát</Label>
                  <Input 
                    id="name" 
                    value={newSong.name} 
                    onChange={(e) => setNewSong({...newSong, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Nghệ sĩ</Label>
                  <Input 
                    id="artist" 
                    value={newSong.artist} 
                    onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="album">Album</Label>
                  <Input 
                    id="album" 
                    value={newSong.album} 
                    onChange={(e) => setNewSong({...newSong, album: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Thời lượng</Label>
                  <Input 
                    id="duration" 
                    value={newSong.duration} 
                    onChange={(e) => setNewSong({...newSong, duration: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
                <Button onClick={handleAddSong}>Lưu</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên bài hát</TableHead>
              <TableHead>Nghệ sĩ</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Thời lượng</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Chưa có bài hát nào</TableCell>
              </TableRow>
            ) : (
              songs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.name}</TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>{song.album}</TableCell>
                  <TableCell>{song.duration}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteSong(song.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Songs;
