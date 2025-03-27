package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "songs")
public class Song {
    @Id
    private String id;
    private String title;
    private String artistId; // ID trỏ tới API Artist
    private String idAudio;  // ID trỏ tới API Audio
    private String idImage;  // ID trỏ tới API Image

    // Constructors
    public Song() {}

    public Song(String title, String artistId, String idAudio, String idImage) {
        this.title = title;
        this.artistId = artistId;
        this.idAudio = idAudio;
        this.idImage = idImage;
    }

    // Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtistId() {
        return artistId;
    }

    public void setArtistId(String artistId) {
        this.artistId = artistId;
    }

    public String getIdAudio() {
        return idAudio;
    }

    public void setIdAudio(String idAudio) {
        this.idAudio = idAudio;
    }

    public String getIdImage() {
        return idImage;
    }

    public void setIdImage(String idImage) {
        this.idImage = idImage;
    }
}
