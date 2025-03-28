import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { Song } from "@/types";

interface ManageSongsProps {
  availableSongs: Song[];
  albumSongs: Song[];
  selectedSongId: string;
  onSongSelect: (value: string) => void;
  onAddSong: () => void;
  onRemoveSong: (songId: string) => void;
}

const ManageSongs = ({
  availableSongs,
  albumSongs,
  selectedSongId,
  onSongSelect,
  onAddSong,
  onRemoveSong,
}: ManageSongsProps) => {
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Add Song</h4>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedSongId} onValueChange={onSongSelect}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a song" />
            </SelectTrigger>
            <SelectContent>
              {availableSongs.length > 0 ? (
                availableSongs.map((song) => (
                  <SelectItem key={song.id} value={song.id}>
                    {song.title} - {song.artist}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="" disabled>
                  No available songs
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          
          <Button 
            size="sm" 
            onClick={onAddSong}
            disabled={!selectedSongId}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Songs in Album</h4>
        
        <div className="bg-secondary/50 rounded-lg overflow-hidden">
          {albumSongs.length > 0 ? (
            <ul className="divide-y divide-border">
              {albumSongs.map((song) => (
                <li key={song.id} className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-medium">{song.title}</p>
                    <p className="text-xs text-muted-foreground">{song.artist}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveSong(song.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No songs in this album
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSongs;
