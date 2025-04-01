//package com.btec.webmusic_api.entities;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//
//import java.util.List;
//
//@Document(collection = "songs")
//public class Song {
//    @Id
//    private String id;
//    private String title;
//    private List<String> artistIds; // Danh sách ID nghệ sĩ
//    private String idAudio;  // ID trỏ tới Audio
//    private String idImage;  // ID trỏ tới Image
//    private String category; // Thể loại
//    private String lyrics;   // Lời bài hát
//
//    // Constructors
//    public Song() {}
//
//    public Song(String title, List<String> artistIds, String idAudio, String idImage, String category, String lyrics) {
//        this.title = title;
//        this.artistIds = artistIds;
//        this.idAudio = idAudio;
//        this.idImage = idImage;
//        this.category = category;
//        this.lyrics = lyrics;
//    }
//
//    // Getters & Setters
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public List<String> getArtistIds() {
//        return artistIds;
//    }
//
//    public void setArtistIds(List<String> artistIds) {
//        this.artistIds = artistIds;
//    }
//
//    public String getIdAudio() {
//        return idAudio;
//    }
//
//    public void setIdAudio(String idAudio) {
//        this.idAudio = idAudio;
//    }
//
//    public String getIdImage() {
//        return idImage;
//    }
//
//    public void setIdImage(String idImage) {
//        this.idImage = idImage;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//
//    public String getLyrics() {
//        return lyrics;
//    }
//
//    public void setLyrics(String lyrics) {
//        this.lyrics = lyrics;
//    }
//}

package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "songs")
public class Song {
    @Id
    private String id;
    private String title;
    private List<String> artistIds; // Danh sách ID nghệ sĩ
    private String idAudio;  // ID trỏ tới Audio
    private String idImage;  // ID trỏ tới Image
    private String category; // Thể loại
    private String lyrics;   // Lời bài hát

    // Constructors
    public Song() {}

    public Song(String title, List<String> artistIds, String idAudio, String idImage, String category, String lyrics) {
        this.title = title;
        this.artistIds = artistIds;
        this.idAudio = idAudio;
        this.idImage = idImage;
        this.category = category;
        this.lyrics = lyrics;
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

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }
}