package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.entities.Image;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.AudioRepository;
import com.btec.webmusic_api.repositories.ImageRepository;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    private final SongRepository songRepository;
    private final AudioRepository audioRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public SongService(SongRepository songRepository, AudioRepository audioRepository, ImageRepository imageRepository) {
        this.songRepository = songRepository;
        this.audioRepository = audioRepository;
        this.imageRepository = imageRepository;
    }

    public Song createSong(Song song) {
        // Kiểm tra audioId và imageId có tồn tại không
        Optional<Audio> audio = audioRepository.findById(song.getAudioId());
        if (!audio.isPresent()) {
            throw new IllegalArgumentException("Audio with ID " + song.getAudioId() + " not found.");
        }

        Optional<Image> image = imageRepository.findById(song.getImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + song.getImageId() + " not found.");
        }

        // Kiểm tra title và artist không được rỗng
        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (song.getArtist() == null || song.getArtist().trim().isEmpty()) {
            throw new IllegalArgumentException("Artist cannot be empty.");
        }

        return songRepository.save(song);
    }

    public Optional<Song> getSong(String id) {
        return songRepository.findById(id);
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Song updateSong(String id, Song song) {
        Optional<Song> existingSong = songRepository.findById(id);
        if (!existingSong.isPresent()) {
            throw new IllegalArgumentException("Song with ID " + id + " not found.");
        }

        // Kiểm tra audioId và imageId
        Optional<Audio> audio = audioRepository.findById(song.getAudioId());
        if (!audio.isPresent()) {
            throw new IllegalArgumentException("Audio with ID " + song.getAudioId() + " not found.");
        }

        Optional<Image> image = imageRepository.findById(song.getImageId());
        if (!image.isPresent()) {
            throw new IllegalArgumentException("Image with ID " + song.getImageId() + " not found.");
        }

        // Kiểm tra title và artist
        if (song.getTitle() == null || song.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty.");
        }
        if (song.getArtist() == null || song.getArtist().trim().isEmpty()) {
            throw new IllegalArgumentException("Artist cannot be empty.");
        }

        Song updatedSong = existingSong.get();
        updatedSong.setTitle(song.getTitle());
        updatedSong.setArtist(song.getArtist());
        updatedSong.setAudioId(song.getAudioId());
        updatedSong.setImageId(song.getImageId());
        return songRepository.save(updatedSong);
    }

    public void deleteSong(String id) {
        Optional<Song> song = songRepository.findById(id);
        if (!song.isPresent()) {
            throw new IllegalArgumentException("Song with ID " + id + " not found.");
        }
        songRepository.deleteById(id);
    }
}