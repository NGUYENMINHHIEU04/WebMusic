
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger, 
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, PlusCircle, Loader2, Music, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import artistApi from '../services/api_artist';
import imageApi from '../services/api_image';
import { toast } from 'react-toastify';

const Artists = () => {
  const [newArtist, setNewArtist] = useState({
    name: '',
    description: '',
    imageId: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch artists data
  const {
    data: artists = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['artists'],
    queryFn: artistApi.getAllArtists
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('preview-image').src = reader.result;
      document.getElementById('preview-container').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload image first if selected
      let imageId = null;
      if (selectedImage) {
        imageId = await imageApi.uploadImage(selectedImage);
      }

      // Create artist with image ID
      const artistData = {
        ...newArtist,
        imageId: imageId || ''
      };

      const response = await artistApi.createArtist(artistData);
      
      if (response) {
        toast.success('Artist created successfully!');
        // Reset form
        setNewArtist({
          name: '',
          description: '',
          imageId: ''
        });
        setSelectedImage(null);
        document.getElementById('preview-container').classList.add('hidden');
        setDialogOpen(false);
        refetch(); // Refresh the list
      }
    } catch (error) {
      console.error('Error creating artist:', error);
      toast.error('Failed to create artist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const success = await artistApi.deleteArtist(id);
      if (success) {
        refetch(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Artists</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Artist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Artist</DialogTitle>
                <DialogDescription>
                  Enter the details for the new artist.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={newArtist.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newArtist.description}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="image">Profile Image</label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div id="preview-container" className="hidden mt-2">
                    <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                    <img
                      id="preview-image"
                      className="w-full max-h-40 object-cover rounded-md"
                      alt="Preview"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Artist'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading artists...</span>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Artists</h2>
          <p className="text-center mb-6 text-red-500">{error.message || "An error occurred"}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      ) : artists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <motion.div 
              key={artist.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={artist.imageUrl || "/placeholder.svg"} 
                    alt={artist.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-xl">{artist.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3">{artist.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Artist</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {artist.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(artist.id)} 
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Music className="h-16 w-16 mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">No Artists Found</h2>
          <p className="text-gray-500 mb-6">Get started by adding your first artist</p>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Artist
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Artists;
