package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.services.AudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin(origins = {StaticDomain.IP + ":3000",
        StaticDomain.IP + ":3001",
        "http://localhost:3000",
        "http://localhost:3001"})
@RestController
@RequestMapping("/api/audios")
public class AudioController {
    private final AudioService audioService;

    @Autowired
    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    @PostMapping
    public ResponseEntity<?> uploadAudio(@RequestParam("file") MultipartFile file) throws IOException {
        Audio savedAudio = audioService.saveAudio(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject(200, savedAudio.getId(), "Audio uploaded successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getAudio(@PathVariable("id") String id) {
        Optional<Audio> audioOptional = audioService.getAudio(id);
        if (audioOptional.isPresent()) {
            Audio audio = audioOptional.get();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("audio/mpeg")); // Định dạng phổ biến cho audio
            return new ResponseEntity<>(audio.getData(), headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAudio(@PathVariable("id") String id, @RequestParam("file") MultipartFile file) {
        try {
            Audio updatedAudio = audioService.updateAudio(id, file);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject(200, updatedAudio.getId(), "Audio updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject(404, null, e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject(500, null, "Error updating audio"));
        }
    }
}