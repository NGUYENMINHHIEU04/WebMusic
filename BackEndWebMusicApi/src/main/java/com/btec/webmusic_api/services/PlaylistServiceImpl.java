package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Playlist;
import com.btec.webmusic_api.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistServiceImpl implements PlaylistService {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistServiceImpl(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    @Override
    @Transactional
    public Playlist createPlaylist(Playlist playlist) {
        // Validate input
        if (playlist == null) {
            throw new IllegalArgumentException("Playlist cannot be null");
        }
        if (playlist.getTitle() == null || playlist.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist title cannot be empty");
        }

        // Ensure playlistCardIds is initialized
        if (playlist.getPlaylistCardIds() == null) {
            playlist.setPlaylistCardIds(new java.util.ArrayList<>());
        }

        // Remove any null or empty playlistCardIds
        playlist.setPlaylistCardIds(
                playlist.getPlaylistCardIds().stream()
                        .filter(cardId -> cardId != null && !cardId.trim().isEmpty())
                        .distinct()
                        .collect(java.util.stream.Collectors.toList())
        );

        return playlistRepository.save(playlist);
    }

    @Override
    public Optional<Playlist> getPlaylist(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist ID cannot be empty");
        }
        return playlistRepository.findById(id);
    }

    @Override
    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    @Override
    public List<Playlist> getPlaylistsByCardId(String playlistCardId) {
        if (playlistCardId == null || playlistCardId.trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard ID cannot be empty");
        }
        return playlistRepository.findByPlaylistCardIdsContaining(playlistCardId);
    }

    @Override
    @Transactional
    public Playlist updatePlaylist(String id, Playlist playlist) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist ID cannot be empty");
        }
        if (playlist == null) {
            throw new IllegalArgumentException("Playlist cannot be null");
        }

        Optional<Playlist> existingPlaylist = playlistRepository.findById(id);
        if (!existingPlaylist.isPresent()) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found");
        }

        Playlist updatedPlaylist = existingPlaylist.get();

        // Update title if provided and valid
        if (playlist.getTitle() != null && !playlist.getTitle().trim().isEmpty()) {
            updatedPlaylist.setTitle(playlist.getTitle().trim());
        }

        // Update playlistCardIds if provided
        if (playlist.getPlaylistCardIds() != null) {
            List<String> cleanedCardIds = playlist.getPlaylistCardIds().stream()
                    .filter(cardId -> cardId != null && !cardId.trim().isEmpty())
                    .distinct()
                    .collect(java.util.stream.Collectors.toList());
            updatedPlaylist.setPlaylistCardIds(cleanedCardIds);
        }

        return playlistRepository.save(updatedPlaylist);
    }

    @Override
    @Transactional
    public Playlist addPlaylistCard(String id, String playlistCardId) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist ID cannot be empty");
        }
        if (playlistCardId == null || playlistCardId.trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard ID cannot be empty");
        }

        Optional<Playlist> existingPlaylist = playlistRepository.findById(id);
        if (!existingPlaylist.isPresent()) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found");
        }

        Playlist playlist = existingPlaylist.get();
        playlist.addPlaylistCardId(playlistCardId.trim());
        return playlistRepository.save(playlist);
    }

    @Override
    @Transactional
    public Playlist removePlaylistCard(String id, String playlistCardId) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist ID cannot be empty");
        }
        if (playlistCardId == null || playlistCardId.trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard ID cannot be empty");
        }

        Optional<Playlist> existingPlaylist = playlistRepository.findById(id);
        if (!existingPlaylist.isPresent()) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found");
        }

        Playlist playlist = existingPlaylist.get();
        if (!playlist.getPlaylistCardIds().contains(playlistCardId)) {
            throw new IllegalArgumentException("PlaylistCard ID " + playlistCardId + " not found in playlist");
        }

        playlist.removePlaylistCardId(playlistCardId);
        return playlistRepository.save(playlist);
    }

    @Override
    @Transactional
    public void deletePlaylist(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Playlist ID cannot be empty");
        }

        if (!playlistRepository.existsById(id)) {
            throw new IllegalArgumentException("Playlist with ID " + id + " not found");
        }

        playlistRepository.deleteById(id);
    }
}