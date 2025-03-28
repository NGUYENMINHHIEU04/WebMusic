package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "playlists")
public class Playlist {
    @Id
    private String id;
    private String name;
    private String description;
    private List<String> songIds; // Danh sách ID của các bài hát
    private String coverImageId;  // ID của hình ảnh bìa

    // Constructors
    public Playlist() {}

    public Playlist(String name, String description, List<String> songIds, String coverImageId) {
        this.name = name;
        this.description = description;
        this.songIds = songIds;
        this.coverImageId = coverImageId;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSongIds() {
        return songIds;
    }

    public void setSongIds(List<String> songIds) {
        this.songIds = songIds;
    }

    public String getCoverImageId() {
        return coverImageId;
    }

    public void setCoverImageId(String coverImageId) {
        this.coverImageId = coverImageId;
    }
}