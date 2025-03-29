package com.btec.webmusic_api.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "audios")
public class Audio {
    @Id
    private String id;
    private byte[] data;  // Dữ liệu nhị phân của file MP3
    private String fileName; // Tên file gốc
    private String duration; // Thời lượng (ví dụ: "3:45")

    // Constructors
    public Audio() {}

    public Audio(byte[] data, String fileName, String duration) {
        this.data = data;
        this.fileName = fileName;
        this.duration = duration;
    }

    // Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}