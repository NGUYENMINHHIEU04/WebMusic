package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Artist;
import com.btec.webmusic_api.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }


    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllArtists() {
        List<Artist> artists = artistService.getAllArtists();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Artist artist : artists) {
            Map<String, Object> artistData = new HashMap<>();
            artistData.put("id", artist.getId());
            artistData.put("name", artist.getName());
            artistData.put("description", artist.getDescription());
            artistData.put("imageUrl", getImageUrl(artist.getImageId()));
            response.add(artistData);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable String id) {
        Optional<Artist> artistOptional = artistService.getArtistById(id); // Truyền trực tiếp String
        if (artistOptional.isPresent()) {
            Artist artist = artistOptional.get();
            Map<String, Object> artistData = new HashMap<>();
            artistData.put("id", artist.getId());
            artistData.put("name", artist.getName());
            artistData.put("description", artist.getDescription());
            artistData.put("imageUrl", getImageUrl(artist.getImageId()));
            return ResponseEntity.ok(artistData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist savedArtist = artistService.saveArtist(artist);
        return ResponseEntity.ok(savedArtist);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable String id) {
        artistService.deleteArtist(id); // Truyền trực tiếp String
        return ResponseEntity.noContent().build();
    }

    private String getImageUrl(String imageId) {
        if (imageId == null || imageId.isEmpty()) {
            return null;
        }
        return "http://localhost:8080/api/images/" + imageId;
    }


}