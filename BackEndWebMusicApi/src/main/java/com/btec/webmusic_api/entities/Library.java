package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "libraries")
public class Library {

    @Id
    private String id;
    private String userId; // ID của người dùng sở hữu thư viện
    private List<String> playlistCardIds; // Danh sách ID của PlaylistCard đã thích

    // Constructors
    public Library() {
        this.playlistCardIds = new ArrayList<>();
    }

    public Library(String userId) {
        this.userId = userId;
        this.playlistCardIds = new ArrayList<>();
    }

    // Class hỗ trợ để nhận JSON
    public static class LibraryRequest {
        private String userId;
        private String playlistCardId;

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getPlaylistCardId() {
            return playlistCardId;
        }

        public void setPlaylistCardId(String playlistCardId) {
            this.playlistCardId = playlistCardId;
        }
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getPlaylistCardIds() {
        return playlistCardIds;
    }

    public void setPlaylistCardIds(List<String> playlistCardIds) {
        this.playlistCardIds = playlistCardIds;
    }

    // Utility methods
    public void addPlaylistCard(String playlistCardId) {
        if (!playlistCardIds.contains(playlistCardId)) {
            playlistCardIds.add(playlistCardId);
        }
    }

    public void removePlaylistCard(String playlistCardId) {
        playlistCardIds.remove(playlistCardId);
    }
}