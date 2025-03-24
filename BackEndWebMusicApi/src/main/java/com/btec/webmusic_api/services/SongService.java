package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    private final SongRepository songRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
        this.restTemplate = new RestTemplate();
    }

    public Song createSong(Song song) {
        song.setArtistName(getArtistName(song.getIdArtist()));
        song.setAudioUrl(getAudioUrl(song.getAudioId()));
        song.setImageUrl(getImageUrl(song.getImageId()));
        return songRepository.save(song);
    }

    public Optional<Song> getSong(String id) {
        Optional<Song> song = songRepository.findById(id);
        song.ifPresent(s -> {
            s.setArtistName(getArtistName(s.getIdArtist()));
            s.setAudioUrl(getAudioUrl(s.getAudioId()));
            s.setImageUrl(getImageUrl(s.getImageId()));
        });
        return song;
    }

    public List<Song> getAllSongs() {
        List<Song> songs = songRepository.findAll();
        songs.forEach(song -> {
            song.setArtistName(getArtistName(song.getIdArtist()));
            song.setAudioUrl(getAudioUrl(song.getAudioId()));
            song.setImageUrl(getImageUrl(song.getImageId()));
        });
        return songs;
    }

    public Song updateSong(String id, Song song) {
        Optional<Song> existingSong = songRepository.findById(id);
        if (!existingSong.isPresent()) {
            throw new IllegalArgumentException("Song with ID " + id + " not found.");
        }

        Song updatedSong = existingSong.get();
        updatedSong.setTitle(song.getTitle());
        updatedSong.setIdArtist(song.getIdArtist());
        updatedSong.setArtistName(getArtistName(song.getIdArtist())); // Lấy tên artist từ API Artist
        updatedSong.setAudioId(song.getAudioId());
        updatedSong.setImageId(song.getImageId());
        updatedSong.setAudioUrl(getAudioUrl(song.getAudioId()));
        updatedSong.setImageUrl(getImageUrl(song.getImageId()));

        return songRepository.save(updatedSong);
    }

    public void deleteSong(String id) {
        if (!songRepository.existsById(id)) {
            throw new IllegalArgumentException("Song with ID " + id + " not found.");
        }
        songRepository.deleteById(id);
    }

    // Lấy tên artist từ API Artist
    private String getArtistName(String idArtist) {
        String artistApiUrl = "http://localhost:8080/api/artists/" + idArtist; // Thay URL thật của API Artist
        try {
            return restTemplate.getForObject(artistApiUrl, String.class);
        } catch (Exception e) {
            return "Unknown Artist"; // Trả về mặc định nếu không tìm thấy artist
        }
    }

    // Lấy URL từ API Audio
    private String getAudioUrl(String audioId) {
        String audioApiUrl = "http://localhost:8080/api/audios/" + audioId; // Thay URL thật của API Audio
        return audioApiUrl;
    }

    // Lấy URL từ API Image
    private String getImageUrl(String imageId) {
        String imageApiUrl = "http://localhost:8080/api/images/" + imageId; // Thay URL thật của API Image
        return imageApiUrl;
    }
}
