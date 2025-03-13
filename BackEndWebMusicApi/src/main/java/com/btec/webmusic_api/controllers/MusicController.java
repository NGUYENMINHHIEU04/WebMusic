package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.entities.Music;
import com.btec.webmusic_api.services.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.io.ByteArrayOutputStream;
import org.bson.types.ObjectId;

@RestController
@RequestMapping("/api/music")
@CrossOrigin("*")
public class MusicController {

    @Autowired
    private MusicService musicService;

    @Autowired
    private GridFSBucket gridFSBucket;

    // Lấy tất cả bài hát
    @GetMapping
    public List<Music> getAllMusic() {
        return musicService.getAllMusic();
    }

    // Lấy bài hát theo ID
    @GetMapping("/{id}")
    public Optional<Music> getMusicById(@PathVariable String id) {
        return musicService.getMusicById(id);
    }

    // Lấy danh sách bài hát theo Playlist
    @GetMapping("/playlist/{playlistId}")
    public List<Music> getMusicByPlaylistId(@PathVariable String playlistId) {
        return musicService.getMusicByPlaylistId(playlistId);
    }

    // Upload bài hát mới
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Music createMusic(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("album") String album,
            @RequestParam("duration") String duration,
            @RequestParam("playlistId") String playlistId,
            @RequestParam("audioFile") MultipartFile audioFile
    ) throws IOException {
        Music music = new Music();
        music.setTitle(title);
        music.setArtist(artist);
        music.setAlbum(album);
        music.setDuration(duration);
        music.setPlaylistId(playlistId);
        return musicService.createMusic(music, audioFile);
    }

    // Xóa bài hát theo ID
    @DeleteMapping("/{id}")
    public void deleteMusic(@PathVariable String id) {
        musicService.deleteMusic(id);
    }

    // Lấy file MP3 từ GridFS
    @GetMapping("/stream/{fileId}")
    public ResponseEntity<byte[]> streamMusic(@PathVariable String fileId) throws IOException {
        GridFSFile file = gridFSBucket.find(new org.bson.Document("_id", new ObjectId(fileId))).first();
        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        // Đọc file từ GridFS
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        gridFSBucket.downloadToStream(file.getId(), outputStream); // Sửa lại

        byte[] fileData = outputStream.toByteArray();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileData);
    }
}
