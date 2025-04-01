package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Artist;
import com.btec.webmusic_api.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/artists")
public class ArtistController {

    private final ArtistService artistService;

    @Autowired
    public ArtistController(ArtistService artistService) {
        this.artistService = artistService;
    }

    // Lấy danh sách tất cả các Artist với URL ảnh từ API Image
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllArtists() {
        List<Artist> artists = artistService.getAllArtists();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Artist artist : artists) {
            Map<String, Object> artistData = new HashMap<>();
            artistData.put("id", artist.getId());
            artistData.put("name", artist.getName());
            artistData.put("description", artist.getDescription());
            artistData.put("imageUrl", getImageUrl(artist.getImageId())); // Lấy URL ảnh
            response.add(artistData);
        }

        return ResponseEntity.ok(response);
    }

    // Lấy Artist theo ID với URL ảnh từ API Image
    @GetMapping("/{id}")
    public ResponseEntity<?> getArtistById(@PathVariable String id) {
        Optional<Artist> artistOptional = artistService.getArtistById(Long.valueOf(id));
        if (artistOptional.isPresent()) {
            Artist artist = artistOptional.get();
            Map<String, Object> artistData = new HashMap<>();
            artistData.put("id", artist.getId());
            artistData.put("name", artist.getName());
            artistData.put("description", artist.getDescription());
            artistData.put("imageUrl", getImageUrl(artist.getImageId())); // Lấy URL ảnh

            return ResponseEntity.ok(artistData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Thêm mới Artist
    @PostMapping
    public ResponseEntity<Artist> createArtist(@RequestBody Artist artist) {
        Artist savedArtist = artistService.saveArtist(artist);
        return ResponseEntity.ok(savedArtist);
    }

    // Xóa Artist
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable String id) {
        artistService.deleteArtist(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    // Hàm lấy URL ảnh từ API Image
    private String getImageUrl(String imageId) {
        String imageApiUrl = "http://localhost:8080/api/images/" + imageId; // API Image

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(imageApiUrl, byte[].class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return imageApiUrl; // Trả về URL ảnh
        } else {
            return null; // Không tìm thấy ảnh
        }
    }
}

