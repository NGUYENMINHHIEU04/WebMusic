package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Image;
import com.btec.webmusic_api.entities.PlaylistCard;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.ImageRepository;
import com.btec.webmusic_api.repositories.PlaylistCardRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaylistCardService {
    private final PlaylistCardRepository playlistCardRepository;
    private final SongRepository songRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public PlaylistCardService(PlaylistCardRepository playlistCardRepository, SongRepository songRepository, ImageRepository imageRepository) {
        this.playlistCardRepository = playlistCardRepository;
        this.songRepository = songRepository;
        this.imageRepository = imageRepository;
    }

    public PlaylistCard createPlaylist(PlaylistCard playlistCard) {
        // Kiểm tra coverImageId có tồn tại không
        Optional<Image> image = imageRepository.findById(playlistCard.getCoverImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + playlistCard.getCoverImageId() + " not found.");
        }

        // Kiểm tra songIds có tồn tại không
        for (String songId : playlistCard.getSongIds()) {
            Optional<Song> song = songRepository.findById(songId);
            if (!song.isPresent()) {
                throw new IllegalArgumentException("Song with ID " + songId + " not found.");
            }
        }

        // Kiểm tra name không được rỗng
        if (playlistCard.getName() == null || playlistCard.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard name cannot be empty.");
        }

        return playlistCardRepository.save(playlistCard);
    }

    public Optional<PlaylistCard> getPlaylist(String id) {
        return playlistCardRepository.findById(id);
    }

    public List<PlaylistCard> getAllPlaylists() {
        return playlistCardRepository.findAll();
    }

    public PlaylistCard updatePlaylist(String id, PlaylistCard playlistCard) {
        Optional<PlaylistCard> existingPlaylist = playlistCardRepository.findById(id);
        if (!existingPlaylist.isPresent()) {
            throw new IllegalArgumentException("PlaylistCard with ID " + id + " not found.");
        }

        // Kiểm tra coverImageId
        Optional<Image> image = imageRepository.findById(playlistCard.getCoverImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + playlistCard.getCoverImageId() + " not found.");
        }

        // Kiểm tra songIds
        for (String songId : playlistCard.getSongIds()) {
            Optional<Song> song = songRepository.findById(songId);
            if (!song.isPresent()) {
                throw new IllegalArgumentException("Song with ID " + songId + " not found.");
            }
        }

        // Kiểm tra name
        if (playlistCard.getName() == null || playlistCard.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("PlaylistCard name cannot be empty.");
        }

        PlaylistCard updatedPlaylistCard = existingPlaylist.get();
        updatedPlaylistCard.setName(playlistCard.getName());
        updatedPlaylistCard.setDescription(playlistCard.getDescription());
        updatedPlaylistCard.setSongIds(playlistCard.getSongIds());
        updatedPlaylistCard.setCoverImageId(playlistCard.getCoverImageId());
        return playlistCardRepository.save(updatedPlaylistCard);
    }

    public void deletePlaylist(String id) {
        Optional<PlaylistCard> playlist = playlistCardRepository.findById(id);
        if (!playlist.isPresent()) {
            throw new IllegalArgumentException("PlaylistCard with ID " + id + " not found.");
        }
        playlistCardRepository.deleteById(id);
    }
}