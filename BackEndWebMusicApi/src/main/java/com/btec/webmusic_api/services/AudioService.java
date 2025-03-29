package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.repositories.AudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class AudioService {

    private final AudioRepository audioRepository;

    @Autowired
    public AudioService(AudioRepository audioRepository) {
        this.audioRepository = audioRepository;
    }

    // Tạo file audio mới với duration thủ công
    public Audio createAudio(MultipartFile file, String duration) throws IOException {
        long maxFileSize = 10 * 1024 * 1024; // Giới hạn 10MB

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 10MB.");
        }

        if (duration == null || duration.trim().isEmpty()) {
            throw new IllegalArgumentException("Duration cannot be empty.");
        }

        byte[] data = file.getBytes();
        Audio audio = new Audio(data, file.getOriginalFilename(), duration);
        return audioRepository.save(audio);
    }

    // Lấy tất cả file audio
    public List<Map<String, Object>> getAllAudios() {
        List<Audio> audios = audioRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Audio audio : audios) {
            Map<String, Object> audioData = new HashMap<>();
            audioData.put("id", audio.getId());
            audioData.put("fileName", audio.getFileName());
            audioData.put("duration", audio.getDuration());
            response.add(audioData);
        }
        return response;
    }

    // Lấy file audio theo ID
    public Optional<Map<String, Object>> getAudioById(String id) {
        Optional<Audio> audioOptional = audioRepository.findById(id);
        if (audioOptional.isEmpty()) {
            return Optional.empty();
        }

        Audio audio = audioOptional.get();
        Map<String, Object> audioData = new HashMap<>();
        audioData.put("id", audio.getId());
        audioData.put("fileName", audio.getFileName());
        audioData.put("duration", audio.getDuration());
        return Optional.of(audioData);
    }

    // Cập nhật file audio với duration thủ công
    public Optional<Audio> updateAudio(String id, MultipartFile file, String duration) throws IOException {
        long maxFileSize = 10 * 1024 * 1024; // 10MB

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 10MB.");
        }

        if (duration == null || duration.trim().isEmpty()) {
            throw new IllegalArgumentException("Duration cannot be empty.");
        }

        Optional<Audio> audioOptional = audioRepository.findById(id);
        if (audioOptional.isEmpty()) {
            return Optional.empty();
        }

        Audio audio = audioOptional.get();
        audio.setData(file.getBytes());
        audio.setFileName(file.getOriginalFilename());
        audio.setDuration(duration); // Sử dụng duration từ request
        return Optional.of(audioRepository.save(audio));
    }

    // Xóa file audio
    public boolean deleteAudio(String id) {
        if (!audioRepository.existsById(id)) {
            return false;
        }
        audioRepository.deleteById(id);
        return true;
    }

    // Lấy dữ liệu MP3 và duration
    public Optional<Map<String, Object>> getAudioData(String id) {
        Optional<Audio> audioOptional = audioRepository.findById(id);
        if (audioOptional.isEmpty()) {
            return Optional.empty();
        }

        Audio audio = audioOptional.get();
        Map<String, Object> audioData = new HashMap<>();
        audioData.put("mp3Data", audio.getData());
        audioData.put("duration", audio.getDuration());
        audioData.put("fileName", audio.getFileName());
        return Optional.of(audioData);
    }
}