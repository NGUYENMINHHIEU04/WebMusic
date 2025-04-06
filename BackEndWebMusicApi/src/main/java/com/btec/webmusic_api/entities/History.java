package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "history")
public class History {

    @Id
    private String id;
    private String userId;       // ID của người dùng
    private String songId;       // ID của bài hát
    private LocalDateTime timestamp; // Thời gian nghe (tùy chọn)

    // Constructors
    public History() {
        this.timestamp = LocalDateTime.now(); // Mặc định là thời gian hiện tại
    }

    public History(String userId, String songId) {
        this.userId = userId;
        this.songId = songId;
        this.timestamp = LocalDateTime.now();
    }

    // Getters & Setters
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

    public String getSongId() {
        return songId;
    }

    public void setSongId(String songId) {
        this.songId = songId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}