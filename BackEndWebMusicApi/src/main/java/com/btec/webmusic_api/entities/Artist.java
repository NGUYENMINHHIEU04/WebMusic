package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "artists") // Xác định collection trong MongoDB
public class Artist {

    @Id
    private String id; // id sẽ được tự động tạo bởi MongoDB nếu không cung cấp

    private String name;
    private String description;
    private String imageId; // Loại bỏ @ElementCollection, chỉ cần là String bình thường

    // Getters và Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }
}