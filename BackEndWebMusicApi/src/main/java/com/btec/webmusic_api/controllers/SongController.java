package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongService songService;

    @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    @PostMapping
    public ResponseEntity<Song> createSong(@RequestBody Song song) {
        Song createdSong = songService.createSong(song);
        return ResponseEntity.ok(createdSong);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable("id") String id) {
        Optional<Song> song = songService.getSong(id);
        return song.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(@PathVariable("id") String id, @RequestBody Song song) {
        Song updatedSong = songService.updateSong(id, song);
        return ResponseEntity.ok(updatedSong);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable("id") String id) {
        songService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }
}
