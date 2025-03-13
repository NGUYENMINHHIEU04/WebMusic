package com.btec.webmusic_api.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "playlists")
public class Playlist {
    @Id
    private String id;
    private String name;
    private String genre;
    private String ImageUrl;
    private String artists;
    private String description;

    // Getter methods
    public  String getImageUrl(){
        return ImageUrl;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getGenre() {
        return genre;
    }

    public String getArtists() {
        return artists;
    }

    public String getDescription() {
        return description;
    }

    // Setter methods
    public void setId(String id) {
        this.id = id;
    }
    public void setImageUrl (String imageUrl){
        this.ImageUrl = imageUrl ;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setArtists(String artists) {
        this.artists = artists;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
