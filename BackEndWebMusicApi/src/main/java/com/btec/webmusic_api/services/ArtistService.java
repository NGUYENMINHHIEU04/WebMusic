package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Artist;
import com.btec.webmusic_api.repositories.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtistService {

    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    // Thay Long thành String
    public Optional<Artist> getArtistById(String id) {
        return artistRepository.findById(id);
    }

    public Artist saveArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    // Thay Long thành String
    public void deleteArtist(String id) {
        artistRepository.deleteById(id);
    }
}