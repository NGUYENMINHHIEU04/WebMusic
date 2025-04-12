package com.btec.webmusic_api.repositories;

import com.btec.webmusic_api.entities.History;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository extends MongoRepository<History, String> {
    // Tìm lịch sử nghe nhạc theo userId, sắp xếp theo timestamp giảm dần
    List<History> findByUserIdOrderByTimestampDesc(String userId);

    // Tìm lịch sử nghe nhạc theo userId và songId
    Optional<History> findByUserIdAndSongId(String userId, String songId);
}