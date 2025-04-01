package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.configs.StaticDomain;
import com.btec.webmusic_api.services.ImageService;
import com.btec.webmusic_api.entities.Image;
import com.btec.webmusic_api.dtos.ResponseObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {StaticDomain.IP + ":3000",
        StaticDomain.IP + ":3001",
        "http://localhost:3001",
        "http://localhost:3000",
})
@RestController
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        Image savedImage = imageService.saveImage(file);
        //return ResponseEntity.ok(savedImage.getId());
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject(200, savedImage.getId(), "upload Ok"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) {
        Optional<Image> imageOptional = imageService.getImage(id);
        if (imageOptional.isPresent()) {
            Image image = imageOptional.get();
            //return ResponseEntity.ok().body(image.getData());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Set the appropriate media type, e.g., IMAGE_JPEG, IMAGE_PNG, etc.
            // Return the image byte array with the headers
            return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/images/{id}")
    public ResponseEntity<?> updateImage(@PathVariable("id") String id, @RequestParam("file") MultipartFile file) {
        try {
            Image updatedImage = imageService.updateImage(id, file);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject(200, updatedImage.getId(), "Image updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject(404, null, e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject(500, null, "Error updating image"));
        }
    }
    @GetMapping
    public ResponseEntity<ResponseObject> getAllImages() {
        List<String> imageIds = imageService.getAllImageIds();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject(200, imageIds, "Images retrieved successfully"));
    }
}