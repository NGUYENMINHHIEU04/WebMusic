package com.btec.webmusic_api.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;

@Document(collection = "history")
public class History {

    @Id
    private String id;

    private String userId;

    private String songId;

    private String title;

    private String artist;

    private String imageUrl;

    private Integer listenCount;

    private Integer rating;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private ZonedDateTime timestamp;

    // Constructors, Getters, Setters
    public History() {}

    public History(String userId, String songId, String title, String artist, String imageUrl, Integer listenCount, Integer rating, ZonedDateTime timestamp) {
        this.userId = userId;
        this.songId = songId;
        this.title = title;
        this.artist = artist;
        this.imageUrl = imageUrl;
        this.listenCount = listenCount;
        this.rating = rating;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getSongId() { return songId; }
    public void setSongId(String songId) { this.songId = songId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getArtist() { return artist; }
    public void setArtist(String artist) { this.artist = artist; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Integer getListenCount() { return listenCount; }
    public void setListenCount(Integer listenCount) { this.listenCount = listenCount; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public ZonedDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(ZonedDateTime timestamp) { this.timestamp = timestamp; }

    @Override
    public String toString() {
        return "History{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", songId='" + songId + '\'' +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", listenCount=" + listenCount +
                ", rating=" + rating +
                ", timestamp=" + timestamp +
                '}';
    }
}