package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.Audio;
import com.btec.webmusic_api.repositories.AudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class AudioService {
    private final AudioRepository audioRepository;

    @Autowired
    public AudioService(AudioRepository audioRepository) {
        this.audioRepository = audioRepository;
    }

    public Audio saveAudio(MultipartFile file) throws IOException {
        long maxFileSize = 10 * 1024 * 1024; // Giới hạn 10MB cho file audio

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 10MB.");
        }

        byte[] data = file.getBytes();
        Audio audio = new Audio();
        audio.setData(data);
        audio.setFileName(file.getOriginalFilename()); // Lưu tên file gốc
        return audioRepository.save(audio);
    }

    public Audio updateAudio(String id, MultipartFile file) throws IOException {
        long maxFileSize = 10 * 1024 * 1024; // 10MB

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 10MB.");
        }

        Optional<Audio> existingAudio = audioRepository.findById(id);
        if (existingAudio.isPresent()) {
            Audio audio = existingAudio.get();
            audio.setData(file.getBytes());
            audio.setFileName(file.getOriginalFilename());
            return audioRepository.save(audio);
        } else {
            throw new IllegalArgumentException("Audio with ID " + id + " not found.");
        }
    }

    public Optional<Audio> getAudio(String id) {
        return audioRepository.findById(id);
    }
}