package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "songs")  // Dùng MongoDB thay vì JPA
public class Song {
    @Id
    private String id;
    private String title;
    private String artist;
    private String albumId;
    private String genre;
    private int duration;
    private LocalDate releaseDate;
    private String fileUrl;  // Lưu GridFS file ID
    private String coverImageUrl;

    // Constructors
    public Song() {}

    public Song(String title, String artist, String albumId, String genre, int duration,
                LocalDate releaseDate, String fileUrl, String coverImageUrl) {
        this.title = title;
        this.artist = artist;
        this.albumId = albumId;
        this.genre = genre;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.fileUrl = fileUrl;
        this.coverImageUrl = coverImageUrl;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getAlbumId() { return albumId; }
    public void setAlbumId(String albumId) { this.albumId = albumId; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }


}
