package com.btec.webmusic_api.dtos;

public class ResponseObject<T> {
    private int status;
    private T data; // Sử dụng generic type T
    private String message;

    public ResponseObject(int status, T data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }
}