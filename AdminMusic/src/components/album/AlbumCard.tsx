import React from "react";
import { Album as AlbumIcon, Edit, Trash, MoreVertical, Music } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Album } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AlbumCardProps {
  album: Album;
  onEdit: (album: Album) => void;
  onDelete: (albumId: string) => void;
  onManageSongs: (albumId: string) => void;
}

const AlbumCard = ({ album, onEdit, onDelete, onManageSongs }: AlbumCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-square bg-muted">
        {album.coverImage ? (
          <img 
            src={album.coverImage} 
            alt={album.title}
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <AlbumIcon className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(album)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageSongs(album.id)}>
                <Music className="mr-2 h-4 w-4" />
                <span>Manage Songs</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(album.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium truncate">{album.title}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
        <div className="flex items-center justify-between mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => onManageSongs(album.id)}
          >
            <Music className="w-4 h-4 mr-1" />
            {album.songs.length} songs
          </Button>
          <span className="text-xs text-muted-foreground">
            {new Date(album.releaseDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCard;
