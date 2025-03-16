
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import Layout from "@/components/Layout";

interface Album {
  id: string;
  name: string;
  artist: string;
  year: string;
  tracks: number;
}

const Albums = () => {
  const { toast } = useToast();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    artist: "",
    year: "",
    tracks: 0
  });

  const handleAddAlbum = () => {
    // Tạo ID giả
    const id = Date.now().toString();
    const album = {
      id,
      ...newAlbum
    };
    
    setAlbums([...albums, album]);
    setNewAlbum({
      name: "",
      artist: "",
      year: "",
      tracks: 0
    });
    setIsAdding(false);
    
    toast({
      title: "Thành công",
      description: "Thêm album mới thành công",
    });
  };

  const handleDeleteAlbum = (id: string) => {
    setAlbums(albums.filter(album => album.id !== id));
    toast({
      title: "Thành công",
      description: "Xóa album thành công",
    });
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý album</h1>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm album
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Thêm album mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên album</Label>
                  <Input 
                    id="name" 
                    value={newAlbum.name} 
                    onChange={(e) => setNewAlbum({...newAlbum, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Nghệ sĩ</Label>
                  <Input 
                    id="artist" 
                    value={newAlbum.artist} 
                    onChange={(e) => setNewAlbum({...newAlbum, artist: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Năm phát hành</Label>
                  <Input 
                    id="year" 
                    value={newAlbum.year} 
                    onChange={(e) => setNewAlbum({...newAlbum, year: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tracks">Số bài hát</Label>
                  <Input 
                    id="tracks" 
                    type="number"
                    value={newAlbum.tracks.toString()} 
                    onChange={(e) => setNewAlbum({...newAlbum, tracks: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
                <Button onClick={handleAddAlbum}>Lưu</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên album</TableHead>
              <TableHead>Nghệ sĩ</TableHead>
              <TableHead>Năm phát hành</TableHead>
              <TableHead>Số bài hát</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Chưa có album nào</TableCell>
              </TableRow>
            ) : (
              albums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>{album.name}</TableCell>
                  <TableCell>{album.artist}</TableCell>
                  <TableCell>{album.year}</TableCell>
                  <TableCell>{album.tracks}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteAlbum(album.id)}
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

export default Albums;
