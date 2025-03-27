package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
        this.restTemplate = new RestTemplate();
    }

    // Lấy tất cả bài hát
    public List<Map<String, Object>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Song song : songs) {
            Map<String, Object> songData = new HashMap<>();
            songData.put("id", song.getId());
            songData.put("title", song.getTitle());
            songData.put("artist", getArtistName(song.getArtistId())); // Lấy tên từ API Artist
            songData.put("audioData", getAudioData(song.getIdAudio())); // Lấy data từ API Audio
            songData.put("imageData", getImageData(song.getIdImage())); // Lấy data từ API Image
            response.add(songData);
        }

        return response;
    }

    // Lấy bài hát theo ID
    public Optional<Map<String, Object>> getSongById(String id) {
        Optional<Song> songOptional = songRepository.findById(id);
        if (songOptional.isEmpty()) return Optional.empty();

        Song song = songOptional.get();
        Map<String, Object> songData = new HashMap<>();
        songData.put("id", song.getId());
        songData.put("title", song.getTitle());
        songData.put("artist", getArtistName(song.getArtistId()));
        songData.put("audioData", getAudioData(song.getIdAudio()));
        songData.put("imageData", getImageData(song.getIdImage()));

        return Optional.of(songData);
    }

    // Tạo bài hát mới
    public Song createSong(Song song) {
        return songRepository.save(song);
    }

    // Lấy tên nghệ sĩ từ API Artist
    private String getArtistName(String artistId) {
        String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
        try {
            Map<String, Object> artist = restTemplate.getForObject(artistApiUrl, Map.class);
            return artist != null ? artist.get("name").toString() : null;
        } catch (Exception e) {
            return "Unknown Artist";
        }
    }

    // Lấy dữ liệu audio từ API Audio
    private Map<String, Object> getAudioData(String audioId) {
        String audioApiUrl = "http://localhost:8080/api/audio/" + audioId;
        try {
            return restTemplate.getForObject(audioApiUrl, Map.class);
        } catch (Exception e) {
            return Map.of("error", "Audio not found");
        }
    }

    // Lấy dữ liệu image từ API Image
    private Map<String, Object> getImageData(String imageId) {
        String imageApiUrl = "http://localhost:8080/api/images/" + imageId;
        try {
            return restTemplate.getForObject(imageApiUrl, Map.class);
        } catch (Exception e) {
            return Map.of("error", "Image not found");
        }
    }
}
