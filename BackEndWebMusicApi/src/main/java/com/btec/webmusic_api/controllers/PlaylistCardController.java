package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.PlaylistCard;
import com.btec.webmusic_api.services.PlaylistCardService;
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
@RequestMapping("/api/playlistCards")
public class PlaylistCardController {
    private final PlaylistCardService playlistCardService;

    @Autowired
    public PlaylistCardController(PlaylistCardService playlistCardService) {
        this.playlistCardService = playlistCardService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject<String>> createPlaylist(@RequestBody PlaylistCard playlistCard) {
        try {
            PlaylistCard createdPlaylistCard = playlistCardService.createPlaylist(playlistCard);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, createdPlaylistCard.getId(), "PlaylistCard created successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<PlaylistCard>> getPlaylist(@PathVariable("id") String id) {
        Optional<PlaylistCard> playlist = playlistCardService.getPlaylist(id);
        if (playlist.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, playlist.get(), "PlaylistCard retrieved successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "PlaylistCard not found"));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseObject<List<PlaylistCard>>> getAllPlaylists() {
        List<PlaylistCard> playlistCards = playlistCardService.getAllPlaylists();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, playlistCards, "PlaylistCard retrieved successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<String>> updatePlaylist(@PathVariable("id") String id, @RequestBody PlaylistCard playlistCard) {
        try {
            PlaylistCard updatedPlaylistCard = playlistCardService.updatePlaylist(id, playlistCard);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedPlaylistCard.getId(), "PlaylistCard updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<Object>> deletePlaylist(@PathVariable("id") String id) {
        try {
            playlistCardService.deletePlaylist(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "PlaylistCard deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, e.getMessage()));
        }
    }
}