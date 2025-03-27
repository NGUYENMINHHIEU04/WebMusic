package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
        this.restTemplate = new RestTemplate();
    }

    // Lấy tất cả playlist với thông tin đầy đủ
    public List<Map<String, Object>> getAllPlaylists() {
        List<Playlist> playlists = playlistRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Playlist playlist : playlists) {
            Map<String, Object> playlistData = new HashMap<>();
            playlistData.put("id", playlist.getId());
            playlistData.put("name", playlist.getName());
            playlistData.put("description", playlist.getDescription());
            playlistData.put("songs", getSongs(playlist.getSongIds())); // Lấy dữ liệu từ API Song
            response.add(playlistData);
        }

        return response;
    }

    // Lấy playlist theo ID
    public Optional<Map<String, Object>> getPlaylistById(String id) {
        Optional<Playlist> playlistOptional = playlistRepository.findById(id);
        if (playlistOptional.isEmpty()) return Optional.empty();

        Playlist playlist = playlistOptional.get();
        Map<String, Object> playlistData = new HashMap<>();
        playlistData.put("id", playlist.getId());
        playlistData.put("name", playlist.getName());
        playlistData.put("description", playlist.getDescription());
        playlistData.put("songs", getSongs(playlist.getSongIds()));

        return Optional.of(playlistData);
    }

    // Tạo playlist mới
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    // Lấy thông tin các bài hát từ API Song
    private List<Object> getSongs(List<String> songIds) {
        List<Object> songs = new ArrayList<>();
        String songApiUrl = "http://localhost:8080/api/songs/";

        for (String songId : songIds) {
            try {
                Object song = restTemplate.getForObject(songApiUrl + songId, Object.class);
                songs.add(song);
            } catch (Exception e) {
                songs.add(Map.of("id", songId, "error", "Song not found"));
            }
        }

        return songs;
    }

}
