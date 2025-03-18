
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumId?: string;
  duration: number;
  coverImage?: string;
  audioUrl: string;
  createdAt: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  coverImage?: string;
  songs: Song[];
  createdAt: string;
}
