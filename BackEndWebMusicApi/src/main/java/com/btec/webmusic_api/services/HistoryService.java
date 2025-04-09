package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;
    private static final int MAX_HISTORY_SIZE = 10; // Giới hạn tối đa 10 bài

    @Autowired
    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    // Thêm một bản ghi lịch sử nghe nhạc, tránh trùng lặp và giới hạn tối đa 10 bài
    public History addHistory(History history) {
        // Kiểm tra dữ liệu đầu vào
        if (history.getUserId() == null || history.getUserId().trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty.");
        }
        if (history.getSongId() == null || history.getSongId().trim().isEmpty()) {
            throw new IllegalArgumentException("Song ID cannot be empty.");
        }

        // Đảm bảo timestamp được thiết lập
        if (history.getTimestamp() == null) {
            history.setTimestamp(LocalDateTime.now());
        }

        // Lấy danh sách lịch sử hiện tại của user
        List<History> userHistory = historyRepository.findByUserId(history.getUserId());

        // Kiểm tra xem songId đã tồn tại chưa
        Optional<History> existingHistory = userHistory.stream()
                .filter(h -> h.getSongId().equals(history.getSongId()))
                .findFirst();

        if (existingHistory.isPresent()) {
            // Nếu bài hát đã tồn tại, cập nhật timestamp và các thông tin khác
            History existing = existingHistory.get();
            existing.setTimestamp(history.getTimestamp());
            existing.setTitle(history.getTitle());
            existing.setArtist(history.getArtist());
            existing.setImageUrl(history.getImageUrl());
            return historyRepository.save(existing);
        } else {
            // Nếu bài hát chưa tồn tại, kiểm tra giới hạn 10 bài
            if (userHistory.size() >= MAX_HISTORY_SIZE) {
                // Sắp xếp theo timestamp tăng dần (cũ nhất ở đầu) và xóa bài cũ nhất
                History oldest = userHistory.stream()
                        .min(Comparator.comparing(History::getTimestamp))
                        .orElse(null);
                if (oldest != null) {
                    historyRepository.deleteById(oldest.getId());
                }
            }
            // Thêm bản ghi mới
            return historyRepository.save(history);
        }
    }

    // Lấy tất cả lịch sử nghe nhạc của một user (tối đa 10 bài, sắp xếp mới nhất trước)
    public List<Map<String, Object>> getHistoryByUserId(String userId) {
        List<History> historyList = historyRepository.findByUserId(userId);
        return historyList.stream()
                .sorted(Comparator.comparing(History::getTimestamp).reversed()) // Sắp xếp mới nhất trước
                .limit(MAX_HISTORY_SIZE) // Giới hạn 10 bài
                .map(history -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("songId", history.getSongId());
                    response.put("title", history.getTitle() != null ? history.getTitle() : "Unknown Song");
                    response.put("artist", history.getArtist() != null ? history.getArtist() : "Unknown Artist");
                    response.put("imageUrl", history.getImageUrl() != null ? history.getImageUrl() : "https://via.placeholder.com/150");
                    response.put("timestamp", history.getTimestamp());
                    return response;
                })
                .collect(Collectors.toList());
    }

    // Lấy tất cả lịch sử nghe nhạc (không giới hạn ở đây, chỉ dùng cho admin nếu cần)
    public List<History> getAllHistory() {
        return historyRepository.findAll();
    }

    // Xóa một bản ghi lịch sử
    public boolean deleteHistory(String id) {
        if (!historyRepository.existsById(id)) {
            return false;
        }
        historyRepository.deleteById(id);
        return true;
    }
}