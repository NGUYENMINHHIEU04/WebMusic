// src/main/java/com/btec/webmusic_api/controllers/PlaylistController.java
package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.services.PlaylistService;
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
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject<Playlist>> createPlaylist(@RequestBody Playlist playlist) {
        try {
            Playlist createdPlaylist = playlistService.createPlaylist(playlist);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, createdPlaylist, "Playlist created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<Playlist>> getPlaylist(@PathVariable("id") String id) {
        Optional<Playlist> playlist = playlistService.getPlaylist(id);
        if (playlist.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, playlist.get(), "Playlist retrieved successfully"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ResponseObject<>(404, null, "Playlist not found"));
    }

    @GetMapping
    public ResponseEntity<ResponseObject<List<Playlist>>> getAllPlaylists() {
        List<Playlist> playlists = playlistService.getAllPlaylists();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, playlists, "Playlists retrieved successfully"));
    }

    @GetMapping("/card/{playlistCardId}")
    public ResponseEntity<ResponseObject<List<Playlist>>> getPlaylistsByCardId(@PathVariable("playlistCardId") String playlistCardId) {
        List<Playlist> playlists = playlistService.getPlaylistsByCardId(playlistCardId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, playlists, "Playlists retrieved successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<Playlist>> updatePlaylist(@PathVariable("id") String id, @RequestBody Playlist playlist) {
        try {
            Playlist updatedPlaylist = playlistService.updatePlaylist(id, playlist);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedPlaylist, "Playlist updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @PutMapping("/{id}/add-card/{playlistCardId}")
    public ResponseEntity<ResponseObject<Playlist>> addPlaylistCard(
            @PathVariable("id") String id,
            @PathVariable("playlistCardId") String playlistCardId) {
        try {
            Playlist updatedPlaylist = playlistService.addPlaylistCard(id, playlistCardId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedPlaylist, "Playlist card added successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @PutMapping("/{id}/remove-card/{playlistCardId}")
    public ResponseEntity<ResponseObject<Playlist>> removePlaylistCard(
            @PathVariable("id") String id,
            @PathVariable("playlistCardId") String playlistCardId) {
        try {
            Playlist updatedPlaylist = playlistService.removePlaylistCard(id, playlistCardId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedPlaylist, "Playlist card removed successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<Object>> deletePlaylist(@PathVariable("id") String id) {
        try {
            playlistService.deletePlaylist(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "Playlist deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, e.getMessage()));
        }
    }
}