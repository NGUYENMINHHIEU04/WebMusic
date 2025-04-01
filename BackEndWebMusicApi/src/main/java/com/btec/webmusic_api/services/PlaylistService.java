package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Playlist;

import java.util.List;
import java.util.Optional;

public interface PlaylistService {
    Playlist createPlaylist(Playlist playlist);
    Optional<Playlist> getPlaylist(String id);
    List<Playlist> getAllPlaylists();
    List<Playlist> getPlaylistsByCardId(String playlistCardId);
    Playlist updatePlaylist(String id, Playlist playlist);
    Playlist addPlaylistCard(String id, String playlistCardId);
    Playlist removePlaylistCard(String id, String playlistCardId);
    void deletePlaylist(String id);
}