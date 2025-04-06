package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // Stream file MP3 của bài hát
    @GetMapping("/{id}/audios")
    public ResponseEntity<Resource> streamSongAudio(@PathVariable String id) {
        Optional<Map<String, Object>> audioDataOptional = songService.getSongAudio(id);
        if (audioDataOptional.isPresent()) {
            Map<String, Object> audioData = audioDataOptional.get();
            byte[] mp3Data = (byte[]) audioData.get("mp3Data");
            String fileName = (String) audioData.get("fileName");
            String duration = (String) audioData.get("duration");

            // Tạo Resource từ dữ liệu MP3
            ByteArrayResource resource = new ByteArrayResource(mp3Data);

            // Thiết lập headers cho streaming
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("audio/mpeg"));
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + (fileName != null ? fileName : "song.mp3"));
            headers.set("X-Duration", duration != null ? duration : "0:00");
            headers.set(HttpHeaders.ACCEPT_RANGES, "bytes"); // Hỗ trợ range requests cho streaming

            // Trả về luồng dữ liệu
            return ResponseEntity.status(HttpStatus.OK)
                    .headers(headers)
                    .contentLength(mp3Data.length)
                    .body(resource);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}