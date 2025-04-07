
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllSongs, createSong, deleteSong } from '../services/api_song';
import { getAllAudios } from '../services/api_audio';
import { getAllImages, getImageUrl } from '../services/api_image';
import { Music, Plus, Trash, Image, User, Album } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAllArtists } from '../services/api_artist';

const Songs = () => {
  const { toast } = useToast();
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]); 
  const [audioIds, setAudioIds] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    category: "",
    artistIds: [],
    idAudio: "",
    idImage: "",
    lyrics: ""
  });

  // Fetch songs, artists, audios, and images when component mounts
  useEffect(() => {
    fetchSongs();
    fetchArtists();
    fetchAudios();
    fetchImages();
  }, []);

  // Fetch all songs
  const fetchSongs = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSongs();
      console.log("Fetched songs:", data);
      setSongs(data);
    } catch (error) {
      console.error("Error in fetchSongs:", error);
      toast({
        title: "Error",
        description: "Failed to load songs. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all artists
  const fetchArtists = async () => {
    try {
      const data = await getAllArtists();
      console.log("Fetched artists:", data);
      setArtists(data);
    } catch (error) {
      console.error("Error in fetchArtists:", error);
      toast({
        title: "Error",
        description: "Failed to load artists. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Fetch all audios (IDs)
  const fetchAudios = async () => {
    try {
      const response = await getAllAudios();
      console.log("Fetched audios:", response);
      
      // Check if the response has a data property that contains the audio files
      if (response && response.data && Array.isArray(response.data)) {
        setAudioIds(response.data.map(audio => audio.id));
      } else if (Array.isArray(response)) {
        setAudioIds(response.map(audio => audio.id || audio));
      } else {
        console.error("Unexpected audio response format:", response);
        setAudioIds([]);
      }
    } catch (error) {
      console.error("Error in fetchAudios:", error);
      toast({
        title: "Error",
        description: "Failed to load audio files. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Fetch all images (IDs)
  const fetchImages = async () => {
    try {
      const data = await getAllImages();
      console.log("Fetched images:", data);
      setImageIds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error in fetchImages:", error);
      toast({
        title: "Error",
        description: "Failed to load images. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Handle input change for new song form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change for category
  const handleCategorySelect = (value) => {
    setNewSong(prev => ({ ...prev, category: value }));
  };

  // Handle select change for audio
  const handleAudioSelect = (value) => {
    setNewSong(prev => ({ ...prev, idAudio: value }));
  };

  // Handle select change for image
  const handleImageSelect = (value) => {
    setNewSong(prev => ({ ...prev, idImage: value }));
  };

  // Handle select change for artists (multiple)
  const handleArtistSelect = (value) => {
    // If already selected, remove it, otherwise add it
    setNewSong(prev => {
      const currentArtists = [...prev.artistIds];
      if (currentArtists.includes(value)) {
        return { ...prev, artistIds: currentArtists.filter(id => id !== value) };
      } else {
        return { ...prev, artistIds: [...currentArtists, value] };
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newSong.title || !newSong.category || !newSong.idAudio || !newSong.idImage || newSong.artistIds.length === 0) {
      toast({
        title: "Validation Error",
        description: "All fields except lyrics are required",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Create the song
      await createSong({
        title: newSong.title,
        category: newSong.category,
        artistIds: newSong.artistIds,
        idAudio: newSong.idAudio,
        idImage: newSong.idImage,
        lyrics: newSong.lyrics
      });
      
      toast({
        title: "Success",
        description: "Song created successfully",
      });
      
      // Reset form and reload songs
      setNewSong({
        title: "",
        category: "",
        artistIds: [],
        idAudio: "",
        idImage: "",
        lyrics: ""
      });
      setIsDialogOpen(false);
      fetchSongs();
    } catch (error) {
      console.error("Error creating song:", error);
      toast({
        title: "Error",
        description: "Failed to create song. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle song deletion
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this song?")) {
      try {
        await deleteSong(id);
        toast({
          title: "Success",
          description: "Song deleted successfully",
        });
        fetchSongs();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete song. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  // Filter songs based on search term
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get artist names as a string
  const getArtistNames = (artistArray) => {
    if (Array.isArray(artistArray)) {
      return artistArray.join(", ");
    }
    return "Unknown Artists";
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Songs</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Song
        </Button>
      </div>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">Loading songs...</div>
      ) : filteredSongs.length === 0 ? (
        <div className="text-center py-10">
          <Music size={48} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold">No songs available</h2>
          <p className="text-gray-500 mt-2">Get started by adding your first song</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Cover</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artists</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.map(song => (
                <TableRow key={song.id}>
                  <TableCell>
                    <Avatar className="h-12 w-12">
                      {song.image && song.image.id ? (
                        <AvatarImage src={getImageUrl(song.image.id)} alt={song.title} />
                      ) : (
                        <AvatarFallback>
                          <Album className="h-6 w-6 text-gray-400" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{song.title}</TableCell>
                  <TableCell>{getArtistNames(song.artists)}</TableCell>
                  <TableCell>{song.category}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(song.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Add New Song Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Song</DialogTitle>
            <DialogDescription>
              Create a new song by selecting audio, image, artists, and entering song details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  name="title"
                  value={newSong.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select 
                  value={newSong.category} 
                  onValueChange={handleCategorySelect}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pop">Pop</SelectItem>
                    <SelectItem value="Rock">Rock</SelectItem>
                    <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                    <SelectItem value="Jazz">Jazz</SelectItem>
                    <SelectItem value="Classical">Classical</SelectItem>
                    <SelectItem value="Electronic">Electronic</SelectItem>
                    <SelectItem value="R&B">R&B</SelectItem>
                    <SelectItem value="Country">Country</SelectItem>
                    <SelectItem value="Folk">Folk</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="artists" className="text-sm font-medium">Artists (Select multiple)</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {artists.map(artist => (
                    <div 
                      key={artist.id}
                      onClick={() => handleArtistSelect(artist.id)}
                      className={`cursor-pointer flex items-center p-2 rounded-md ${
                        newSong.artistIds.includes(artist.id) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <Avatar className="h-6 w-6 mr-2">
                        {artist.imageUrl ? (
                          <AvatarImage src={artist.imageUrl} alt={artist.name} />
                        ) : (
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-sm">{artist.name}</span>
                    </div>
                  ))}
                </div>
                {artists.length === 0 && (
                  <p className="text-sm text-muted-foreground">No artists available. Please add artists first.</p>
                )}
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="idAudio" className="text-sm font-medium">Audio File</label>
                <Select 
                  value={newSong.idAudio} 
                  onValueChange={handleAudioSelect}
                >
                  <SelectTrigger id="idAudio">
                    <SelectValue placeholder="Select an audio file" />
                  </SelectTrigger>
                  <SelectContent>
                    {audioIds.map((audioId) => (
                      <SelectItem key={audioId} value={audioId}>
                        <div className="flex items-center">
                          <Music className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Audio ID: {audioId.substring(0, 8)}...</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {audioIds.length === 0 && (
                  <p className="text-sm text-muted-foreground">No audio files available. Please upload audio files first.</p>
                )}
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="idImage" className="text-sm font-medium">Cover Image</label>
                <Select 
                  value={newSong.idImage} 
                  onValueChange={handleImageSelect}
                >
                  <SelectTrigger id="idImage">
                    <SelectValue placeholder="Select a cover image" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageIds.map((imageId) => (
                      <SelectItem key={imageId} value={imageId}>
                        <div className="flex items-center">
                          <Image className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Image ID: {imageId.substring(0, 8)}...</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {imageIds.length === 0 && (
                  <p className="text-sm text-muted-foreground">No images available. Please upload images first.</p>
                )}
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <label htmlFor="lyrics" className="text-sm font-medium">Lyrics (Optional)</label>
                <Textarea 
                  id="lyrics" 
                  name="lyrics"
                  value={newSong.lyrics}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Song</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Songs;
