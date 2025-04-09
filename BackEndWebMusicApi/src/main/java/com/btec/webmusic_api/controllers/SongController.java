package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Artist;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.ArtistService;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;
    private final ArtistService artistService; // Thêm ArtistService

    @Autowired
    public SongController(SongService songService, ArtistService artistService) {
        this.songService = songService;
        this.artistService = artistService;
    }

    // Tạo bài hát mới
    @PostMapping
    public ResponseEntity<ResponseObject<Song>> createSong(@RequestBody Song song) {
        try {
            // Kiểm tra artistIds trước khi lưu
            List<String> validArtistIds = validateArtistIds(song.getArtistIds());
            song.setArtistIds(validArtistIds); // Cập nhật artistIds đã kiểm tra
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
        try {
            // Kiểm tra artistIds trước khi cập nhật
            List<String> validArtistIds = validateArtistIds(updatedSong.getArtistIds());
            updatedSong.setArtistIds(validArtistIds); // Cập nhật artistIds đã kiểm tra
            Optional<Song> songOptional = songService.updateSong(id, updatedSong);
            if (songOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseObject<>(200, songOptional.get(), "Song updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseObject<>(404, null, "Song not found"));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
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

    // In SongController.java, update the getSongAudio method
    @GetMapping("/{id}/audios")
    public ResponseEntity<?> getSongAudio(@PathVariable String id) {
        Optional<Map<String, Object>> audioDataOptional = songService.getSongAudio(id);
        if (audioDataOptional.isPresent()) {
            Map<String, Object> audioData = audioDataOptional.get();
            byte[] mp3Data = (byte[]) audioData.get("mp3Data");
            String duration = (String) audioData.get("duration");
            String fileName = (String) audioData.get("fileName");

            String idImage = (String) audioData.get("idImage"); // Get idImage

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
            String title = (String) audioData.get("title");
            String category = (String) audioData.get("category");
            String artist = (String) audioData.get("artist");

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
            response.put("idImage", idImage); // Include idImage

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio for song not found"));
        }
    }

    // Phương thức kiểm tra artistIds
    private List<String> validateArtistIds(List<String> artistIds) {
        if (artistIds == null || artistIds.isEmpty()) {
            throw new IllegalArgumentException("At least one artist is required.");
        }
        List<String> validArtistIds = new ArrayList<>();
        for (String artistId : artistIds) {
            Optional<Artist> artist = artistService.getArtistById(artistId);
            if (artist.isEmpty()) {
                throw new IllegalArgumentException("Artist ID " + artistId + " not found.");
            }
            validArtistIds.add(artist.get().getId()); // Đảm bảo ID là _id thực tế (ObjectId)
        }
        return validArtistIds;
    }
}