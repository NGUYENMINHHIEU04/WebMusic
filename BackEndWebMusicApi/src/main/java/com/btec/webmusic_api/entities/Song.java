package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "songs")
public class Song {

    @Id
    private String id;
    private String title;
    private List<String> artistIds;
    private String idAudio;
    private String idImage;
    private String category;
    private String description; // Trường description đã có từ trước

    // Getters và setters
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

    public List<String> getArtistIds() {
        return artistIds;
    }

    public void setArtistIds(List<String> artistIds) {
        this.artistIds = artistIds;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}