package com.btec.webmusic_api.controllers;

import com.btec.webmusic_api.dtos.ResponseObject;
import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    @Autowired
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    // Thêm lịch sử nghe nhạc
    @PostMapping
    public ResponseEntity<ResponseObject<History>> addHistory(@RequestBody History history) {
        try {
            History savedHistory = historyService.addHistory(history);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, savedHistory, "History added or updated successfully (max 10 unique recent songs)"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseObject<>(400, null, e.getMessage()));
        }
    }

    // Lấy lịch sử nghe nhạc theo userId (tối đa 10 bài gần nhất)
    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseObject<List<Map<String, Object>>>> getHistoryByUserId(@PathVariable String userId) {
        List<Map<String, Object>> history = historyService.getHistoryByUserId(userId);
        if (history.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "No history found for user"));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, history, "Retrieved up to 10 most recent unique songs"));
    }

    // Lấy tất cả lịch sử nghe nhạc
    @GetMapping
    public ResponseEntity<ResponseObject<List<History>>> getAllHistory() {
        List<History> historyList = historyService.getAllHistory();
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject<>(200, historyList, "All history retrieved successfully"));
    }

    // Xóa một bản ghi lịch sử
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject<String>> deleteHistory(@PathVariable String id) {
        boolean deleted = historyService.deleteHistory(id);
        if (deleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject<>(200, null, "History deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject<>(404, null, "History not found"));
        }
    }
}