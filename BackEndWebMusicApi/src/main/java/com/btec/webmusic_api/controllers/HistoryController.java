package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for React frontend
public class HistoryController {

    private final HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject<History>> addHistory(@RequestBody History history) {
        try {
            System.out.println("Received addHistory request: " + history);
            History savedHistory = historyService.addHistory(history);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, savedHistory, "History added or updated successfully (max 10 unique recent songs)"));
        } catch (IllegalArgumentException e) {
            System.out.println("Error in addHistory: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            System.out.println("Unexpected error in addHistory: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Unexpected error: " + e.getMessage()));
        }
    }

    @PostMapping("/listen")
    public ResponseEntity<ResponseObject<History>> recordListen(@RequestBody History history) {
        try {
            System.out.println("Received recordListen request: " + history);
            History updatedHistory = historyService.recordListen(history);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, updatedHistory, "Listen count updated successfully"));
        } catch (IllegalArgumentException e) {
            System.out.println("Error in recordListen: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            System.out.println("Unexpected error in recordListen: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Unexpected error: " + e.getMessage()));
        }
    }

    @PostMapping("/rate")
    public ResponseEntity<ResponseObject<History>> rateSong(@RequestBody History history) {
        try {
            System.out.println("Received rateSong request: " + history);
            History ratedHistory = historyService.rateSong(history);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, ratedHistory, "Song rated successfully"));
        } catch (IllegalArgumentException e) {
            System.out.println("Error in rateSong: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        } catch (Exception e) {
            System.out.println("Unexpected error in rateSong: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseObject<>(500, null, "Unexpected error: " + e.getMessage()));
        }
    }

    // Lấy lịch sử nghe nhạc theo userId (tối đa 10 bài gần nhất)
    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> getHistoryByUserId(@PathVariable String userId) {
        try {
            List<History> historyList = historyService.getHistoryByUserId(userId);
            if (historyList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseObject<>(404, null, "No history found for user"));
            }
            // Chuyển đổi dữ liệu sang định dạng Map
            List<Map<String, Object>> historyResponse = historyList.stream()
                    .map(history -> {
                        Map<String, Object> response = new HashMap<>();
                        response.put("songId", history.getSongId());
                        response.put("title", history.getTitle() != null ? history.getTitle() : "Unknown Song");
                        response.put("artist", history.getArtist() != null ? history.getArtist() : "Unknown Artist");
                        response.put("imageUrl", history.getImageUrl() != null ? history.getImageUrl() : "https://via.placeholder.com/150");
                        response.put("listenCount", history.getListenCount() != null ? history.getListenCount() : 0);
                        response.put("rating", history.getRating());
                        response.put("timestamp", history.getTimestamp());
                        return response;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, historyResponse, "Retrieved up to 10 most recent unique songs"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }



}