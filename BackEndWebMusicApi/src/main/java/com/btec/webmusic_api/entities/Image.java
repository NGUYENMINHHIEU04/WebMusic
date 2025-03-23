package com.btec.webmusic_api.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "images")
public class Image {
    @Id
    private String id;
    private byte[] data;
    private String fileName;

    @Transient
    public static final String SEQUENCE_NAME = "image_sequence";


    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void getFileName() {
        this.fileName=fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    // Constructors, getters, and setters
}