package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Image;
import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.ImageRepository;
import com.btec.webmusic_api.repositories.PlaylistRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final SongRepository songRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, SongRepository songRepository, ImageRepository imageRepository) {
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
        this.imageRepository = imageRepository;
    }

    public Playlist createPlaylist(Playlist playlist) {
        // Kiểm tra coverImageId có tồn tại không
        Optional<Image> image = imageRepository.findById(playlist.getCoverImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + playlist.getCoverImageId() + " not found.");
        }

        // Kiểm tra songIds có tồn tại không
        for (String songId : playlist.getSongIds()) {
            Optional<Song> song = songRepository.findById(songId);
            if (!song.isPresent()) {
                throw new IllegalArgumentException("Song with ID " + songId + " not found.");
            }
        }

        // Kiểm tra name không được rỗng
        if (playlist.getName() == null || playlist.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist name cannot be empty.");
        }

        return playlistRepository.save(playlist);
    }

    public Optional<Playlist> getPlaylist(String id) {
        return playlistRepository.findById(id);
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Playlist updatePlaylist(String id, Playlist playlist) {
        Optional<Playlist> existingPlaylist = playlistRepository.findById(id);
        if (!existingPlaylist.isPresent()) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found.");
        }

        // Kiểm tra coverImageId
        Optional<Image> image = imageRepository.findById(playlist.getCoverImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + playlist.getCoverImageId() + " not found.");
        }

        // Kiểm tra songIds
        for (String songId : playlist.getSongIds()) {
            Optional<Song> song = songRepository.findById(songId);
            if (!song.isPresent()) {
                throw new IllegalArgumentException("Song with ID " + songId + " not found.");
            }
        }

        // Kiểm tra name
        if (playlist.getName() == null || playlist.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist name cannot be empty.");
        }

        Playlist updatedPlaylist = existingPlaylist.get();
        updatedPlaylist.setName(playlist.getName());
        updatedPlaylist.setDescription(playlist.getDescription());
        updatedPlaylist.setSongIds(playlist.getSongIds());
        updatedPlaylist.setCoverImageId(playlist.getCoverImageId());
        return playlistRepository.save(updatedPlaylist);
    }

    public void deletePlaylist(String id) {
        Optional<Playlist> playlist = playlistRepository.findById(id);
        if (!playlist.isPresent()) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found.");
        }
        playlistRepository.deleteById(id);
    }
}