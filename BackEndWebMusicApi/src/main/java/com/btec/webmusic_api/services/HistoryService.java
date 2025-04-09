package com.btec.webmusic_api.services;

import com.btec.webmusic_api.entities.History;
import com.btec.webmusic_api.repositories.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final SongService songService;
    private static final int MAX_HISTORY_SIZE = 10;

    @Autowired
    public HistoryService(HistoryRepository historyRepository, SongService songService) {
        this.historyRepository = historyRepository;
        this.songService = songService;
    }

    public History addHistory(History history) {
        if (history.getUserId() == null || history.getUserId().trim().isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be empty.");
        }
        if (history.getSongId() == null || history.getSongId().trim().isEmpty()) {
            throw new IllegalArgumentException("Song ID cannot be empty.");
        }

        List<History> userHistory = historyRepository.findByUserId(history.getUserId());
        Optional<History> existingHistory = userHistory.stream()
                .filter(h -> h.getSongId().equals(history.getSongId()))
                .findFirst();

        if (existingHistory.isPresent()) {
            History existing = existingHistory.get();
            existing.setTimestamp(history.getTimestamp());
            return historyRepository.save(existing);
        } else {
            if (userHistory.size() >= MAX_HISTORY_SIZE) {
                History oldest = userHistory.stream()
                        .min(Comparator.comparing(History::getTimestamp))
                        .orElse(null);
                if (oldest != null) {
                    historyRepository.deleteById(oldest.getId());
                }
            }
            return historyRepository.save(history);
        }
    }

    public List<Map<String, Object>> getHistoryByUserId(String userId) {
        List<History> historyList = historyRepository.findByUserId(userId);
        return historyList.stream()
                .sorted(Comparator.comparing(History::getTimestamp).reversed())
                .limit(MAX_HISTORY_SIZE)
                .map(history -> {
                    Optional<Map<String, Object>> songData = songService.getSongById(history.getSongId());
                    Map<String, Object> response = songData.orElseGet(() -> Map.of("songId", history.getSongId(), "title", "Unknown Song"));
                    response.put("timestamp", history.getTimestamp());
                    return response;
                })
                .collect(Collectors.toList());
    }

    public List<History> getAllHistory() {
        return historyRepository.findAll();
    }

    public boolean deleteHistory(String id) {
        if (!historyRepository.existsById(id)) {
            return false;
        }
        historyRepository.deleteById(id);
        return true;
    }
}