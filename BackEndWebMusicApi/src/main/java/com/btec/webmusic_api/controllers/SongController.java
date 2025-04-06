package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    // Tạo bài hát mới
    @PostMapping
    public ResponseEntity<ResponseObject<Song>> createSong(@RequestBody Song song) {
        try {
            Song createdSong = songService.createSong(song);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, createdSong, "Song created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    // Lấy tất cả bài hát
    @GetMapping
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> getAllSongs() {
        List<Map<String, Object>> songs = songService.getAllSongs();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, songs, "Songs retrieved successfully"));
    }

    // Lấy bài hát theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<Map<String, Object>>> getSongById(@PathVariable String id) {
        Optional<Map<String, Object>> song = songService.getSongById(id);
        if (song.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, song.get(), "Song retrieved successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Song not found"));
        }
    }

    // Cập nhật bài hát
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<Song>> updateSong(@PathVariable String id, @RequestBody Song updatedSong) {
        Optional<Song> songOptional = songService.updateSong(id, updatedSong);
        if (songOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, songOptional.get(), "Song updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Song not found"));
        }
    }

    // Xóa bài hát
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<String>> deleteSong(@PathVariable String id) {
        boolean deleted = songService.deleteSong(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "Song deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Song not found"));
        }
    }

    // Lấy file MP3 và thông tin bài hát
    @GetMapping("/{id}/audios")
    public ResponseEntity<?> getSongAudio(@PathVariable String id) {
        Optional<Map<String, Object>> audioDataOptional = songService.getSongAudio(id);
        if (audioDataOptional.isPresent()) {
            Map<String, Object> audioData = audioDataOptional.get();
            byte[] mp3Data = (byte[]) audioData.get("mp3Data");
            String duration = (String) audioData.get("duration");
            String fileName = (String) audioData.get("fileName");

            // Lấy thông tin bài hát từ SongService
            Optional<Map<String, Object>> songOptional = songService.getSongById(id);
            if (!songOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseObject<>(404, null, "Song not found"));
            }

            Map<String, Object> songData = songOptional.get();
            String title = (String) songData.getOrDefault("title", "Unknown Title");
            String category = (String) songData.getOrDefault("category", "Unknown Category");
            String artist = (String) songData.getOrDefault("artist", "Unknown Artist");

            // Chuyển dữ liệu âm thanh thành base64
            String audioBase64 = Base64.getEncoder().encodeToString(mp3Data);

            // Tạo response JSON
            Map<String, Object> response = new HashMap<>();
            response.put("audioBase64", audioBase64);
            response.put("duration", duration != null ? duration : "0:00");
            response.put("filename", fileName != null ? fileName : "song.mp3");
            response.put("title", title);
            response.put("category", category);
            response.put("artist", artist);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio for song not found"));
        }
    }
}