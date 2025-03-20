package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {StaticDomain.IP + ":3000",
        StaticDomain.IP + ":3001",
        "http://localhost:3000",
        "http://localhost:3001"})
@RestController
@RequestMapping("/api/songs")
public class SongController {
    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject<String>> createSong(@RequestBody Song song) {
        try {
            Song createdSong = songService.createSong(song);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, createdSong.getId(), "Song created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<Song>> getSong(@PathVariable("id") String id) {
        Optional<Song> song = songService.getSong(id);
        if (song.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, song.get(), "Song retrieved successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Song not found"));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseObject<List<Song>>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, songs, "Songs retrieved successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<String>> updateSong(@PathVariable("id") String id, @RequestBody Song song) {
        try {
            Song updatedSong = songService.updateSong(id, song);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedSong.getId(), "Song updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<Object>> deleteSong(@PathVariable("id") String id) {
        try {
            songService.deleteSong(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "Song deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, e.getMessage()));
        }
    }
}