import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "@/components/FileUpload";

interface AlbumFormProps {
  title: string;
  setTitle: (value: string) => void;
  artist: string;
  setArtist: (value: string) => void;
  releaseDate: string;
  setReleaseDate: (value: string) => void;
  onCoverImageChange: (file: File) => void;
}

const AlbumForm = ({
  title,
  setTitle,
  artist,
  setArtist,
  releaseDate,
  setReleaseDate,
  onCoverImageChange,
}: AlbumFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Album Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter album title"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="artist">Artist</Label>
        <Input
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Enter artist name"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="releaseDate">Release Date</Label>
        <Input
          id="releaseDate"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Cover Image (optional)</Label>
        <FileUpload
          accept="image/*"
          onChange={onCoverImageChange}
          label="Upload cover image"
        />
      </div>
    </div>
  );
};

export default AlbumForm;
