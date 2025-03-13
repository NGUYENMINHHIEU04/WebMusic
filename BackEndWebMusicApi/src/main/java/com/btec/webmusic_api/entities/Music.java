package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "music")
public class Music {
    @Id
    private String id;
    private String title;
    private String artist;
    private String album;
    private String duration;
    private String audioFileId; // Lưu ID của file MP3 trong GridFS
    private String coverImage;
    private String playlistId;

    // Getters & Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getArtist() { return artist; }
    public String getAlbum() { return album; }
    public String getDuration() { return duration; }
    public String getAudioFileId() { return audioFileId; }
    public String getCoverImage() { return coverImage; }
    public String getPlaylistId() { return playlistId; }

    public void setId(String id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setArtist(String artist) { this.artist = artist; }
    public void setAlbum(String album) { this.album = album; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setAudioFileId(String audioFileId) { this.audioFileId = audioFileId; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
    public void setPlaylistId(String playlistId) { this.playlistId = playlistId; }
}
