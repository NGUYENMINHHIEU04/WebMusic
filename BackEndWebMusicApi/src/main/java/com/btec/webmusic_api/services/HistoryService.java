package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    private static final int MAX_HISTORY_SIZE = 10;

    @Autowired
    private HistoryRepository historyRepository;

    public History addHistory(History history) {
        try {
            // Kiểm tra dữ liệu đầu vào
            if (history.getUserId() == null || history.getUserId().trim().isEmpty()) {
                throw new IllegalArgumentException("User ID cannot be empty.");
            }
            if (history.getSongId() == null || history.getSongId().trim().isEmpty()) {
                throw new IllegalArgumentException("Song ID cannot be empty.");
            }

            // Đảm bảo timestamp được thiết lập
            if (history.getTimestamp() == null) {
                history.setTimestamp(ZonedDateTime.now());
            }

            // Lấy danh sách lịch sử hiện tại của user
            System.out.println("Fetching history for user: " + history.getUserId());
            List<History> userHistory = historyRepository.findByUserIdOrderByTimestampDesc(history.getUserId());
            System.out.println("Found " + userHistory.size() + " history records");

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
                // Đảm bảo listenCount không bị null
                if (existing.getListenCount() == null) {
                    existing.setListenCount(0);
                }
                System.out.println("Updating existing history record for song: " + history.getSongId());
                return historyRepository.save(existing);
            } else {
                // Nếu bài hát chưa tồn tại, kiểm tra giới hạn 10 bài
                if (userHistory.size() >= MAX_HISTORY_SIZE) {
                    // Sắp xếp theo timestamp tăng dần (cũ nhất ở đầu) và xóa bài cũ nhất
                    System.out.println("History limit reached, removing oldest record");
                    // Lọc các bản ghi có timestamp hợp lệ
                    List<History> validHistory = userHistory.stream()
                            .filter(h -> h.getTimestamp() != null)
                            .collect(Collectors.toList());
                    if (!validHistory.isEmpty()) {
                        History oldest = validHistory.stream()
                                .min(Comparator.comparing(History::getTimestamp))
                                .orElse(null);
                        if (oldest != null) {
                            historyRepository.delete(oldest);
                            System.out.println("Deleted oldest history record: " + oldest.getId());
                        }
                    } else {
                        System.out.println("No valid history records to delete");
                    }
                }
                // Thêm bản ghi mới, khởi tạo listenCount = 0
                if (history.getListenCount() == null) {
                    history.setListenCount(0);
                }
                System.out.println("Creating new history record for song: " + history.getSongId());
                return historyRepository.save(history);
            }
        } catch (Exception e) {
            System.out.println("Error in addHistory: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Something went wrong: " + e.getMessage());
        }
    }

    public History recordListen(History history) {
        try {
            // Kiểm tra dữ liệu đầu vào
            System.out.println("Received history data in recordListen: " + history);
            if (history.getUserId() == null || history.getUserId().trim().isEmpty()) {
                throw new IllegalArgumentException("User ID cannot be empty.");
            }
            if (history.getSongId() == null || history.getSongId().trim().isEmpty()) {
                throw new IllegalArgumentException("Song ID cannot be empty.");
            }

            // Đảm bảo timestamp được thiết lập
            if (history.getTimestamp() == null) {
                System.out.println("Timestamp is null, setting to current time");
                history.setTimestamp(ZonedDateTime.now());
            }

            // Tìm bản ghi hiện có
            Optional<History> existingHistoryOpt = historyRepository.findByUserIdAndSongId(history.getUserId(), history.getSongId());
            History existingHistory;

            if (existingHistoryOpt.isPresent()) {
                existingHistory = existingHistoryOpt.get();
                // Nếu bài hát đã tồn tại, tăng listenCount
                int newListenCount = (existingHistory.getListenCount() == null || existingHistory.getListenCount() == 0) ? 1 : existingHistory.getListenCount() + 1;
                existingHistory.setListenCount(newListenCount);
                existingHistory.setTimestamp(history.getTimestamp());
                existingHistory.setTitle(history.getTitle());
                existingHistory.setArtist(history.getArtist());
                existingHistory.setImageUrl(history.getImageUrl());
                History savedHistory = historyRepository.save(existingHistory);
                System.out.println("Updated listenCount for song " + history.getSongId() + ": " + newListenCount);
                return savedHistory;
            } else {
                // Nếu bài hát chưa tồn tại, kiểm tra giới hạn 10 bài
                List<History> userHistory = historyRepository.findByUserIdOrderByTimestampDesc(history.getUserId());
                if (userHistory.size() >= MAX_HISTORY_SIZE) {
                    // Sắp xếp theo timestamp tăng dần (cũ nhất ở đầu) và xóa bài cũ nhất
                    History oldest = userHistory.stream()
                            .filter(h -> h.getTimestamp() != null)
                            .min(Comparator.comparing(History::getTimestamp))
                            .orElse(null);
                    if (oldest != null) {
                        historyRepository.delete(oldest);
                        System.out.println("Deleted oldest history record in recordListen: " + oldest.getId());
                    }
                }
                // Thêm bản ghi mới với listenCount = 1
                history.setListenCount(1);
                History savedHistory = historyRepository.save(history);
                System.out.println("Created new history record with listenCount: 1 for song " + history.getSongId());
                return savedHistory;
            }
        } catch (Exception e) {
            System.out.println("Error in recordListen: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Something went wrong in recordListen: " + e.getMessage());
        }
    }

    public History rateSong(History history) {
        try {
            // Kiểm tra dữ liệu đầu vào
            System.out.println("Received history data in rateSong: " + history);
            if (history.getUserId() == null || history.getUserId().trim().isEmpty()) {
                throw new IllegalArgumentException("User ID cannot be empty.");
            }
            if (history.getSongId() == null || history.getSongId().trim().isEmpty()) {
                throw new IllegalArgumentException("Song ID cannot be empty.");
            }

            // Tìm bản ghi hiện có
            Optional<History> existingHistoryOpt = historyRepository.findByUserIdAndSongId(history.getUserId(), history.getSongId());
            History existingHistory;

            if (existingHistoryOpt.isPresent()) {
                existingHistory = existingHistoryOpt.get();
                // Nếu bài hát đã tồn tại, cập nhật rating
                existingHistory.setRating(history.getRating());
                History savedHistory = historyRepository.save(existingHistory);
                System.out.println("Updated rating for song " + history.getSongId() + ": " + history.getRating());
                return savedHistory;
            } else {
                // Nếu bài hát chưa tồn tại, kiểm tra giới hạn 10 bài
                List<History> userHistory = historyRepository.findByUserIdOrderByTimestampDesc(history.getUserId());
                if (userHistory.size() >= MAX_HISTORY_SIZE) {
                    // Sắp xếp theo timestamp tăng dần (cũ nhất ở đầu) và xóa bài cũ nhất
                    History oldest = userHistory.stream()
                            .filter(h -> h.getTimestamp() != null)
                            .min(Comparator.comparing(History::getTimestamp))
                            .orElse(null);
                    if (oldest != null) {
                        historyRepository.delete(oldest);
                        System.out.println("Deleted oldest history record in rateSong: " + oldest.getId());
                    }
                }
                // Thêm bản ghi mới với listenCount = 0 (chưa nghe nhưng đã đánh giá)
                history.setListenCount(0);
                history.setTimestamp(ZonedDateTime.now());
                History savedHistory = historyRepository.save(history);
                System.out.println("Created new history record with rating: " + history.getRating() + " for song " + history.getSongId());
                return savedHistory;
            }
        } catch (Exception e) {
            System.out.println("Error in rateSong: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Something went wrong in rateSong: " + e.getMessage());
        }
    }

    // Lấy tất cả lịch sử nghe nhạc của một user (tối đa 10 bài, sắp xếp mới nhất trước)
    public List<History> getHistoryByUserId(String userId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty.");
        }
        return historyRepository.findByUserIdOrderByTimestampDesc(userId).stream()
                .limit(MAX_HISTORY_SIZE) // Giới hạn 10 bài
                .collect(Collectors.toList());
    }

    // Lấy tất cả lịch sử nghe nhạc (không giới hạn, chỉ dùng cho admin nếu cần)
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