
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image as ImageIcon, Trash2, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'react-toastify';
import imageApi from '../services/api_image';
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

const Images = () => {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const imageIds = await imageApi.getAllImages();
      
      if (Array.isArray(imageIds)) {
        // Process images in parallel
        const imagesWithUrls = await Promise.all(
          imageIds.map(async (id) => {
            const imageUrl = await imageApi.getImage(id);
            return {
              id: id,
              url: imageUrl,
              name: `Image-${id.substring(0, 8)}`
            };
          })
        );
        
        setImages(imagesWithUrls.filter(img => img.url !== null));
      } else {
        setError("Failed to load images: Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageId = await imageApi.uploadImage(file);
        if (imageId) {
          const imageUrl = await imageApi.getImage(imageId);
          if (imageUrl) {
            setImages(prev => [...prev, { 
              id: imageId, 
              url: imageUrl,
              name: `Image-${imageId.substring(0, 8)}`
            }]);
          }
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setIsUploading(false);
      // Clear file input
      event.target.value = '';
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const success = await imageApi.deleteImage(id);
      if (success) {
        setImages(prev => prev.filter(image => image.id !== id));
        toast.success("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(`Failed to delete image: ${error.message}`);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
        <div>
          <h1 className="text-3xl font-bold mb-1">Images</h1>
          <p className="text-gray-500">Upload and manage your images</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="file-upload">
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              className="flex items-center gap-2" 
              disabled={isUploading}
              onClick={() => document.getElementById('file-upload').click()}
            >
              {isUploading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Image
                </>
              )}
            </Button>
          </label>
          {error && (
            <Button variant="outline" onClick={fetchImages}>
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
              Retry
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-3">
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : images.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {images.map((image) => (
              <motion.div key={image.id} variants={item} layout>
                <Card className="overflow-hidden group border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-gray-100">
                    <img 
                      src={image.url} 
                      alt={image.name || `Image ${image.id.substring(0, 8)}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="destructive"
                            size="sm" 
                            className="bg-red-500 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the
                              image and remove it from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteImage(image.id)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-medium truncate">{image.id}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg bg-gray-50">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No images found</h3>
          <p className="text-gray-500 mb-4">Upload your first image to get started</p>
          <label htmlFor="empty-upload">
            <input
              id="empty-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button 
              className="flex items-center gap-2 mx-auto"
              onClick={() => document.getElementById('empty-upload').click()}
            >
              <Plus className="h-4 w-4" />
              Upload Image
            </Button>
          </label>
        </div>
      )}
    </motion.div>
  );
};

export default Images;
