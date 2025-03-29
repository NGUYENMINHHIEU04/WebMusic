package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.AudioRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class SongService {

    private final SongRepository songRepository;
    private final AudioRepository audioRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SongService(SongRepository songRepository, AudioRepository audioRepository) {
        this.songRepository = songRepository;
        this.audioRepository = audioRepository;
        this.restTemplate = new RestTemplate();
    }

    // Tạo bài hát mới
    public Song createSong(Song song) {
        validateSong(song);
        return songRepository.save(song);
    }

    // Lấy tất cả bài hát
    public List<Map<String, Object>> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Song song : songs) {
            response.add(buildSongResponse(song));
        }
        return response;
    }

    // Lấy bài hát theo ID
    public Optional<Map<String, Object>> getSongById(String id) {
        Optional<Song> songOptional = songRepository.findById(id);
        return songOptional.map(this::buildSongResponse);
    }

    // Cập nhật bài hát
    public Optional<Song> updateSong(String id, Song updatedSong) {
        Optional<Song> songOptional = songRepository.findById(id);
        if (songOptional.isEmpty()) {
            return Optional.empty();
        }

        Song song = songOptional.get();
        song.setTitle(updatedSong.getTitle());
        song.setArtistIds(updatedSong.getArtistIds());
        song.setIdAudio(updatedSong.getIdAudio());
        song.setIdImage(updatedSong.getIdImage());
        song.setCategory(updatedSong.getCategory());
        song.setLyrics(updatedSong.getLyrics());

        validateSong(song);
        return Optional.of(songRepository.save(song));
    }

    // Xóa bài hát
    public boolean deleteSong(String id) {
        if (!songRepository.existsById(id)) {
            return false;
        }
        songRepository.deleteById(id);
        return true;
    }

    // Lấy file MP3 và duration từ Audio của bài hát
    public Optional<Map<String, Object>> getSongAudio(String songId) {
        Optional<Song> songOptional = songRepository.findById(songId);
        if (songOptional.isEmpty()) {
            return Optional.empty();
        }

        Song song = songOptional.get();
        Optional<Audio> audioOptional = audioRepository.findById(song.getIdAudio());
        if (audioOptional.isEmpty()) {
            return Optional.empty();
        }

        Audio audio = audioOptional.get();
        Map<String, Object> audioData = new HashMap<>();
        audioData.put("mp3Data", audio.getData());
        audioData.put("duration", audio.getDuration());
        audioData.put("fileName", audio.getFileName());

        return Optional.of(audioData);
    }

    // Xây dựng response cho bài hát
    private Map<String, Object> buildSongResponse(Song song) {
        Map<String, Object> songData = new HashMap<>();
        songData.put("id", song.getId());
        songData.put("title", song.getTitle());
        songData.put("artists", getArtistNames(song.getArtistIds()));
        songData.put("category", song.getCategory());
        songData.put("lyrics", song.getLyrics()); // Thêm lyrics vào response
        return songData;
    }

    // Validate dữ liệu bài hát
    private void validateSong(Song song) {
        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (song.getArtistIds() == null || song.getArtistIds().isEmpty()) {
            throw new IllegalArgumentException("At least one artist is required.");
        }
        if (song.getIdAudio() == null || song.getIdAudio().trim().isEmpty()) {
            throw new IllegalArgumentException("Audio ID cannot be empty.");
        }
        if (song.getIdImage() == null || song.getIdImage().trim().isEmpty()) {
            throw new IllegalArgumentException("Image ID cannot be empty.");
        }
        if (song.getCategory() == null || song.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Category cannot be empty.");
        }
        // Lyrics có thể null, không bắt buộc
    }

    // Lấy danh sách tên nghệ sĩ từ API Artist
    private List<String> getArtistNames(List<String> artistIds) {
        List<String> artistNames = new ArrayList<>();
        if (artistIds == null) {
            return List.of("Unknown Artist");
        }

        for (String artistId : artistIds) {
            String artistApiUrl = "http://localhost:8080/api/artists/" + artistId;
            try {
                Map<String, Object> artist = restTemplate.getForObject(artistApiUrl, Map.class);
                if (artist != null && artist.get("name") != null) {
                    artistNames.add(artist.get("name").toString());
                } else {
                    artistNames.add("Unknown Artist");
                }
            } catch (Exception e) {
                artistNames.add("Unknown Artist");
            }
        }
        return artistNames;
    }
}