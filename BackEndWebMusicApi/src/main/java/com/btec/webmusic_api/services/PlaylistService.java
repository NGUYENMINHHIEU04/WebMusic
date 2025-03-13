package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    // Lấy danh sách tất cả playlist
    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    // Lấy playlist theo ID
    public Optional<Playlist> getPlaylistById(String id) {
        return playlistRepository.findById(id);
    }

    // Tạo mới playlist
    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    // Cập nhật playlist
    public Playlist updatePlaylist(String id, Playlist updatedPlaylist) {
        return playlistRepository.findById(id).map(existingPlaylist -> {
            existingPlaylist.setName(updatedPlaylist.getName());
            existingPlaylist.setGenre(updatedPlaylist.getGenre());
            existingPlaylist.setArtists(updatedPlaylist.getArtists());
            existingPlaylist.setDescription(updatedPlaylist.getDescription());
            existingPlaylist.setImageUrl(updatedPlaylist.getImageUrl()); // Cập nhật imageUrl
            return playlistRepository.save(existingPlaylist);
        }).orElse(null);
    }

    // Xóa playlist theo ID
    public void deletePlaylist(String id) {
        playlistRepository.deleteById(id);
    }

}
