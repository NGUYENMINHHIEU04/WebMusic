package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Artist;
import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.ArtistService;
import com.btec.webmusic_api.services.HistoryService;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React frontend
public class SongController {

    private final SongService songService;
    private final ArtistService artistService;
    private final HistoryService historyService;

    @Autowired
    public SongController(SongService songService, ArtistService artistService, HistoryService historyService) {
        this.songService = songService;
        this.artistService = artistService;
        this.historyService = historyService;
    }

    // Gợi ý bài hát dựa trên mood
    @PostMapping("/recommend")
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> recommendSongs(
            @RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String mood = request.get("mood");

        if (userId == null || userId.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, "User ID is required"));
        }
        if (mood == null || mood.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, "Mood is required"));
        }

        try {
            // Lấy lịch sử nghe nhạc
            List<History> historyList = historyService.getHistoryByUserId(userId);
            // Chuyển đổi List<History> thành List<Map<String, Object>>
            List<Map<String, Object>> history = historyList.stream()
                    .map(historyEntry -> {
                        Map<String, Object> historyMap = new HashMap<>();
                        historyMap.put("songId", historyEntry.getSongId());
                        historyMap.put("title", historyEntry.getTitle() != null ? historyEntry.getTitle() : "Unknown Song");
                        historyMap.put("artist", historyEntry.getArtist() != null ? historyEntry.getArtist() : "Unknown Artist");
                        historyMap.put("imageUrl", historyEntry.getImageUrl() != null ? historyEntry.getImageUrl() : "https://via.placeholder.com/150");
                        historyMap.put("listenCount", historyEntry.getListenCount() != null ? historyEntry.getListenCount() : 0);
                        historyMap.put("rating", historyEntry.getRating());
                        historyMap.put("timestamp", historyEntry.getTimestamp());
                        return historyMap;
                    })
                    .collect(Collectors.toList());

            // Gọi service để lấy gợi ý bài hát
            List<Map<String, Object>> recommendations = songService.recommendSongs(userId, mood, history);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, recommendations, "Recommended songs retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Error generating recommendations: " + e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ResponseObject<Song>> createSong(@RequestBody Song song) {
        try {
            List<String> validArtistIds = validateArtistIds(song.getArtistIds());
            song.setArtistIds(validArtistIds);
            Song createdSong = songService.createSong(song);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, createdSong, "Song created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> getAllSongs() {
        List<Map<String, Object>> songs = songService.getAllSongs();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, songs, "Songs retrieved successfully"));
    }

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

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<Song>> updateSong(@PathVariable String id, @RequestBody Song updatedSong) {
        try {
            List<String> validArtistIds = validateArtistIds(updatedSong.getArtistIds());
            updatedSong.setArtistIds(validArtistIds);
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

    @GetMapping("/{id}/audios")
    public ResponseEntity<?> getSongAudio(@PathVariable String id) {
        Optional<Map<String, Object>> audioDataOptional = songService.getSongAudio(id);
        if (audioDataOptional.isPresent()) {
            Map<String, Object> audioData = audioDataOptional.get();
            byte[] mp3Data = (byte[]) audioData.get("mp3Data");
            String duration = (String) audioData.get("duration");
            String fileName = (String) audioData.get("fileName");
            String title = (String) audioData.get("title");
            String category = (String) audioData.get("category");
            String artist = (String) audioData.get("artist");
            String idImage = (String) audioData.get("idImage");

            String audioBase64 = Base64.getEncoder().encodeToString(mp3Data);
            Map<String, Object> response = new HashMap<>();
            response.put("audioBase64", audioBase64);
            response.put("duration", duration != null ? duration : "0:00");
            response.put("filename", fileName != null ? fileName : "song.mp3");
            response.put("title", title);
            response.put("category", category);
            response.put("artist", artist);
            response.put("idImage", idImage);

            return ResponseEntity.status(HttpStatus.OK)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio for song not found"));
        }
    }

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
            validArtistIds.add(artist.get().getId());
        }
        return validArtistIds;
    }
}