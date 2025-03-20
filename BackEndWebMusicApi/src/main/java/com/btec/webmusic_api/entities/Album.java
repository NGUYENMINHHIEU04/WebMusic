package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "albums")  // Nếu dùng MongoDB
public class Album {
    @Id
    private String id;
    private String albumId;
    private String title;  // Đảm bảo tên này trùng khớp với JSON
    private String artist;
    private String releaseDate;
    private String genre;
    private String coverImageUrl;  // Kiểm tra tên trường này
    private List<String> songIds;

    // Constructors
    public Album() {}

    public Album(String albumId, String title, String artist, String releaseDate, String genre, String coverImageUrl, List<String> songIds) {
        this.albumId = albumId;
        this.title = title;
        this.artist = artist;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.coverImageUrl = coverImageUrl;
        this.songIds = songIds;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAlbumId() { return albumId; }
    public void setAlbumId(String albumId) { this.albumId = albumId; }

    public String getTitle() { return title; }  // Đảm bảo có getter
    public void setTitle(String title) { this.title = title; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public List<String> getSongIds() { return songIds; }
    public void setSongIds(List<String> songIds) { this.songIds = songIds; }
}
