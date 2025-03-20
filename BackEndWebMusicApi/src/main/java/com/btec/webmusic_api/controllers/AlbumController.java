package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Album;
import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.repositories.SongRepository;
import com.btec.webmusic_api.services.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin("*")
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumService.createAlbum(album);
    }

    @GetMapping
    public List<Album> getAllAlbums() {
        return albumService.getAllAlbums();
    }

    @GetMapping("/{id}")
    public Optional<Album> getAlbumById(@PathVariable String id) {
        return albumService.getAlbumById(id);
    }

    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable String id, @RequestBody Album albumDetails) {
        return albumService.updateAlbum(id, albumDetails);
    }

    @DeleteMapping("/{id}")
    public String deleteAlbum(@PathVariable String id) {
        albumService.deleteAlbum(id);
        return "Album with ID: " + id + " has been deleted.";
    }


//    @Autowired
//    private MusicService musicService;
//
//    @GetMapping("/{id}/songs")
//    public List<Music> getSongsByAlbum(@PathVariable String id) {
//        Album album = albumService.getAlbumById(id).orElseThrow(() -> new RuntimeException("Album not found!"));
//        return musicService.getSongsByIds(album.getSongIds());
//    }

    @Autowired
    private SongRepository songRepository;  // Inject SongRepository

    public List<Song> getSongsByIds(List<String> songIds) {
        return songRepository.findAllById(songIds);  // Gọi đúng cách
    }




}
