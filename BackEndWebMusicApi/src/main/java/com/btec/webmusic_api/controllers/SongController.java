package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Song;
import com.btec.webmusic_api.services.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin("*")
public class SongController {

    private final SongService songService;

    // ✅ Sử dụng constructor injection thay vì @Autowired
    public SongController(SongService songService) {
        this.songService = songService;
    }

    // ✅ API upload bài hát
    @PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Song> uploadSongFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("albumId") String albumId,
            @RequestParam("genre") String genre,
            @RequestParam("coverImage") String coverImage) {
        try {
            Song savedSong = songService.uploadSong(file, title, artist, albumId, genre, coverImage);
            return ResponseEntity.ok(savedSong);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // ✅ API lấy tất cả bài hát
    @GetMapping
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songs = songService.getAllSongs();
        return ResponseEntity.ok(songs);
    }

    // ✅ API lấy bài hát theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSongById(@PathVariable String id) {
        Optional<Song> song = songService.getSongById(id);
        return song.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ API lấy bài hát theo album
    @GetMapping("/album/{albumId}")
    public ResponseEntity<List<Song>> getSongsByAlbum(@PathVariable String albumId) {
        List<Song> songs = songService.getSongsByAlbum(albumId);
        return ResponseEntity.ok(songs);
    }

    // ✅ API xóa bài hát
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable String id) {
        boolean deleted = songService.deleteSong(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // ✅ API tải file bài hát
    @GetMapping("/file/{fileId}")
    public ResponseEntity<byte[]> getSongFile(@PathVariable String fileId) {
        try {
            byte[] file = songService.getSongFile(fileId);
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).body(file);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ✅ API thêm một bài hát mới (không upload file)
    @PostMapping("/create")
    public ResponseEntity<Song> createSong(@RequestBody Song song) {
        Song savedSong = songService.createSong(song);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSong);
    }

    // ✅ API thêm danh sách bài hát (không upload file)
    @PostMapping("/bulk")
    public ResponseEntity<List<Song>> createSongs(@RequestBody List<Song> songs) {
        List<Song> savedSongs = songService.createSongs(songs);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSongs);
    }
}
