package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.services.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }


    // Lấy tất cả playlist
    @GetMapping
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    // Lấy playlist theo ID
    @GetMapping("/{id}")
    public Optional<Playlist> getPlaylistById(@PathVariable String id) {
        return playlistService.getPlaylistById(id);
    }

    // Tạo mới playlist
    @PostMapping
    public Playlist createPlaylist(@RequestBody Playlist playlist) {
        return playlistService.createPlaylist(playlist);
    }

    // Cập nhật playlist theo ID
    @PutMapping("/{id}")
    public Playlist updatePlaylist(@PathVariable String id, @RequestBody Playlist updatedPlaylist) {
        return playlistService.updatePlaylist(id, updatedPlaylist);
    }

    // Xóa playlist theo ID
    @DeleteMapping("/{id}")
    public void deletePlaylist(@PathVariable String id) {
        playlistService.deletePlaylist(id);
    }
}
