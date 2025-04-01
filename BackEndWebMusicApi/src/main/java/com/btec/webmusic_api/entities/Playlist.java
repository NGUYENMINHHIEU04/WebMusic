// src/main/java/com/btec/webmusic_api/entities/Playlist.java
package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "playlists")
public class Playlist {
    @Id
    private String id;

    @Field("title")
    private String title;

    @Field("playlistCardIds")
    private List<String> playlistCardIds;

    // Constructors
    public Playlist() {
        this.playlistCardIds = new ArrayList<>();
    }

    public Playlist(String title, List<String> playlistCardIds) {
        this.title = title;
        this.playlistCardIds = playlistCardIds != null ? playlistCardIds : new ArrayList<>();
    }

    // Getters and Setters
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

    public List<String> getPlaylistCardIds() {
        return playlistCardIds;
    }

    public void setPlaylistCardIds(List<String> playlistCardIds) {
        this.playlistCardIds = playlistCardIds != null ? playlistCardIds : new ArrayList<>();
    }

    // Helper methods to manage playlistCardIds
    public void addPlaylistCardId(String playlistCardId) {
        if (playlistCardId != null && !playlistCardIds.contains(playlistCardId)) {
            playlistCardIds.add(playlistCardId);
        }
    }

    public void removePlaylistCardId(String playlistCardId) {
        playlistCardIds.remove(playlistCardId);
    }
}