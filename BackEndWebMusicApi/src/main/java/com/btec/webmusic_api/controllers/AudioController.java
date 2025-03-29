package com.btec.webmusic_api.controllers;

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
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/audios")
public class AudioController {

    private final AudioService audioService;

    @Autowired
    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    // Tạo file audio mới với duration thủ công
    @PostMapping
    public ResponseEntity<ResponseObject<Map<String, Object>>> createAudio(
            @RequestParam("file") MultipartFile file,
            @RequestParam("duration") String duration) throws IOException {
        Audio createdAudio = audioService.createAudio(file, duration);
        Map<String, Object> responseData = Map.of(
                "id", createdAudio.getId(),
                "fileName", createdAudio.getFileName(),
                "duration", createdAudio.getDuration()
        );
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, responseData, "Audio created successfully"));
    }

    // Lấy tất cả file audio
    @GetMapping
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> getAllAudios() {
        List<Map<String, Object>> audios = audioService.getAllAudios();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, audios, "Audios retrieved successfully"));
    }

    // Lấy file audio theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject<Map<String, Object>>> getAudioById(@PathVariable String id) {
        Optional<Map<String, Object>> audio = audioService.getAudioById(id);
        if (audio.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, audio.get(), "Audio retrieved successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio not found"));
        }
    }

    // Cập nhật file audio với duration thủ công
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject<Map<String, Object>>> updateAudio(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("duration") String duration) throws IOException {
        Optional<Audio> audioOptional = audioService.updateAudio(id, file, duration);
        if (audioOptional.isPresent()) {
            Audio updatedAudio = audioOptional.get();
            Map<String, Object> responseData = Map.of(
                    "id", updatedAudio.getId(),
                    "fileName", updatedAudio.getFileName(),
                    "duration", updatedAudio.getDuration()
            );
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, responseData, "Audio updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio not found"));
        }
    }

    // Xóa file audio
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<String>> deleteAudio(@PathVariable String id) {
        boolean deleted = audioService.deleteAudio(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "Audio deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio not found"));
        }
    }

    // Lấy dữ liệu MP3 và duration
    @GetMapping("/{id}/data")
    public ResponseEntity<?> getAudioData(@PathVariable String id) {
        Optional<Map<String, Object>> audioDataOptional = audioService.getAudioData(id);
        if (audioDataOptional.isPresent()) {
            Map<String, Object> audioData = audioDataOptional.get();
            byte[] mp3Data = (byte[]) audioData.get("mp3Data");
            String duration = (String) audioData.get("duration");
            String fileName = (String) audioData.get("fileName");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("audio/mpeg"));
            headers.set("X-Duration", duration);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + (fileName != null ? fileName : "audio.mp3"));

            return new ResponseEntity<>(mp3Data, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "Audio data not found"));
        }
    }
}