package com.btec.webmusic_api.services;


import com.btec.webmusic_api.repositories.ImageRepository;
import com.btec.webmusic_api.entities.Image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {
    private final ImageRepository imageRepository;


    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

//    public Image saveImage(MultipartFile file) throws IOException {
//        byte[] data = file.getBytes();
//        Image image = new Image();
//
//        image.setData(data);
//        return imageRepository.save(image);
//    }

    public Image saveImage(MultipartFile file) throws IOException {
        long maxFileSize = 2 * 1024 * 1024; // 2 MB in bytes

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 2MB.");
        }

        byte[] data = file.getBytes();
        Image image = new Image();
        image.setData(data);
        image.setFileName(file.getOriginalFilename());
        return imageRepository.save(image);
    }

    public Image updateImage(String id, MultipartFile file) throws IOException {
        long maxFileSize = 2 * 1024 * 1024; // 2MB

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds the maximum allowed limit of 2MB.");
        }

        Optional<Image> existingImage = imageRepository.findById(id);
        if (existingImage.isPresent()) {
            Image image = existingImage.get();
            image.setData(file.getBytes());
            image.setFileName(file.getOriginalFilename());
            return imageRepository.save(image);
        } else {
            throw new IllegalArgumentException("Image with ID " + id + " not found.");
        }
    }


    public Optional<Image> getImage(String id) {
        return imageRepository.findById(id);
    }
}
