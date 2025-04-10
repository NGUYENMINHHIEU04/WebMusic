import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import artistApi from '../services/api_artist';
import imageApi from '../services/api_image';

const Artists = () => {
  const { toast } = useToast();
  const [artists, setArtists] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newArtist, setNewArtist] = useState({
    name: "",
    description: "",
    imageId: ""
  });

  useEffect(() => {
    fetchArtists();
    fetchImages();
  }, []);

  const fetchArtists = async () => {
    setIsLoading(true);
    try {
      const data = await artistApi.getAllArtists();
      console.log("Fetched artists:", data);
      setArtists(data);
    } catch (error) {
      console.error("Error in fetchArtists:", error);
      toast({
        title: "Error",
        description: "Failed to load artists. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const imageIds = await imageApi.getAllImages();
      console.log("Fetched images:", imageIds);
      
      if (!Array.isArray(imageIds)) {
        console.warn("Received non-array data from getAllImages, setting empty array");
        setImages([]);
        return;
      }
      
      const imagesWithUrls = imageIds.map(id => ({
        id,
        url: imageApi.getImageUrl(id),
        name: `Image ${id.substring(0, 6)}...`
      }));
      
      setImages(imagesWithUrls);
    } catch (error) {
      console.error("Error in fetchImages:", error);
      toast({
        title: "Error",
        description: "Failed to load images. Please try again later.",
        variant: "destructive"
      });
      setImages([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageId) => {
    setNewArtist(prev => ({ ...prev, imageId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newArtist.name || !newArtist.imageId) {
      toast({
        title: "Validation Error",
        description: "Artist name and image selection are required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await artistApi.createArtist({
        name: newArtist.name,
        description: newArtist.description,
        imageId: newArtist.imageId
      });
      
      toast({
        title: "Success",
        description: "Artist created successfully",
      });
      
      setNewArtist({ name: "", description: "", imageId: "" });
      setIsDialogOpen(false);
      fetchArtists();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create artist. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        await artistApi.deleteArtist(id);
        toast({
          title: "Success",
          description: "Artist deleted successfully",
        });
        fetchArtists();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete artist. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      className="container mx-auto px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Artists</h1>
          <p className="text-gray-500">Manage your artist profiles</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Artist
        </Button>
      </div>
      
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">Loading artists...</div>
      ) : filteredArtists.length === 0 ? (
        <div className="text-center py-10">
          <Mic size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">No artists available</h2>
          <p className="text-gray-500 mt-2">Get started by adding your first artist</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArtists.map(artist => (
                <TableRow key={artist.id}>
                  <TableCell>
                    <Avatar className="h-12 w-12">
                      {artist.imageUrl ? (
                        <AvatarImage src={artist.imageUrl} alt={artist.name} />
                      ) : (
                        <AvatarFallback>
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{artist.name}</TableCell>
                  <TableCell className="max-w-md truncate">{artist.description}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(artist.id)}
                      className="ml-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Artist</DialogTitle>
            <DialogDescription>
              Create a new artist and associate it with an existing image.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input 
                  id="name" 
                  name="name"
                  value={newArtist.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  name="description"
                  value={newArtist.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="imageId" className="text-sm font-medium">Select Image</label>
                {images && images.length > 0 ? (
                  <Select 
                    value={newArtist.imageId} 
                    onValueChange={handleImageSelect}
                  >
                    <SelectTrigger id="imageId">
                      <SelectValue placeholder="Select an image" />
                    </SelectTrigger>
                    <SelectContent>
                      {images.map((image) => (
                        <SelectItem key={image.id} value={image.id}>
                          <div className="flex items-center">
                            <span>{image.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-gray-500">No images available</div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Artist</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Artists;
