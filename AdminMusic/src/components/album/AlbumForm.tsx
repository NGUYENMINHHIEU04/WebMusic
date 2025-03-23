
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
        <Label htmlFor="title">Tên album</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tên album"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="artist">Nghệ sĩ</Label>
        <Input
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Nhập tên nghệ sĩ"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="releaseDate">Ngày phát hành</Label>
        <Input
          id="releaseDate"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Ảnh bìa (không bắt buộc)</Label>
        <FileUpload
          accept="image/*"
          onChange={onCoverImageChange}
          label="Tải lên ảnh bìa"
        />
      </div>
    </div>
  );
};

export default AlbumForm;
